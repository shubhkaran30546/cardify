package com.example.cardify.controller;

public class LoginResponse {
    private String token;
    private long expiresIn;
    private String role; // ✅ Add role field

    public String getToken() {
        return token;
    }

    public LoginResponse setToken(String token) {
        this.token = token;
        return this; // Enable method chaining
    }

    public long getExpiresIn() {
        return expiresIn;
    }

    public LoginResponse setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
        return this; // Enable method chaining
    }

    public String getRole() {
        return role;
    }

    public LoginResponse setRole(String role) { // ✅ Setter for role
        this.role = role;
        return this;
    }
}
