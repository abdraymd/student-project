package com.dastan.abdraym.student.controller;

import com.dastan.abdraym.student.model.News;
import com.dastan.abdraym.student.repository.NewsRepository;
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
@RequestMapping("/news")
@RestController
public class NewsController {
    private NewsRepository newsRepository;
    private FileService fileService;

    public NewsController(NewsRepository newsRepository, FileService fileService) {
        this.newsRepository = newsRepository;
        this.fileService = fileService;
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

        // saving image
        if (image != null && !image.getOriginalFilename().isEmpty()) {
            news.setImageName(fileService.uploadFile(image, "/images"));
        }

        return ResponseEntity.ok(newsRepository.save(news));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNews(@PathVariable Long id) {
        News news = newsRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Fail! -> News not found!"));

        // removing image
        if (!news.getImageName().isEmpty()) fileService.removeFile("/images/" + news.getImageName());

        newsRepository.delete(news);
        return new ResponseEntity<News>(HttpStatus.NO_CONTENT);
    }
}
