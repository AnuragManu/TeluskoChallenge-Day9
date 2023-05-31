package com.example.quiz_app.repository;

import com.example.quiz_app.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question,Long> {
    List<Question> findByTechnology(String technology);
}
