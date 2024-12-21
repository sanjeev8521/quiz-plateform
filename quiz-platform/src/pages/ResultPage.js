import React, { useEffect, useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ResultPage = ({ userName }) => { // Accept userName prop
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem('quizAnswers')) || [];
    setAnswers(savedAnswers);

    if (savedAnswers.length > 0) {
      const calculatedScore = savedAnswers.reduce((score, answer) => {
        if (answer.answer === answer.correctAnswer) {
          return score + 1;
        }
        return score;
      }, 0);

      setScore(calculatedScore);
    }
  }, []);

  const handleBackToHome = () => {
    navigate('/');
  };

  const percentage = (score / answers.length) * 100;

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        {userName ? `${userName}'s Quiz Results` : 'Quiz Results'} {/* Personalized greeting */}
      </Typography>
      {answers.length > 0 ? (
        <>
          <Typography variant="h6" gutterBottom>
            Score: {score} / {answers.length} ({Math.round(percentage)}%)
          </Typography>
          <Box sx={{ padding: 3, border: '1px solid #ccc', borderRadius: '5px' }}>
            {answers.map((answer, index) => (
              <Box
                key={index}
                sx={{
                  marginBottom: 2,
                  backgroundColor: answer.answer === answer.correctAnswer ? '#d4edda' : '#f8d7da',
                  padding: 2,
                  borderRadius: '5px',
                }}
              >
                <Typography variant="h6">
                  {`Question ${answer.questionIndex + 1}: ${answer.answer === answer.correctAnswer ? 'Correct' : 'Incorrect'}`}
                </Typography>
                <Typography variant="body2">
                  Correct Answer: {answer.correctAnswer}
                </Typography>
              </Box>
            ))}
          </Box>
        </>
      ) : (
        <Typography variant="h6" gutterBottom>
          No answers found. Please complete the quiz first.
        </Typography>
      )}
      <Button variant="contained" onClick={handleBackToHome} sx={{ marginTop: 3 }}>
        Back to Home
      </Button>
    </div>
  );
};

export default ResultPage;
