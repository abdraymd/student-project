package com.dastan.abdraym.student.controller;

import com.dastan.abdraym.student.model.Article;
import com.dastan.abdraym.student.repository.ArticleRepository;
import com.dastan.abdraym.student.service.FileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/article")
@RestController
public class ArticleController {
    private ArticleRepository articleRepository;
    private FileService fileService;

    public ArticleController(ArticleRepository articleRepository, FileService fileService) {
        this.articleRepository = articleRepository;
        this.fileService = fileService;
    }

    @GetMapping
    public ResponseEntity<?> getAllArticles() {
        List<Article> allArticles = articleRepository.findAll();

        return new ResponseEntity<>(allArticles, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Article> getArticle(@PathVariable Long id) {
        return articleRepository.findById(id)
                .map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<?> createArticle(
            @RequestParam String title,
            @RequestParam String text,
            @RequestParam String date,
            @RequestParam("image") MultipartFile image
    ) throws IOException {
        Article article = new Article(title, text, date);

        // saving image
        if (image != null && !image.getOriginalFilename().isEmpty()) {
            article.setImageName(fileService.uploadFile(image, "/images"));
        }

        return ResponseEntity.ok(articleRepository.save(article));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteArticle(@PathVariable Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Fail! -> Article not found!"));

        // removing image
        if (!article.getImageName().isEmpty()) fileService.removeFile("/images/" + article.getImageName());

        articleRepository.delete(article);
        return new ResponseEntity<Article>(HttpStatus.NO_CONTENT);
    }
}
