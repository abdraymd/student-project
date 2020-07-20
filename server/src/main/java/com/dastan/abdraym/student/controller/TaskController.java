package com.dastan.abdraym.student.controller;

import com.dastan.abdraym.student.model.Task;
import com.dastan.abdraym.student.model.User;
import com.dastan.abdraym.student.repository.TaskRepository;
import com.dastan.abdraym.student.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/task")
@RestController
public class TaskController {
    private TaskRepository taskRepository;
    private UserRepository userRepository;

    public TaskController(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTasks(@PathVariable Long id, @RequestParam String date) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new UsernameNotFoundException("User not found with -> id: " + id));

        List<Task> tasks = taskRepository.findAllByUser(user);
        List<Task> result = new ArrayList<>();

        tasks.forEach(task -> {
            if (task.getDate().equals(date)) {
                result.add(task);
            }
        });

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody Task task) {
        return ResponseEntity.ok(taskRepository.save(task));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        return taskRepository.findById(id)
                .map(record -> {
                    taskRepository.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
