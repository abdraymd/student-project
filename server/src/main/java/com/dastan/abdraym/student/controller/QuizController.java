package com.dastan.abdraym.student.controller;

import com.dastan.abdraym.student.model.Question;
import com.dastan.abdraym.student.model.Quiz;
import com.dastan.abdraym.student.report.response.ResponseReport;
import com.dastan.abdraym.student.repository.QuestionRepository;
import com.dastan.abdraym.student.repository.QuizRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/quiz")
@RestController
public class QuizController {
    private QuizRepository quizRepository;
    private QuestionRepository questionRepository;

    public QuizController(QuizRepository quizRepository, QuestionRepository questionRepository) {
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
    }

    @GetMapping
    public ResponseEntity<?> getAllQuizzes() {
        List<Quiz> allQuizzes = quizRepository.findAll();

        return new ResponseEntity<>(allQuizzes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuiz(@PathVariable Long id) {
        return quizRepository.findById(id)
                .map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<?> createQuiz(@RequestBody Quiz quiz) {
        return ResponseEntity.ok(quizRepository.save(quiz));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/{id}")
    public ResponseEntity<?> addQuestionToQuiz(@PathVariable Long id, @RequestBody Question question) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Fail! -> Quiz not found!"));

        // saving question
        question.setQuiz(quiz);
        questionRepository.save(question);

        return new ResponseEntity<>(new ResponseReport("Question added successfully!"), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuiz(@PathVariable Long id) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Fail! -> Quiz not found!"));

        Set<Question> questions = quiz.getQuestions();

        quiz.setQuestions(null);

        // removing questions
        if (!questions.isEmpty()) {
            questions.forEach(question -> {
                questionRepository.deleteById(question.getId());
            });
        }

        quizRepository.deleteById(id);

        return ResponseEntity.ok().build();
    }

    // delete question
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/question/{questionId}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long questionId) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new EntityNotFoundException("Fail! -> Question not found!"));

        return questionRepository.findById(questionId)
                .map(record -> {
                    questionRepository.deleteById(questionId);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
