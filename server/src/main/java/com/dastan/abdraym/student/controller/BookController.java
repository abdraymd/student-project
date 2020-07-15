package com.dastan.abdraym.student.controller;

import com.dastan.abdraym.student.model.Book;
import com.dastan.abdraym.student.report.response.ResponseReport;
import com.dastan.abdraym.student.repository.BookRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/book")
@RestController
public class BookController {
    @Value("${upload.path}")
    private String uploadPath;

    private BookRepository bookRepository;

    public BookController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
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
        File file = new File(uploadPath + "/books/" + fileName);

        // download book
        if (file.exists()) {
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setContentType(MediaType.APPLICATION_PDF);
            httpHeaders.setContentDispositionFormData("attachment", fileName);

            InputStreamResource isr = new InputStreamResource(new FileInputStream(file));
            return new ResponseEntity<InputStreamResource>(isr, httpHeaders, HttpStatus.OK);
        }

        return new ResponseEntity<>(new ResponseReport("Fail -> File not found!"), HttpStatus.BAD_REQUEST);
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
            File imagesDir = new File(uploadPath + "/images");

            if (!imagesDir.exists()) imagesDir.mkdir();

            String imgUuid = UUID.randomUUID().toString();
            String imageName = imgUuid + "." + image.getOriginalFilename();

            image.transferTo(new File(imagesDir + "/" + imageName));

            book.setImageName(imageName);
        }

        // saving book
        if (file != null && !file.getOriginalFilename().isEmpty()) {
            File booksDir = new File(uploadPath + "/books");

            if (!booksDir.exists()) booksDir.mkdir();

            String bookUuid = UUID.randomUUID().toString();
            String fileName = bookUuid + "." + file.getOriginalFilename();

            file.transferTo(new File(booksDir + "/" + fileName));

            book.setFileName(fileName);
        }

        return ResponseEntity.ok(bookRepository.save(book));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Fail! -> Book not found!"));

        // removing image
        File image = new File(uploadPath + "/images/" + book.getImageName());
        if (image.exists()) image.delete();

        // removing book
        File file = new File(uploadPath + "/books/" + book.getFileName());
        if (file.exists()) file.delete();

        bookRepository.delete(book);
        return new ResponseEntity<Book>(HttpStatus.NO_CONTENT);
    }
}
