package com.example.cardify.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // Forward any path without a dot in the first segment (simple)
        registry.addViewController("/{path:[^\\.]*}")
                .setViewName("forward:/index.html");

        // Forward paths with multiple segments that do not contain dots in any segment
        registry.addViewController("/{path:^(?!.*\\.).*$}/**/{subpath:[^\\.]*}")
                .setViewName("forward:/index.html");
    }


    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploaded_images/**")
                .addResourceLocations("file:uploaded_images/");
    }
}


