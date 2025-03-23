package com.example.cardify.controller;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
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

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }

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
}