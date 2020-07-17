package com.dastan.abdraym.student.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.UUID;

@Service
public class FileService {
    @Value("${upload.path}")
    private String uploadPath;

    public String uploadFile(MultipartFile file, String dirName) throws IOException {
        File uploadDir = new File(uploadPath + dirName);

        if (!uploadDir.exists()) {
            uploadDir.mkdir();
        }

        String uuid = UUID.randomUUID().toString();
        String fileName = uuid + "." + file.getOriginalFilename();

        file.transferTo(new File(uploadDir + "/" + fileName));

        return fileName;
    }

    public void removeFile(String filePath) {
        File file = new File(uploadPath + filePath);
        if (file.exists()) file.delete();
    }

    public InputStreamResource getResource(String filePath) throws IOException {
        File file = new File(uploadPath + filePath);

        if (!file.exists()) return null;

        return new InputStreamResource(new FileInputStream(file));
    }
}
