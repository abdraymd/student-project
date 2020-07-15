package com.dastan.abdraym.student.controller;

import com.dastan.abdraym.student.model.News;
import com.dastan.abdraym.student.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/news")
@RestController
public class NewsController {
    @Value("${upload.path}")
    private String uploadPath;

    private NewsRepository newsRepository;

    public NewsController(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    @GetMapping
    public ResponseEntity<?> getAllNews() {
        List<News> allNews = newsRepository.findAll();

        return new ResponseEntity<>(allNews, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<News> getNews(@PathVariable Long id) {
        return newsRepository.findById(id)
                .map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<?> createNews(
            @RequestParam String title,
            @RequestParam String text,
            @RequestParam String date,
            @RequestParam("image") MultipartFile image
    ) throws IOException {
        News news = new News(title, text, date);

        if (image != null && !image.getOriginalFilename().isEmpty()) {
            File uploadDir = new File(uploadPath + "/images");

            if (!uploadDir.exists()) uploadDir.mkdir();

            String uuid = UUID.randomUUID().toString();
            String imageName = uuid + "." + image.getOriginalFilename();

            image.transferTo(new File(uploadDir + "/" + imageName));

            news.setImageName(imageName);
        }

        return ResponseEntity.ok(newsRepository.save(news));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNews(@PathVariable Long id) {
        News news = newsRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Fail! -> News not found!"));

        File image = new File(uploadPath + "/images/" + news.getImageName());
        if (image.exists()) image.delete();

        newsRepository.delete(news);
        return new ResponseEntity<News>(HttpStatus.NO_CONTENT);
    }
}
