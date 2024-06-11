package com.ftn.sbnz.service.dto;

import com.ftn.sbnz.service.model.UserRole;

public class SignUpDto {
    private String login;
    private String password;
    private UserRole role;

    public SignUpDto(String login, String password, UserRole role) {
        this.login = login;
        this.password = password;
        this.role = role;
    }

    public SignUpDto() {
    }

    public String getLogin() {
        return login;
    }

    public String getPassword() {
        return password;
    }

    public UserRole getRole() {
        return role;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }
}
