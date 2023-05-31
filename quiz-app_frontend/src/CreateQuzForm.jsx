import React, { useState } from 'react';

const CreateQuizForm = () => {
    const [technology, setTechnology] = useState('');

    const handleCreateQuiz = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/quizzes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(technology),
            });

            if (response.ok) {
                const createdQuiz = await response.json();
                console.log('Quiz created:', createdQuiz);
                // Handle the created quiz as needed
            } else {
                console.log('Failed to create quiz:', response.status);
                // Handle the failure case
            }
        } catch (error) {
            console.log('Error creating quiz:', error);
            // Handle any errors
        }
    };

    return (
        <form onSubmit={handleCreateQuiz}>
            <label>
                <input
                    type="text"
                    placeholder='Technology'
                    value={technology}
                    onChange={(e) => setTechnology(e.target.value)}
                />
            </label>
            <button type="submit">Create Quiz</button>
        </form>
    );
};

export default CreateQuizForm;
