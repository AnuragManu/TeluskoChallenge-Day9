import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const QuizAttempt = ({ quizId, closeModal }) => {
    const [quiz, setQuiz] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        if (quizId) {
            fetchQuiz();
        }
    }, [quizId]);

    const fetchQuiz = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/quizzes/${id}`);
            const data = await response.json();
            setQuiz(data);
        } catch (error) {
            console.log('Error fetching quiz:', error);
        }
    };

    const handleAnswerSelection = (questionIndex, selectedAnswer) => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[questionIndex] = selectedAnswer;
        setUserAnswers(updatedAnswers);
    };

    const handleSubmitQuiz = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/api/quizzes/${id}/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userAnswers),
            });

            const score = await response.json();
            console.log('Quiz Score:', score);

            // Perform any necessary actions based on the score

        } catch (error) {
            console.log('Error verifying quiz answers:', error);
        }
    };

    if (!quiz) {
        return null; // or return a loading state
    }

    return (
        <div>
            <h2>Quiz Attempt: {quiz.technology}</h2>
            <form onSubmit={handleSubmitQuiz}>
                {/* Render questions and answer options */}
                {/* For each question, create an input or select field to allow users to select their answer */}
                {/* Example: */}
                {quiz.questions.map((question, index) => (
                    <div key={question.id}>
                        <h4>{question.question}</h4>
                        {question.options.map((option) => (
                            <label key={option}>
                                <input
                                    type="radio"
                                    name={`question_${question.id}`}
                                    value={option}
                                    onChange={() => handleAnswerSelection(index, option)}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                ))}
                <button type="submit">Submit Quiz</button>
            </form>
            <button onClick={closeModal}>Close</button>
        </div>
    );
};

export default QuizAttempt;
