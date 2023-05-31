# /api/questions:

- GET: The `getAllQuestions()` function retrieves all questions from the database using the `questionRepository`. It returns a list of Question objects as the response.
- POST: The `createQuestion()` function creates a new question by accepting the question details in the request body. It saves the question using the `questionRepository` and returns the created Question object as the response.

# /api/questions/{id}:

- GET: The `getQuestionById()` function retrieves a specific question by its ID. It uses the `questionRepository` to find the question and returns it as the response.
- PUT: The `updateQuestion()` function updates an existing question by its ID. It accepts the updated question details in the request body, finds the question using the `questionRepository`, updates its fields, and saves it. The updated Question object is returned as the response.
- DELETE: The `deleteQuestion()` function deletes a specific question by its ID. It uses the `questionRepository` to find the question, and if found, deletes it from the database.

# /api/quizzes:

- GET: The `getAllQuizzes()` function retrieves all quizzes from the database using the `quizRepository`. It returns a list of Quiz objects as the response.
- POST: The `createQuiz()` function creates a new quiz by accepting the quiz details in the request body. It saves the quiz using the `quizRepository` and returns the created Quiz object as the response.

# /api/quizzes/{id}:

- GET: The `getQuizById()` function retrieves a specific quiz by its ID. It uses the `quizRepository` to find the quiz and returns it as the response.
- PUT: The `updateQuiz()` function updates an existing quiz by its ID. It accepts the updated quiz details in the request body, finds the quiz using the `quizRepository`, updates its fields, and saves it. The updated Quiz object is returned as the response.
- DELETE: The `deleteQuiz()` function deletes a specific quiz by its ID. It uses the `quizRepository` to find the quiz, and if found, deletes it from the database.

# /api/quizzes/{id}/verify:

- POST: The `verifyQuizAnswers()` function verifies the user's answers for a specific quiz. It accepts the quiz ID in the URL path and the user's answers as a list of strings in the request body. The function retrieves the quiz and its associated questions from the database using the `quizRepository` and `questionRepository`. It compares the user's answers with the correct answers for each question and calculates the score. The score is returned as an integer value in the response.

These endpoint functions leverage the Spring Data JPA repositories (questionRepository and quizRepository) to interact with the database and perform CRUD operations on the question and quiz entities. They handle the request, process the data, and return the appropriate responses based on the operation being performed.
