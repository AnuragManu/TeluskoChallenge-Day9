import React, { useEffect, useState } from 'react';
import './QuizList.css'; // Import the CSS file for styling
import { json } from 'react-router';

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [selectedQuizId, setSelectedQuizId] = useState(null);
    const [questions, setQuestions] = useState(null);

    const handleQuizClick = async (quizId) => {
        setSelectedQuizId(quizId);
        try {
            const response = await fetch(`http://localhost:8080/api/quizzes/${quizId}`).then((response) => response.json().then((responseJson)=>setQuestions(responseJson)));
            // const data = await response.json();
            // console.log(data)
            // setQuestions({data});

        } catch (error) {
            console.log('Error fetching quiz questions:', error);
        }
    };
    
    useEffect(() => {
        console.log("-----------------------------")
        console.log(questions);
    }, [questions]);

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/quizzes');
            const data = await response.json();
            setQuizzes(data);
        } catch (error) {
            console.log('Error fetching quizzes:', error);
        }
    };

    return (
        <div className="quiz-list">
            <h2>Quiz List</h2>
            {quizzes.map((quiz) => (
                <div key={quiz.id} className="quiz-item">
                    <h3>{quiz.technology}</h3>
                    <button onClick={() => handleQuizClick(quiz.id)}>Open Quiz</button>
                </div>
            ))}

            {selectedQuizId && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Quiz Modal: {selectedQuizId}</h3>
{/* {questions.map(ho=><div>{ho.}</div>)} */}
                        {questions.map((question) => (
                            <div key={question.id}>
                                <h4>{question.ques}</h4>
                                <ul>
                                    <li>{question.o1}</li>
                                    <li>{question.o2}</li>
                                    <li>{question.o3}</li>
                                    <li>{question.o4}</li>
                                </ul>
                            </div>
                        ))}

                        <button onClick={() => setSelectedQuizId(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizList;
