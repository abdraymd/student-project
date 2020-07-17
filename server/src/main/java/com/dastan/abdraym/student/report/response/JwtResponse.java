package com.dastan.abdraym.student.report.response;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class JwtResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private String username;
    private String profileImage;
    private Collection<? extends GrantedAuthority> authorities;

    public JwtResponse(String accessToken, String username, String profileImage, Collection<? extends GrantedAuthority> authorities) {
        this.accessToken = accessToken;
        this.username = username;
        this.profileImage = profileImage;
        this.authorities = authorities;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public String getUsername() {
        return username;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
}
