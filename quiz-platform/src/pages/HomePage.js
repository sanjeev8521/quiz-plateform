import React from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ marginTop: 3 }}>
      <Grid item>
        <Card>
          <CardContent>
            <Typography variant="h5">Create New Quiz</Typography>
            <Button variant="contained" onClick={() => navigate('/create-quiz')}>
              Go
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card>
          <CardContent>
            <Typography variant="h5">My Quizzes</Typography>
            <Button variant="contained" onClick={() => navigate('/my-quiz')}>
              Go
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card>
          <CardContent>
            <Typography variant="h5">Play Quiz</Typography>
            <Button variant="contained" onClick={() => navigate('/play-quiz')}>
              Go
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default HomePage;
