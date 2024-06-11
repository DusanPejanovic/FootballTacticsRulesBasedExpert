package com.ftn.sbnz.service.dto;

public class SignInDto {
    public String login;
    public String password;

    public SignInDto() {
    }

    public SignInDto(String login, String password) {
        this.login = login;
        this.password = password;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
