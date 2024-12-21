// src/pages/CreateQuizPage.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateQuizPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleSaveQuiz = () => {
    const newQuiz = {
      title,
      question,
      options,
      correctAnswer,
      createdAt: new Date().toISOString(),
      isActive: true, // Assume the quiz is active by default
    };

    // Get current quizzes from localStorage
    const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];

    // Add the new quiz to the stored questions
    storedQuestions.push(newQuiz);

    // Save updated questions back to localStorage
    localStorage.setItem('questions', JSON.stringify(storedQuestions));

    // Redirect to My Quiz page after saving
    navigate('/my-quiz');
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Create New Quiz
      </Typography>
      <Box sx={{ maxWidth: 600, margin: 'auto' }}>
        <TextField
          label="Quiz Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Question"
          variant="outlined"
          fullWidth
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Typography variant="h6" gutterBottom>
          Options
        </Typography>
        {options.map((option, index) => (
          <TextField
            key={index}
            label={`Option ${index + 1}`}
            variant="outlined"
            fullWidth
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        ))}
        <TextField
          label="Correct Answer"
          variant="outlined"
          fullWidth
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" onClick={handleSaveQuiz} sx={{ marginTop: 2 }}>
          Save Quiz
        </Button>
      </Box>
    </div>
  );
};

export default CreateQuizPage;
