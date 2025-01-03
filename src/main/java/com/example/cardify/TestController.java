package com.example.cardify;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @RequestMapping(value = {"/", "/about", "/contact"})
    public String index() {
        return "forward:/index.html"; // React entry point
    }
}

