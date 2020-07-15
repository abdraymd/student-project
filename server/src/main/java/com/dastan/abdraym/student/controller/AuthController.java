package com.dastan.abdraym.student.controller;

import com.dastan.abdraym.student.model.Role;
import com.dastan.abdraym.student.model.RoleName;
import com.dastan.abdraym.student.model.User;
import com.dastan.abdraym.student.report.request.SignInForm;
import com.dastan.abdraym.student.report.request.SignUpForm;
import com.dastan.abdraym.student.report.response.JwtResponse;
import com.dastan.abdraym.student.report.response.ResponseReport;
import com.dastan.abdraym.student.repository.RoleRepository;
import com.dastan.abdraym.student.repository.UserRepository;
import com.dastan.abdraym.student.security.jwt.JwtProvider;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/auth")
@RestController
public class AuthController {
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private AuthenticationManager authenticationManager;
    private PasswordEncoder passwordEncoder;
    private JwtProvider jwtProvider;

    public AuthController(UserRepository userRepository, RoleRepository roleRepository, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody SignInForm signInRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInRequest.getUsername(), signInRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateJwtToken(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(), userDetails.getAuthorities()));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpForm signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity<>(new ResponseReport("Fail -> Username is already taken!"), HttpStatus.BAD_REQUEST);
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity<>(new ResponseReport("Fail -> Email is already in use!"), HttpStatus.BAD_REQUEST);
        }

        User user = new User(signUpRequest.getUsername(), signUpRequest.getName(), signUpRequest.getSurname(),
                signUpRequest.getEmail(), passwordEncoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        strRoles.forEach(role -> {
            if ("admin".equals(role)) {
                Role adminRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
                        .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not found"));
                roles.add(adminRole);
            } else {
                Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not found"));
                roles.add(userRole);
            }
        });

        user.setRoles(roles);
        userRepository.save(user);

        return new ResponseEntity<>(new ResponseReport("User registered successfully!"), HttpStatus.OK);
    }
}
