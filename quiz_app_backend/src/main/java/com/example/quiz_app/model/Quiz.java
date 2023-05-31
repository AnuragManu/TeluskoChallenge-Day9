package com.example.quiz_app.model;

import jakarta.persistence.*;

@Entity
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String technology;
    private long question1;
    private long question2;
    private long question3;
    private long question4;
    private long question5;

    public Quiz( String technology, long question1, long question2, long question3, long question4, long question5) {
        this.technology = technology;
        this.question1 = question1;
        this.question2 = question2;
        this.question3 = question3;
        this.question4 = question4;
        this.question5 = question5;
    }

    public Quiz() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTechnology() {
        return technology;
    }

    public void setTechnology(String technology) {
        this.technology = technology;
    }

    public long getQuestion1() {
        return question1;
    }

    public void setQuestion1(int question1) {
        this.question1 = question1;
    }

    public long getQuestion2() {
        return question2;
    }

    public void setQuestion2(int question2) {
        this.question2 = question2;
    }

    public long getQuestion3() {
        return question3;
    }

    public void setQuestion3(int question3) {
        this.question3 = question3;
    }

    public long getQuestion4() {
        return question4;
    }

    public void setQuestion4(int question4) {
        this.question4 = question4;
    }

    public long getQuestion5() {
        return question5;
    }

    public void setQuestion5(int question5) {
        this.question5 = question5;
    }
}
