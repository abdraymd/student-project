package com.dastan.abdraym.student.controller;

import com.dastan.abdraym.student.mail.MailSender;
import com.dastan.abdraym.student.model.User;
import com.dastan.abdraym.student.report.request.PasswordRequest;
import com.dastan.abdraym.student.report.response.Response;
import com.dastan.abdraym.student.repository.UserRepository;
import com.dastan.abdraym.student.service.FileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.io.IOException;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/user")
@RestController
public class UserController {
    private UserRepository userRepository;
    private FileService fileService;
    private PasswordEncoder passwordEncoder;
    private MailSender mailSender;

    public UserController(UserRepository userRepository, FileService fileService, PasswordEncoder passwordEncoder, MailSender mailSender) {
        this.userRepository = userRepository;
        this.fileService = fileService;
        this.passwordEncoder = passwordEncoder;
        this.mailSender = mailSender;
    }

    @GetMapping("/{username}")
    public ResponseEntity<User> getUser(@PathVariable String username) {
        return userRepository.findByUsername(username)
                .map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/image")
    public ResponseEntity<User> updateImageProfile(@PathVariable Long id, @RequestParam("image") MultipartFile image) throws IOException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Fail! -> User not found!"));

        // removing old image
        if (user.getProfileImage() != null) fileService.removeFile("/images/" + user.getProfileImage());

        // setting new image
        if (image != null && !image.getOriginalFilename().isEmpty()) {
            user.setProfileImage(fileService.uploadFile(image, "/images"));
        }

        return ResponseEntity.ok().body(userRepository.save(user));
    }

    @PutMapping("/{id}/password")
    public ResponseEntity<?> updatePassword(@PathVariable Long id, @Valid @RequestBody PasswordRequest passwordRequest) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Fail! -> User not found!"));

        if (passwordEncoder.matches(passwordRequest.getPassword(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(passwordRequest.getNewPassword()));

            return ResponseEntity.ok().body(userRepository.save(user));
        }

        return new ResponseEntity<>(new Response("Fail -> Wrong password!"), HttpStatus.BAD_REQUEST);
    }

    // forgot password
    @PostMapping("/password/forgot")
    public ResponseEntity<?> forgotPassword(@RequestBody String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Fail! -> User not found!"));

        user.setResetToken(UUID.randomUUID().toString());

        userRepository.save(user);

        // sending message
        String message = String.format(
                "Для восстановления пароля перейдите по следующей ссылке: http://localhost:4200/password/reset/"
                        + user.getResetToken()
        );

        mailSender.send(user.getEmail(), "Password Reset", message);

        return new ResponseEntity<>(new Response("Message sent successfully!"), HttpStatus.OK);
    }

    // reset password
    @PutMapping("/password/reset/{token}")
    public ResponseEntity<?> resetPassword(@PathVariable String token, @RequestBody String newPassword) {
        User user = userRepository.findByResetToken(token)
                .orElseThrow(() -> new EntityNotFoundException("Fail! -> User not found!"));

        user.setPassword(passwordEncoder.encode(newPassword));

        user.setResetToken(null);

        return ResponseEntity.ok().body(userRepository.save(user));
    }
}
