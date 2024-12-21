import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Radio, RadioGroup, FormControlLabel, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PlayQuizPage = () => {
  const navigate = useNavigate();

  // Initialize state for quiz data and answers
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);

  // Fetch questions from localStorage when component loads
  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    if (storedQuestions.length > 0) {
      setQuestions(storedQuestions);
    }
  }, []);

  // Handle answer selection for current question
  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  // Proceed to the next question
  const handleNextQuestion = () => {
    // Save the selected answer for the current question
    setAnswers([
      ...answers,
      {
        questionIndex: currentQuestionIndex,
        answer: selectedAnswer,
        correctAnswer: questions[currentQuestionIndex].correctAnswer, // Store correct answer for comparison
      },
    ]);

    // Clear selected answer and move to the next question
    setSelectedAnswer('');
    setCurrentQuestionIndex(currentQuestionIndex + 1);

    // If all questions are answered, show submit button
    if (currentQuestionIndex === questions.length - 1) {
      setQuizFinished(true);
    }
  };

  // Submit the quiz and navigate to result page
  const handleSubmit = () => {
    localStorage.setItem('quizAnswers', JSON.stringify(answers));
    navigate('/result');
  };

  // Render the current question
  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];

    // Ensure we have a valid question
    if (!currentQuestion) {
      return <Typography variant="h6">No more questions available.</Typography>;
    }

    return (
      <Card sx={{ maxWidth: 600, margin: 'auto', padding: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {currentQuestion.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentQuestion.question}
          </Typography>
          <RadioGroup value={selectedAnswer} onChange={handleAnswerChange}>
            {currentQuestion.options.map((option, index) => (
              <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
            ))}
          </RadioGroup>

          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body2" color="textSecondary">
              Question {currentQuestionIndex + 1} of {questions.length}
            </Typography>

            <Button
              variant="contained"
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
              sx={{ marginTop: 2 }}
            >
              Next Question
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <div>
      {!quizFinished ? (
        renderQuestion()
      ) : (
        <Box sx={{ textAlign: 'center', padding: 3 }}>
          <Typography variant="h5" gutterBottom>
            You've finished the quiz!
          </Typography>
          <Button variant="contained" onClick={handleSubmit}>
            Submit Quiz
          </Button>
        </Box>
      )}
    </div>
  );
};

export default PlayQuizPage;
