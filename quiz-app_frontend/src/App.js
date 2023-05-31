import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import {Switch} from 'react-router'
import CreateQuizForm from './CreateQuzForm';
import QuizList from './QuizList';
import QuizAttempt from './QuizAttempt';

function App() {
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
  question: '',
  option1: '',
  option2: '',
  option3: '',
  option4: '',
  answer: '',
  technology: '',
});
const [newQuiz, setNewQuiz] = useState({
  technology: '',
});
  const [quizzes, setQuizzes] = useState([]);


  useEffect(() => {
    fetchQuestions();
  }, []);
  const handleQuizClick = (quizId) => {
    setSelectedQuizId(quizId);
    setShowQuizModal(true);
  };


// const handleCreateQuiz = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await fetch('http://localhost:8080/api/quizzes', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newQuiz.technology ),
//     });

//     if (response.ok) {
//       const createdQuiz = await response.json();
//       setQuizzes([...quizzes, createdQuiz]);
//       setNewQuiz({ technology: '' });
//     } else {
//       console.log('Failed to create quiz:', response.status);
//     }
//   } catch (error) {
//     console.log('Error creating quiz:', error);
//   }
// };


  const handleAddQuestion = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:8080/api/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newQuestion),
    });
    const createdQuestion = await response.json();
    setQuestions([...questions, createdQuestion]);
    setNewQuestion({
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: '',
      technology: '',
    });
  } catch (error) {
    console.log('Error adding question:', error);
  }
};

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/questions');
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.log('Error fetching questions:', error);
    }
  };

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/questions/${selectedQuestion.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selectedQuestion),
        }
      );
      const updatedQuestion = await response.json();
      const updatedQuestions = questions.map((q) =>
        q.id === updatedQuestion.id ? updatedQuestion : q
      );
      setQuestions(updatedQuestions);
      setIsEditing(false);
    } catch (error) {
      console.log('Error updating question:', error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      await fetch(`http://localhost:8080/api/questions/${selectedQuestion.id}`, {
        method: 'DELETE',
      });
      const updatedQuestions = questions.filter(
        (q) => q.id !== selectedQuestion.id
      );
      setQuestions(updatedQuestions);
      setSelectedQuestion({});
    } catch (error) {
      console.log('Error deleting question:', error);
    }
  };

  return (
    <div className="App">
      <h1>Quiz App</h1>
      <CreateQuizForm/>
<QuizList/>
      <form onSubmit={handleAddQuestion}>
  <input
    type="text"
    placeholder="Question"
    value={newQuestion.question}
    onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
  />
  <input
    type="text"
    placeholder="Option 1"
    value={newQuestion.option1}
    onChange={(e) => setNewQuestion({ ...newQuestion, option1: e.target.value })}
  />
  <input
    type="text"
    placeholder="Option 2"
    value={newQuestion.option2}
    onChange={(e) => setNewQuestion({ ...newQuestion, option2: e.target.value })}
  />
  <input
    type="text"
    placeholder="Option 3"
    value={newQuestion.option3}
    onChange={(e) => setNewQuestion({ ...newQuestion, option3: e.target.value })}
  />
  <input
    type="text"
    placeholder="Option 4"
    value={newQuestion.option4}
    onChange={(e) => setNewQuestion({ ...newQuestion, option4: e.target.value })}
  />
  <input
    type="text"
    placeholder="Answer"
    value={newQuestion.answer}
    onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
  />
  <input
    type="text"
    placeholder="Technology"
    value={newQuestion.technology}
    onChange={(e) => setNewQuestion({ ...newQuestion, technology: e.target.value })}
  />
  <button type="submit">Add Question</button>
</form>

      <div className="question-list">
        {questions.map((question) => (
          <div
            key={question.id}
            className={`question ${question.id === selectedQuestion.id ? 'selected' : ''}`}
            onClick={() => handleQuestionClick(question)}
          >
            {question.question}
          </div>
        ))}
      </div>
      {selectedQuestion.id && (
        <div className="question-details">
          {isEditing ? (
            <>
              <input
                type="text"
                value={selectedQuestion.question}
                onChange={(e) =>
                  setSelectedQuestion({ ...selectedQuestion, question: e.target.value })
                }
              />
              <input
                type="text"
                value={selectedQuestion.option1}
                onChange={(e) =>
                  setSelectedQuestion({ ...selectedQuestion, option1: e.target.value })
                }
              />
              <input
                type="text"
                value={selectedQuestion.option2}
                onChange={(e) =>
                  setSelectedQuestion({ ...selectedQuestion, option2: e.target.value })
                }
              />
              <input
                type="text"
                value={selectedQuestion.option3}
                onChange={(e) =>
                  setSelectedQuestion({ ...selectedQuestion, option3: e.target.value })
                }
              />
              <input
                type="text"
                value={selectedQuestion.option4}
                onChange={(e) =>
                  setSelectedQuestion({ ...selectedQuestion, option4: e.target.value })
                }
              />
              <input
                type="text"
                value={selectedQuestion.answer}
                onChange={(e) =>
                  setSelectedQuestion({ ...selectedQuestion, answer: e.target.value })
                }
              />
              <input
                type="text"
                value={selectedQuestion.technology}
                onChange={(e) =>
                  setSelectedQuestion({ ...selectedQuestion, technology: e.target.value })
                }
              />
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </>
          ) : (
            <>
              <p>{selectedQuestion.question}</p>
              <p>{selectedQuestion.option1}</p>
              <p>{selectedQuestion.option2}</p>
              <p>{selectedQuestion.option3}</p>
              <p>{selectedQuestion.option4}</p>
              <p>{selectedQuestion.answer}</p>
              <p>{selectedQuestion.technology}</p>
              <button onClick={handleEditClick}>Edit</button>
              <button onClick={handleDeleteClick}>Delete</button>
            </>
          )}
          
        </div>
      )}
    </div>
  );
}

export default App;
