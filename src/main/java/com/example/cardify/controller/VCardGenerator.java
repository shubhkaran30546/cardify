package com.example.cardify.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

public class VCardGenerator {

    public static String generateVCard(String firstName, String lastName, String email, String phone, String company) throws IOException {
        String vCardContent =
                "BEGIN:VCARD\n" +
                        "VERSION:3.0\n" +
                        "FN:" + firstName + " " + lastName + "\n" +
                        "EMAIL:" + email + "\n" +
                        "TEL:" + phone + "\n" +
                        "ORG:" + company + "\n" +
                        "END:VCARD";

        // Save the file to a publicly accessible directory (e.g., /uploads/)
        Path filePath = Path.of("uploads/contact_" + firstName + "_" + lastName + ".vcf");
        Files.writeString(filePath, vCardContent, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);

        return "/uploads/contact_" + firstName + "_" + lastName + ".vcf"; // Return the file path URL
    }
}

