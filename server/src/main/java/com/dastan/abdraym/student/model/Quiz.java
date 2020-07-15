package com.dastan.abdraym.student.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(
        name = "quizzes",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"name"})
        }
)
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    @Column(columnDefinition = "text")
    private String text;

    @OneToMany(mappedBy = "quiz", fetch = FetchType.LAZY)
    private Set<Question> questions = new HashSet<>();

    public Quiz() {
    }

    public Quiz(String name, String text) {
        this.name = name;
        this.text = text;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Set<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(Set<Question> questions) {
        this.questions = questions;
    }

    @Override
    public String toString() {
        return "Quiz{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", text='" + text + '\'' +
                ", questions=" + questions +
                '}';
    }
}
