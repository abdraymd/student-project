package com.dastan.abdraym.student.controller;

import com.dastan.abdraym.student.model.Book;
import com.dastan.abdraym.student.report.response.Response;
import com.dastan.abdraym.student.repository.BookRepository;
import com.dastan.abdraym.student.service.FileService;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/book")
@RestController
public class BookController {
    private BookRepository bookRepository;
    private FileService fileService;

    public BookController(BookRepository bookRepository, FileService fileService) {
        this.bookRepository = bookRepository;
        this.fileService = fileService;
    }

    @GetMapping
    public ResponseEntity<?> getAllBooks() {
        List<Book> allBooks = bookRepository.findAll();

        return new ResponseEntity<>(allBooks, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBook(@PathVariable Long id) {
        return bookRepository.findById(id)
                .map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/download")
    public ResponseEntity<?> downloadFile(@RequestParam String fileName) throws IOException {
        InputStreamResource isr = fileService.getResource("/books/" + fileName);

        // download file
        if (isr.exists()) {
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setContentType(MediaType.APPLICATION_PDF);
            httpHeaders.setContentDispositionFormData("attachment", fileName);

            return new ResponseEntity<InputStreamResource>(isr, httpHeaders, HttpStatus.OK);
        }

        return new ResponseEntity<>(new Response("Fail -> File not found!"), HttpStatus.BAD_REQUEST);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<?> createBook(
            @RequestParam String name,
            @RequestParam String author,
            @RequestParam String genre,
            @RequestParam String description,
            @RequestParam("image") MultipartFile image,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        Book book = new Book(name, author, genre, description);

        // saving image
        if (image != null && !image.getOriginalFilename().isEmpty()) {
            book.setImageName(fileService.uploadFile(image, "/images"));
        }

        // saving book
        if (file != null && !file.getOriginalFilename().isEmpty()) {
            book.setFileName(fileService.uploadFile(file, "/books"));
        }

        return ResponseEntity.ok(bookRepository.save(book));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Fail! -> Book not found!"));

        // removing image
        if (!book.getImageName().isEmpty()) fileService.removeFile("/images/" + book.getImageName());

        // removing book
        if (!book.getFileName().isEmpty()) fileService.removeFile("/books/" + book.getFileName());

        bookRepository.delete(book);
        return new ResponseEntity<Book>(HttpStatus.NO_CONTENT);
    }
}
