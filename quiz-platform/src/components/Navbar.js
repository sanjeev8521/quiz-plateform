// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png'; // Adjust the path to your logo file

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 'none' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <Box
          component={Link}
          to="/"
          sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
        >
          <img src={Logo} alt="Logo" style={{ height: '60px' }} /> {/* Increased size */}
        </Box>

        {/* Navigation Links */}
        <Box>
          <Button color="primary" component={Link} to="/" sx={{ fontWeight: 'bold' }}>
            Home
          </Button>
          <Button color="primary" component={Link} to="/create-quiz" sx={{ fontWeight: 'bold' }}>
            Create Quiz
          </Button>
          <Button color="primary" component={Link} to="/my-quiz" sx={{ fontWeight: 'bold' }}>
            My Quizzes
          </Button>
          <Button color="primary" component={Link} to="/play-quiz" sx={{ fontWeight: 'bold' }}>
            Play Quiz
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
