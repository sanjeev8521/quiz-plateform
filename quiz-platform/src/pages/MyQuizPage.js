// src/pages/MyQuizPage.js
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Radio, RadioGroup, FormControlLabel, Modal, Box, TextField } from '@mui/material';

const MyQuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    setQuestions(storedQuestions);
  }, []);

  const handleEditQuestion = (question) => {
    setSelectedQuestion({ ...question });
    setOpenEditModal(true);
  };

  const handleDeleteQuestion = (question) => {
    setQuestionToDelete(question);
    setOpenDeleteModal(true);
  };

  const handleStatusChange = (event, question) => {
    const updatedQuestions = questions.map((q) =>
      q === question ? { ...q, isActive: event.target.value === 'active' } : q
    );
    setQuestions(updatedQuestions);
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
  };

  const handleSaveEditedQuestion = () => {
    const updatedQuestions = questions.map((q) =>
      q === selectedQuestion ? { ...q, ...selectedQuestion } : q
    );
    setQuestions(updatedQuestions);
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
    setOpenEditModal(false);
  };

  const handleAddOption = () => {
    setSelectedQuestion({
      ...selectedQuestion,
      options: [...selectedQuestion.options, ''], // Add a blank option
    });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...selectedQuestion.options];
    updatedOptions[index] = value;
    setSelectedQuestion({ ...selectedQuestion, options: updatedOptions });
  };

  const handleDeleteConfirm = () => {
    const updatedQuestions = questions.filter((q) => q !== questionToDelete);
    setQuestions(updatedQuestions);
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
    setOpenDeleteModal(false);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        My Quizzes
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question, index) => (
              <TableRow key={index}>
                <TableCell>{question.title}</TableCell>
                <TableCell>
                  <RadioGroup
                    value={question.isActive ? 'active' : 'inactive'}
                    onChange={(e) => handleStatusChange(e, question)}
                    row
                  >
                    <FormControlLabel value="active" control={<Radio />} label="Active" />
                    <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
                  </RadioGroup>
                </TableCell>
                <TableCell>{new Date(question.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditQuestion(question)}>Edit</Button>
                  <Button onClick={() => handleDeleteQuestion(question)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Question Modal */}
      <Modal open={openEditModal} onClose={handleCloseEditModal}>
        <Box sx={{ padding: 3, margin: 'auto', marginTop: 10, width: 400, backgroundColor: 'white' }}>
          <Typography variant="h6">Edit Question</Typography>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={selectedQuestion?.title || ''}
            onChange={(e) => setSelectedQuestion({ ...selectedQuestion, title: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Question"
            variant="outlined"
            fullWidth
            value={selectedQuestion?.question || ''}
            onChange={(e) => setSelectedQuestion({ ...selectedQuestion, question: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <Typography variant="h6" sx={{ marginTop: 2 }}>Options</Typography>
          {selectedQuestion?.options.map((option, index) => (
            <div key={index}>
              <TextField
                label={`Option ${index + 1}`}
                variant="outlined"
                fullWidth
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                sx={{ marginBottom: 2 }}
              />
            </div>
          ))}
          <Button variant="contained" onClick={handleAddOption} sx={{ marginBottom: 2 }}>
            Add Option
          </Button>
          <Button variant="contained" onClick={handleSaveEditedQuestion}>Save</Button>
        </Box>
      </Modal>

      {/* Delete Question Modal */}
      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <Box sx={{ padding: 3, margin: 'auto', marginTop: 10, width: 400, backgroundColor: 'white' }}>
          <Typography variant="h6">Are you sure you want to delete this question?</Typography>
          <Button onClick={handleDeleteConfirm} sx={{ marginTop: 2 }}>Yes</Button>
          <Button onClick={handleCloseDeleteModal} sx={{ marginTop: 2, marginLeft: 2 }}>No</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default MyQuizPage;
