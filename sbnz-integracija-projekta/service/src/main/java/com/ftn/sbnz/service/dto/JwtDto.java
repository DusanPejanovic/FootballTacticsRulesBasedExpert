package com.ftn.sbnz.service.dto;

public class JwtDto {

    private String accessToken;

    public JwtDto() {
    }

    public JwtDto(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}

