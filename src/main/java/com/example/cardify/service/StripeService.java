package com.example.cardify.service;

import java.util.HashMap;
import java.util.Map;

import com.example.cardify.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.stripe.Stripe;
import com.stripe.model.Customer;
import com.stripe.model.Subscription;
import com.example.cardify.Models.User;

@Service
public class StripeService {

    @Value("${stripe.secret.key}")
    private String API_SECT_KEY;
    @Autowired
    private UserRepository userRepository;


    public String createCustomer(String email, String token) {

        String id = null;

        try {
            Stripe.apiKey = API_SECT_KEY;
            Map<String, Object> customerParams = new HashMap<>();
            customerParams.put("description", "Customer for " + email);
            customerParams.put("email", email);
            // obtained with stripe.js
            customerParams.put("source", token);

            Customer customer = Customer.create(customerParams);
            id = customer.getId();



        } catch (Exception e) {
            e.printStackTrace();
        }
        return id;
    }

    public String createSubscription(String customerId, String plan,String email) {
        String subscriptionId = null;

        try {
            Stripe.apiKey = API_SECT_KEY;

            Map<String, Object> item = new HashMap<>();
            item.put("plan", plan);

            Map<String, Object> items = new HashMap<>();
            items.put("0", item);

            Map<String, Object> params = new HashMap<>();
            params.put("customer", customerId);
            params.put("items", items);

            Subscription subscription = Subscription.create(params);
            subscriptionId = subscription.getId();

            // 🟢 Set the subscription ID in the database
            User user = userRepository.findByEmail(email);
            if (user != null) {
                user.setStripeSubscriptionId(subscriptionId);
                userRepository.save(user);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return subscriptionId;
    }


    public boolean cancelSubscription(String subscriptionId) {

        boolean subscriptionStatus;

        try {
            Subscription subscription = Subscription.retrieve(subscriptionId);
            subscription.cancel();
            subscriptionStatus = true;
        } catch (Exception e) {
            e.printStackTrace();
            subscriptionStatus = false;
        }
        return subscriptionStatus;
    }
    public Subscription getSubscriptionById(String subscriptionId) {
        try {
            Stripe.apiKey = API_SECT_KEY;
            return Subscription.retrieve(subscriptionId);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


}