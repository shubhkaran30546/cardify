package com.example.cardify.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // Match root ("/")
        registry.addViewController("/")
                .setViewName("forward:/index.html");

        // Match any single path segment (e.g., "/home", "/about")
        registry.addViewController("/{spring:\\w+}")
                .setViewName("forward:/index.html");

        // Match any two path segments (e.g., "/foo/bar")
        registry.addViewController("/{spring:\\w+}/{spring:\\w+}")
                .setViewName("forward:/index.html");

        // Catch-all for any other paths (e.g., "/foo/bar/baz")
        registry.addViewController("/{spring:^(?!.*\\.(js|css)$).*$}/**")
                .setViewName("forward:/index.html");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploaded_images/**")
                .addResourceLocations("file:uploaded_images/");
    }

}
