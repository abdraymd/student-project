package com.dastan.abdraym.student.repository;

import com.dastan.abdraym.student.model.Task;
import com.dastan.abdraym.student.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByUser (User user);
}
