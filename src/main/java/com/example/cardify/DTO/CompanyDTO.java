package com.example.cardify.DTO;
import com.example.cardify.Models.Company;
import com.example.cardify.Models.User;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class CompanyDTO {
    private Long id;
    private String name;
    private List<UserDTO> users;

    public CompanyDTO(Company company) {
        this.id = company.getId();
        this.name = company.getName();
        this.users = company.getUsers() != null
                ? company.getUsers().stream().map(UserDTO::new).collect(Collectors.toList())
                : null;
    }
}

