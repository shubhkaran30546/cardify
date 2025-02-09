//package com.example.cardify.controller;
//
//import com.example.cardify.Models.User;
//import com.example.cardify.repository.UserRepository;
//import com.example.cardify.service.JwtService;
//import com.example.cardify.service.UserDetailsServiceImpl;
//import com.example.cardify.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
//import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
//import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.Map;
//
//@RestController
//@RequestMapping("")
//public class OAuthUserController {
//    private final OAuth2AuthorizedClientService clientService;
//    private final UserRepository userRepository;
//    private final JwtService jwtService;
//    private final UserDetailsServiceImpl userDetailsService;
//    private final UserService userService;
//
//    @Autowired
//    public OAuthUserController(
//            OAuth2AuthorizedClientService clientService,
//            UserRepository userRepository,
//            JwtService jwtService,
//            UserDetailsServiceImpl userDetailsService,  // Fixed dependency
//            UserService userService
//    ) {
//        this.clientService = clientService;
//        this.userRepository = userRepository;
//        this.jwtService = jwtService;
//        this.userDetailsService = userDetailsService;
//        this.userService = userService;
//    }
//
//    @GetMapping("/login/oauth2/code/{provider}")
//    public ResponseEntity<Map<String, String>> loginSuccess(@PathVariable String provider, OAuth2AuthenticationToken authenticationToken) {
//        System.out.println("OAuth login success for provider: " + provider);
//
//        // ✅ Load OAuth2 client
//        OAuth2AuthorizedClient client = clientService.loadAuthorizedClient(provider, authenticationToken.getName());
//        if (client == null) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "OAuth authentication failed!"));
//        }
//
//        // ✅ Extract email from OAuth response
//        Map<String, Object> attributes = authenticationToken.getPrincipal().getAttributes();
//        String userEmail = (String) attributes.get("email");
//        String firstName = (String) attributes.get("given_name");
//        String lastName = (String) attributes.get("family_name");
//
//        System.out.println("Authenticated email: " + userEmail);
//
//        // ✅ If user does not exist, register a new one
//        User user = userRepository.findByEmail(userEmail);
//        if (user == null) {
//            System.out.println("User not found, registering new Google user...");
//            user = userService.registerGoogleUser(provider, firstName, lastName, userEmail);
//        }
//
//        // ✅ Generate JWT token
//        UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
//        String jwtToken = jwtService.generateToken(userDetails);
//        System.out.println("Generated JWT: " + jwtToken);
//
//        return ResponseEntity.ok(Map.of(
//                "token", jwtToken,
//                "email", userEmail
//        ));
//    }
//}
