package com.example.quiz_app.controller;

import com.example.quiz_app.model.Question;
import com.example.quiz_app.model.Quiz;
import com.example.quiz_app.repository.QuestionRepository;
import com.example.quiz_app.repository.QuizRepository;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.filter.CommonsRequestLoggingFilter;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static java.rmi.server.LogStream.log;

@RestController
@RequestMapping("/api/quizzes")
@CrossOrigin
@Slf4j
public class QuizController {
    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;

    @Autowired
    public QuizController(QuizRepository quizRepository, QuestionRepository questionRepository) {
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
    }

    @GetMapping
    public ResponseEntity<List<Quiz>> getAllQuizzes() {
        List<Quiz> quizzes = quizRepository.findAll();
        return new ResponseEntity<>(quizzes, HttpStatus.OK);
    }

    @Bean
    public CommonsRequestLoggingFilter requestLoggingFilter() {
        CommonsRequestLoggingFilter loggingFilter = new CommonsRequestLoggingFilter();
        loggingFilter.setIncludeClientInfo(true);
        loggingFilter.setIncludeQueryString(true);
        loggingFilter.setIncludePayload(true);
        loggingFilter.setIncludeHeaders(false);
        return loggingFilter;
    }


@PostMapping
    public ResponseEntity<Quiz> createQuiz(@RequestBody String technology) {
        technology=technology.substring(1,technology.length()-1);
        List<Question> questions = questionRepository.findByTechnology(technology);
        if(technology.isEmpty())return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        if (questions.size() < 5) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Collections.shuffle(questions);
        questions = questions.subList(0, 5);
        Quiz quiz = new Quiz(technology,questions.get(0).getId(),questions.get(1).getId(),questions.get(2).getId(),questions.get(3).getId(),questions.get(4).getId());
        quizRepository.save(quiz);
        return new ResponseEntity<>(quiz, HttpStatus.CREATED);
    }


    @GetMapping("/{id}")
    @CrossOrigin
    public ResponseEntity<String> getQuizById(@PathVariable Long id) {
        Quiz quiz = quizRepository.findById(id).orElse(null);
        if (quiz == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        JsonObject outerObject = new JsonObject();

        JsonObject innerObject1 = new JsonObject();
        innerObject1.addProperty("id", questionRepository.findById(quiz.getQuestion1()).get().getId());
        innerObject1.addProperty("ques", questionRepository.findById(quiz.getQuestion1()).get().getQuestion());
        innerObject1.addProperty("o1", questionRepository.findById(quiz.getQuestion1()).get().getOption1());
        innerObject1.addProperty("o2", questionRepository.findById(quiz.getQuestion1()).get().getOption2());
        innerObject1.addProperty("o3", questionRepository.findById(quiz.getQuestion1()).get().getOption3());
        innerObject1.addProperty("o4", questionRepository.findById(quiz.getQuestion1()).get().getOption4());
        innerObject1.addProperty("ans", questionRepository.findById(quiz.getQuestion1()).get().getAnswer());
        outerObject.add("Q1", innerObject1);

        JsonObject innerObject2 = new JsonObject();
        innerObject2.addProperty("id", questionRepository.findById(quiz.getQuestion2()).get().getId());
        innerObject2.addProperty("ques", questionRepository.findById(quiz.getQuestion2()).get().getQuestion());
        innerObject2.addProperty("o1", questionRepository.findById(quiz.getQuestion2()).get().getOption1());
        innerObject2.addProperty("o2", questionRepository.findById(quiz.getQuestion2()).get().getOption2());
        innerObject2.addProperty("o3", questionRepository.findById(quiz.getQuestion2()).get().getOption3());
        innerObject2.addProperty("o4", questionRepository.findById(quiz.getQuestion2()).get().getOption4());
        innerObject2.addProperty("ans", questionRepository.findById(quiz.getQuestion2()).get().getAnswer());
        outerObject.add("Q2", innerObject2);

        JsonObject innerObject3 = new JsonObject();
        innerObject3.addProperty("id", questionRepository.findById(quiz.getQuestion3()).get().getId());
        innerObject3.addProperty("ques", questionRepository.findById(quiz.getQuestion3()).get().getQuestion());
        innerObject3.addProperty("o1", questionRepository.findById(quiz.getQuestion3()).get().getOption1());
        innerObject3.addProperty("o2", questionRepository.findById(quiz.getQuestion3()).get().getOption2());
        innerObject3.addProperty("o3", questionRepository.findById(quiz.getQuestion3()).get().getOption3());
        innerObject3.addProperty("o4", questionRepository.findById(quiz.getQuestion3()).get().getOption4());
        innerObject3.addProperty("ans", questionRepository.findById(quiz.getQuestion3()).get().getAnswer());
        outerObject.add("Q3", innerObject3);

        JsonObject innerObject4 = new JsonObject();
        innerObject4.addProperty("id", questionRepository.findById(quiz.getQuestion4()).get().getId());
        innerObject4.addProperty("ques", questionRepository.findById(quiz.getQuestion4()).get().getQuestion());
        innerObject4.addProperty("o1", questionRepository.findById(quiz.getQuestion4()).get().getOption1());
        innerObject4.addProperty("o2", questionRepository.findById(quiz.getQuestion4()).get().getOption2());
        innerObject4.addProperty("o3", questionRepository.findById(quiz.getQuestion4()).get().getOption3());
        innerObject4.addProperty("o4", questionRepository.findById(quiz.getQuestion4()).get().getOption4());
        innerObject4.addProperty("ans", questionRepository.findById(quiz.getQuestion4()).get().getAnswer());
        outerObject.add("Q4", innerObject4);

        JsonObject innerObject5 = new JsonObject();
        innerObject5.addProperty("id", questionRepository.findById(quiz.getQuestion5()).get().getId());
        innerObject5.addProperty("ques", questionRepository.findById(quiz.getQuestion5()).get().getQuestion());
        innerObject5.addProperty("o1", questionRepository.findById(quiz.getQuestion5()).get().getOption1());
        innerObject5.addProperty("o2", questionRepository.findById(quiz.getQuestion5()).get().getOption2());
        innerObject5.addProperty("o3", questionRepository.findById(quiz.getQuestion5()).get().getOption3());
        innerObject5.addProperty("o4", questionRepository.findById(quiz.getQuestion5()).get().getOption4());
        innerObject5.addProperty("ans", questionRepository.findById(quiz.getQuestion5()).get().getAnswer());
        outerObject.add("Q5", innerObject5);
        // ... Repeat the above code for Q3, Q4, Q5 ...

        log.error(outerObject.toString());
        return new ResponseEntity<>(outerObject.toString(), HttpStatus.OK);
    }


    @PostMapping("/{id}/verify")
    public ResponseEntity<Integer> verifyQuizAnswers(@PathVariable Long id, @RequestBody List<String> userAnswers) {
        Quiz quiz = quizRepository.findById(id).orElse(null);
        if (quiz == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<Question> questions = new ArrayList<>();
        questions.add(questionRepository.findById(quiz.getQuestion1()).get());
        questions.add(questionRepository.findById(quiz.getQuestion2()).get());
        questions.add(questionRepository.findById(quiz.getQuestion3()).get());
        questions.add(questionRepository.findById(quiz.getQuestion4()).get());
        questions.add(questionRepository.findById(quiz.getQuestion5()).get());
        int score = 0;
        for (int i = 0; i < questions.size(); i++) {
            Question question = questions.get(i);
            if (question.getAnswer().equalsIgnoreCase(userAnswers.get(i))) {
                score++;
            }
        }
        return new ResponseEntity<>(score, HttpStatus.OK);
    }
}