package com.dastan.abdraym.student.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "questions")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    @NotBlank
    @Column(columnDefinition = "text")
    private String question;

    @NotBlank
    private String firstOption;

    @NotBlank
    private String secondOption;

    @NotBlank
    private String thirdOption;

    @NotBlank
    private String fourthOption;

    @NotNull
    private int answer;

    public Question() {
    }

    public Question(String question, String firstOption, String secondOption, String thirdOption, String fourthOption, int answer) {
        this.question = question;
        this.firstOption = firstOption;
        this.secondOption = secondOption;
        this.thirdOption = thirdOption;
        this.fourthOption = fourthOption;
        this.answer = answer;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @JsonIgnore
    public Quiz getQuiz() {
        return quiz;
    }

    @JsonIgnore
    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getFirstOption() {
        return firstOption;
    }

    public void setFirstOption(String firstOption) {
        this.firstOption = firstOption;
    }

    public String getSecondOption() {
        return secondOption;
    }

    public void setSecondOption(String secondOption) {
        this.secondOption = secondOption;
    }

    public String getThirdOption() {
        return thirdOption;
    }

    public void setThirdOption(String thirdOption) {
        this.thirdOption = thirdOption;
    }

    public String getFourthOption() {
        return fourthOption;
    }

    public void setFourthOption(String fourthOption) {
        this.fourthOption = fourthOption;
    }

    public int getAnswer() {
        return answer;
    }

    public void setAnswer(int answer) {
        this.answer = answer;
    }

    @Override
    public String toString() {
        return "Question{" +
                "id=" + id +
                ", quiz=" + quiz +
                ", question='" + question + '\'' +
                ", firstOption='" + firstOption + '\'' +
                ", secondOption='" + secondOption + '\'' +
                ", thirdOption='" + thirdOption + '\'' +
                ", fourthOption='" + fourthOption + '\'' +
                ", answer=" + answer +
                '}';
    }
}
