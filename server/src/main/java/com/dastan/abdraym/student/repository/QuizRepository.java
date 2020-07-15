package com.dastan.abdraym.student.repository;

import com.dastan.abdraym.student.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    Quiz findByName(String name);
    Boolean existsByName(String name);
}
