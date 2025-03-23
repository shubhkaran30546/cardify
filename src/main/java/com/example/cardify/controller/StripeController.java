package com.example.cardify.controller;

import com.example.cardify.Models.User;
import com.example.cardify.repository.UserRepository;
import com.example.cardify.service.PortfolioService;
import com.example.cardify.service.UserService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
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

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")  // Adjust CORS settings as needed
public class StripeController {

    private final UserRepository userRepository;
    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    public StripeController(UserRepository userRepository) {
        this.userRepository = userRepository;
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
    public ResponseEntity<?> createSubscription(@RequestBody Map<String, String> requestData) {
        String customerId = requestData.get("customerId");
        String priceId = requestData.get("priceId");

        try {
            SubscriptionCreateParams params = SubscriptionCreateParams.builder()
                    .setCustomer(customerId)
                    .addItem(SubscriptionCreateParams.Item.builder().setPrice(priceId).build())
                    .setTrialPeriodDays(30L)  // Set a 1-month free trial
                    .build();

            Subscription subscription = Subscription.create(params);
            return ResponseEntity.ok(Map.of("subscriptionId", subscription.getId()));
        } catch (StripeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
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


}