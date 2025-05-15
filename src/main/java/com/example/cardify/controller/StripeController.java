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
                                .setPrice(priceId)  // Ensure this is a recurring price
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

        String subscriptionId = stripeService.createSubscription(customerId, plan,email);

        if (subscriptionId == null) {
            return new Response(false, "An error accurred while trying to create subscription");
        }

        return new Response(true, "Success! your subscription id is " + subscriptionId);
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
    public ResponseEntity<?> cancelSubscription(@RequestHeader("Authorization") String authHeader) {
        try {
            String username = getUserNameFromToken(authHeader);
            User user = userRepository.findByUsername(username);

            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "User not found"));
            }

            String subscriptionId = user.getStripeSubscriptionId();

            if (subscriptionId == null || subscriptionId.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "No subscription ID found for user"));
            }

            Subscription subscription = Subscription.retrieve(subscriptionId);
            subscription.cancel();

            // Optionally, clear the subscription ID from the user
            user.setStripeSubscriptionId(null);
            userRepository.save(user);

            return ResponseEntity.ok(Map.of("message", "Subscription cancelled successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Invalid token"));
        } catch (StripeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Stripe error: " + e.getMessage()));
        }
    }


    private void deleteUserPortfolio(String userName) {
        User user = userRepository.findByUsername(userName);
        portfolioService.deletePortfolio(user);
    }

    @GetMapping("/get-subscription")
    public ResponseEntity<?> getUserSubscription(@RequestHeader("Authorization") String authHeader) {
        String username;

        try {
            username = getUserNameFromToken(authHeader);
            System.out.println("🔐 Extracted username from token: " + username);
        } catch (Exception e) {
            System.err.println("❌ Failed to extract username: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Invalid token"));
        }

        try {
            // Lookup user in your database
            User user = userRepository.findByUsername(username);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User not found"));
            }

            String subscriptionId = user.getStripeSubscriptionId();
            if (subscriptionId == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "No subscription ID found for user"));
            }
            System.out.println("Subscription id: " + subscriptionId);
            Subscription subscription = stripeService.getSubscriptionById(subscriptionId);
            if (subscription == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Stripe subscription not found"));
            }
            System.out.println("stripe service success");

            if (subscription.getItems() == null || subscription.getItems().getData().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "No subscription items found"));
            }

            var item = subscription.getItems().getData().get(0);
            if (item == null || item.getPrice() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "Price details are missing from subscription item"));
            }

            Price price = item.getPrice();

            return ResponseEntity.ok(Map.of(
                    "subscriptionId", subscription.getId(),
                    "planId", price.getId(),
                    "planName", price.getNickname() != null ? price.getNickname() : "Unnamed Plan",
                    "amount", price.getUnitAmount() != null ? price.getUnitAmount() / 100.0 : 0.0,
                    "currency", price.getCurrency(),
                    "interval", price.getRecurring() != null ? price.getRecurring().getInterval() : "unknown",
                    "email", user.getEmail(),
                    "username", user.getUsername()
            ));


        } catch (Exception e) {
            System.err.println("❌ Stripe or internal error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }


    private String getUserNameFromToken(String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            System.err.println("Invalid token: " + token);
            throw new IllegalArgumentException("Invalid Authorization Header");
        }
        token = token.replace("Bearer ", "").trim();
        return jwtService.extractUsername(token);  // Should return the username (usually email)
    }

    public String getStripeCustomerIdFromUsername(String username) throws StripeException {
        User user = userRepository.findByUsername(username);
        if (user == null) return null;

        String email = user.getEmail();
        System.out.println("email of stripe customer is " + email);
        return email;
    }

}