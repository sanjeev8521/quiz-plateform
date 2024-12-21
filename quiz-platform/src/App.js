import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CreateQuizPage from './pages/CreateQuizPage';
import MyQuizPage from './pages/MyQuizPage';
import PlayQuizPage from './pages/PlayQuizPage';
import ResultPage from './pages/ResultPage';

function App() {
  const [userName, setUserName] = useState(''); // State for the user's name

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-quiz" element={<CreateQuizPage />} />
        <Route path="/my-quiz" element={<MyQuizPage />} />
        <Route path="/play-quiz" element={<PlayQuizPage setUserName={setUserName} />} />
        <Route path="/result" element={<ResultPage userName={userName} />} /> {/* Pass userName to ResultPage */}
      </Routes>
    </Router>
  );
}

export default App;
