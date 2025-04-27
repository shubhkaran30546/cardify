package com.example.cardify.controller;

import com.example.cardify.Models.Response;
import com.example.cardify.Models.User;
import com.example.cardify.repository.UserRepository;
import com.example.cardify.service.JwtService;
import com.example.cardify.service.PortfolioService;
import com.example.cardify.service.StripeService;
import com.example.cardify.service.UserService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.Price;
import com.stripe.model.Subscription;
import com.stripe.model.checkout.Session;
import com.stripe.param.SubscriptionCreateParams;
import com.stripe.param.SubscriptionUpdateParams;
import com.stripe.param.checkout.SessionCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")  // Adjust CORS settings as needed
public class StripeController {

    private final UserRepository userRepository;
    @Value("${stripe.secret.key}")
    private String stripeSecretKey;
    private final JwtService jwtService;
    private final StripeService stripeService;

    public StripeController(UserRepository userRepository, JwtService jwtService, StripeService stripeService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.stripeService = stripeService;
    }

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }

    private PortfolioService portfolioService;
    private UserService userService;

    @PostMapping("/create-checkout-session")
    public ResponseEntity<Map<String, String>> createCheckoutSession(@RequestBody Map<String, String> requestData) {
        String priceId = requestData.get("priceId");

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.SUBSCRIPTION) // or .setMode(SessionCreateParams.Mode.PAYMENT) for one-time payments
                .setSuccessUrl("http://localhost:3000/create-ecard")
                .setCancelUrl("http://localhost:3000")
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setQuantity(1L)
                                .setPrice("price_1R4qFGD8oruRmlHjPVvsbAGZ")  // Ensure this is a recurring price
                                .build()
                )
                .build();

        try {
            Session session = Session.create(params);
            Map<String, String> responseData = new HashMap<>();
            responseData.put("url", session.getUrl());
            return ResponseEntity.ok(responseData);
        } catch (StripeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    @PostMapping("/create-subscription")
    public @ResponseBody Response createSubscription(String email, String token, String plan) {

        if (token == null || plan.isEmpty()) {
            return new Response(false, "Stripe payment token is missing. Please try again later.");
        }

        String customerId = stripeService.createCustomer(email, token);

        if (customerId == null) {
            return new Response(false, "An error accurred while trying to create customer");
        }

        String subscriptionId = stripeService.createSubscription(customerId, plan);

        if (subscriptionId == null) {
            return new Response(false, "An error accurred while trying to create subscription");
        }

        return new Response(true, "Success! your subscription id is " + subscriptionId);
    }

    @PostMapping("/cancel-subscription")
    public @ResponseBody Response cancelSubscription(String subscriptionId) {

        boolean subscriptionStatus = stripeService.cancelSubscription(subscriptionId);

        if (!subscriptionStatus) {
            return new Response(false, "Faild to cancel subscription. Please try again later");
        }

        return new Response(true, "Subscription cancelled successfully");
    }



    @PostMapping("/change-plan")
    public ResponseEntity<?> changePlan(@RequestBody Map<String, String> requestData) {
        String subscriptionId = requestData.get("subscriptionId");
        String newPriceId = requestData.get("newPriceId");

        try {
            Subscription subscription = Subscription.retrieve(subscriptionId);

            SubscriptionUpdateParams params = SubscriptionUpdateParams.builder()
                    .addItem(SubscriptionUpdateParams.Item.builder().setPrice(newPriceId).build())
                    .build();

            subscription.update(params);
            return ResponseEntity.ok(Map.of("message", "Plan updated successfully"));
        } catch (StripeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/cancel-subscription")
    public ResponseEntity<?> cancelSubscription(@RequestBody Map<String, String> requestData) {
        String subscriptionId = requestData.get("subscriptionId");
        String userName = requestData.get("userName");

        try {
            Subscription subscription = Subscription.retrieve(subscriptionId);
            subscription.cancel();

            // Call a method to delete the portfolio
            deleteUserPortfolio(userName);

            return ResponseEntity.ok(Map.of("message", "Subscription cancelled and portfolio deleted"));
        } catch (StripeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    private void deleteUserPortfolio(String userName) {
        User user = userRepository.findByUsername(userName);
        portfolioService.deletePortfolio(user);
    }

    @GetMapping("/get-subscription")
    public ResponseEntity<?> getUserSubscription(@RequestHeader("Authorization") String authHeader) {
        String username = getUserNameFromToken(authHeader);
        System.out.println("subs user"+username);

        try {
            // Retrieve the Stripe Customer using the username (assuming username is the email)
            String customerId = getStripeCustomerIdFromUsername(username);
            if (customerId == null) {
                System.out.println("Customer not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Customer not found"));
            }

            // Fetch subscriptions for the customer
            Map<String, Object> params = new HashMap<>();
            params.put("customer", customerId);
            params.put("limit", 1); // Get the latest subscription

            List<Subscription> subscriptions = Subscription.list(params).getData();

            if (subscriptions.isEmpty()) {
                System.out.println("No subscriptions found");
                return ResponseEntity.ok(Map.of("message", "No active subscription"));
            }

            Subscription activeSubscription = subscriptions.getFirst();
            System.out.println("Active subscription: "+activeSubscription.getId());
            System.out.println("Active subscription plan: "+activeSubscription.getItems().getData().getFirst().getPrice().getNickname());
            return ResponseEntity.ok(Map.of(
                    "id", activeSubscription.getId(),
                    "plan", Objects.requireNonNullElse(activeSubscription.getItems().getData().get(0).getPlan(), "No Active Plan")
            ));
        } catch (StripeException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    public String getStripeCustomerIdFromUsername(String username) throws StripeException {
        // Search for the customer in Stripe using the email (assuming username is the email)
        User user = userRepository.findByUsername(username);
        String email = user.getEmail();
        Map<String, Object> params = new HashMap<>();
        params.put("email", email); // If username is stored as email

        List<Customer> customers = Customer.list(params).getData();

        if (!customers.isEmpty()) {
            return customers.get(0).getId(); // Return the first matching customer ID
        }

        return null; // Customer not found
    }


    private String getUserNameFromToken(String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Invalid Authorization Header");
        }
        token = token.replace("Bearer ", "").trim();
        return jwtService.extractUsername(token); // Ensure jwtService is correctly parsing the token
    }


    @GetMapping("/get-plans")
    public ResponseEntity<List<Map<String, String>>> getPlans() {
        try {
            // Fetch all prices (subscriptions)
            Map<String, Object> params = new HashMap<>();
            params.put("limit", 10); // Adjust the limit as needed
            List<Price> prices = Price.list(params).getData();

            List<Map<String, String>> planList = prices.stream()
                    .map(price -> Map.of(
                            "id", price.getId(),
                            "name", price.getNickname() != null ? price.getNickname() : "Unnamed Plan",
                            "priceId", price.getId()
                    ))
                    .toList();

            return ResponseEntity.ok(planList);
        } catch (StripeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }




}