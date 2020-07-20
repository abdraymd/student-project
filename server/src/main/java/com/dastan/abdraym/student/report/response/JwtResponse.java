package com.dastan.abdraym.student.report.response;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class JwtResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private Long userId;
    private String profileImage;
    private Collection<? extends GrantedAuthority> authorities;

    public JwtResponse(String accessToken, Long userId, String profileImage, Collection<? extends GrantedAuthority> authorities) {
        this.accessToken = accessToken;
        this.userId = userId;
        this.profileImage = profileImage;
        this.authorities = authorities;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public Long getUserId() {
        return userId;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
}
