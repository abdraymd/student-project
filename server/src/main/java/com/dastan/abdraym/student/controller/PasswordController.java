package com.dastan.abdraym.student.controller;

import com.dastan.abdraym.student.mail.MailSender;
import com.dastan.abdraym.student.model.User;
import com.dastan.abdraym.student.report.response.ResponseReport;
import com.dastan.abdraym.student.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/password")
@RestController
public class PasswordController {
    private UserRepository userRepository;
    private MailSender mailSender;
    private PasswordEncoder passwordEncoder;

    public PasswordController(UserRepository userRepository, MailSender mailSender, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.mailSender = mailSender;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getResetToken(@PathVariable String username) {
        Optional<User> optional = userRepository.findByUsername(username);

        if (!optional.isPresent()) {
            return new ResponseEntity<>(new ResponseReport("User with username does not exist!"), HttpStatus.BAD_REQUEST);
        }

        User user = optional.get();

        return new ResponseEntity<>(user.getResetToken(), HttpStatus.OK);
    }

    @PostMapping("/forgot")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        Optional<User> optional = userRepository.findByEmail(email);

        if (!optional.isPresent()) {
            return new ResponseEntity<>(new ResponseReport("User with email does not exist!"), HttpStatus.BAD_REQUEST);
        }

        User user = optional.get();

        user.setResetToken(UUID.randomUUID().toString());

        userRepository.save(user);

        // sending message
        String message = String.format(
                "Для восстановления пароля перейдите по следующей ссылке: http://localhost:4200/password/reset/"
                        + user.getResetToken()
        );

        mailSender.send(user.getEmail(), "Password Reset", message);

        return new ResponseEntity<>(new ResponseReport("Message sent successfully!"), HttpStatus.OK);
    }

    @PutMapping("/reset/{token}")
    public ResponseEntity<?> resetPassword(@PathVariable String token, @RequestBody String newPassword) {
        Optional<User> user = userRepository.findByResetToken(token);

        if (user.isPresent()) {
            User resetUser = user.get();

            resetUser.setPassword(passwordEncoder.encode(newPassword));

            resetUser.setResetToken(null);

            userRepository.save(resetUser);

            return ResponseEntity.ok().body(resetUser);
        }

        return ResponseEntity.notFound().build();
    }
}
