package com.example.quiz_app.controller;

import com.example.quiz_app.model.Question;
import com.example.quiz_app.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin
public class QuestionController {
    private final QuestionRepository questionRepository;

    @Autowired
    public QuestionController(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions() {
        List<Question> questions = questionRepository.findAll();
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) {
        Question question = questionRepository.findById(id).orElse(null);
        if (question == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(question, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Question> addQuestion(@RequestBody Question question) {
        Question newQuestion = questionRepository.save(question);
        return new ResponseEntity<>(newQuestion, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable Long id, @RequestBody Question updatedQuestion) {
        Question existingQuestion = questionRepository.findById(id).orElse(null);
        if (existingQuestion == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        existingQuestion.setQuestion(updatedQuestion.getQuestion());
        existingQuestion.setOption1(updatedQuestion.getOption1());
        existingQuestion.setOption2(updatedQuestion.getOption2());
        existingQuestion.setOption3(updatedQuestion.getOption3());
        existingQuestion.setOption4(updatedQuestion.getOption4());
        existingQuestion.setAnswer(updatedQuestion.getAnswer());
        existingQuestion.setTechnology(updatedQuestion.getTechnology());
        Question savedQuestion = questionRepository.save(existingQuestion);
        return new ResponseEntity<>(savedQuestion, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        questionRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}