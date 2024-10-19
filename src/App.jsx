import React, { useState } from 'react';
import { 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  LinearProgress, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormControl, 
  Alert, 
  AlertTitle,
  Box,
  Container,
  CssBaseline
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    success: {
      main: '#388e3c',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const questions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: ["Charles Dickens", "J.K. Rowling", "William Shakespeare", "Jane Austen"],
    correctAnswer: "William Shakespeare"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    correctAnswer: "Mars"
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
    correctAnswer: "Blue Whale"
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["O2", "CO2", "H2O", "NaCl"],
    correctAnswer: "H2O"
  },
  {
    question: "In which year did the Titanic sink?",
    options: ["1912", "1920", "1898", "1941"],
    correctAnswer: "1912"
  },
  {
    question: "Which country is home to the kangaroo?",
    options: ["Australia", "India", "South Africa", "Brazil"],
    correctAnswer: "Australia"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Claude Monet", "Pablo Picasso"],
    correctAnswer: "Leonardo da Vinci"
  },
  {
    question: "How many continents are there on Earth?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "7"
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    correctAnswer: "Diamond"
  }
];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleSubmit = () => {
    setShowFeedback(true);
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer('');
    setShowFeedback(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer('');
    setShowFeedback(false);
  };

  const renderContent = () => {
    if (showScore) {
      const percentage = (score / questions.length) * 100;
      return (
        <Card sx={styles.card}>
          <CardContent>
            <Typography variant="h4" component="div" gutterBottom align="center">
              Quiz Completed!
            </Typography>
            <Box display="flex" justifyContent="center" my={2}>
              {percentage >= 70 ? (
                <EmojiEventsIcon sx={{ fontSize: 60, color: 'gold' }} />
              ) : (
                <SentimentVeryDissatisfiedIcon sx={{ fontSize: 60, color: 'primary.main' }} />
              )}
            </Box>
            <Typography variant="h5" align="center" gutterBottom>
              Your score: {score} out of {questions.length}
            </Typography>
            <LinearProgress variant="determinate" value={percentage} sx={styles.progressBar} />
            <Typography variant="body2" align="center" color="text.secondary">
              {percentage}% Correct
            </Typography>
            <Button variant="contained" fullWidth onClick={restartQuiz} sx={styles.restartButton}>
              Restart Quiz
            </Button>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card sx={styles.card}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom align="center">
            Question {currentQuestion + 1} of {questions.length}
          </Typography>
          <LinearProgress variant="determinate" value={(currentQuestion / questions.length) * 100} sx={styles.progressBar} />
          <Typography variant="body1" gutterBottom align="center" sx={styles.questionText}>
            {questions[currentQuestion].question}
          </Typography>
          <FormControl component="fieldset" sx={{ width: '100%' }}>
            <RadioGroup
              aria-label="quiz"
              name="quiz"
              value={selectedAnswer}
              onChange={handleAnswerChange}
            >
              {questions[currentQuestion].options.map((option, index) => (
                <FormControlLabel 
                  key={index} 
                  value={option} 
                  control={<Radio />} 
                  label={option} 
                  disabled={showFeedback}
                  sx={styles.option}
                />
              ))}
            </RadioGroup>
          </FormControl>
          {showFeedback && (
            <Alert 
              severity={selectedAnswer === questions[currentQuestion].correctAnswer ? "success" : "error"}
              sx={{ mt: 2 }}
            >
              <AlertTitle>{selectedAnswer === questions[currentQuestion].correctAnswer ? 'Correct!' : 'Incorrect'}</AlertTitle>
              {selectedAnswer === questions[currentQuestion].correctAnswer
                ? 'Great job!'
                : `The correct answer is: ${questions[currentQuestion].correctAnswer}`}
            </Alert>
          )}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button 
              variant="contained" 
              onClick={handleSubmit} 
              disabled={!selectedAnswer || showFeedback}
              sx={styles.submitButton}
            >
              Submit Answer
            </Button>
            <Button 
              variant="contained" 
              onClick={handleNextQuestion} 
              disabled={!showFeedback}
              sx={styles.nextButton}
            >
              {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={styles.container}>
        <Box sx={styles.box}>
          {renderContent()}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

// Styles
const styles = {
  container: {
    minHeight: '100vh', 
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#f7f7f7', // Light gray background for separation

  },
  card: {
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: '20px',
    boxShadow: 5, // More pronounced box shadow for depth
    borderRadius: '15px',
    backgroundColor: '#fff',
    maxWidth: '500px', // Larger max width for better readability
    width: '100%', 
    
  },
  option: {
    margin: '10px 0',
  },
  submitButton: {
    backgroundColor: '#388e3c', // Green background for success-like action
    '&:hover': {
      backgroundColor: '#2e7d32',
    },
    padding: '10px 20px',
  },
  nextButton: {
    backgroundColor: '#1976d2', // Blue background for Next action
    '&:hover': {
      backgroundColor: '#1565c0',
    },
    padding: '10px 20px',
  },
  restartButton: {
    backgroundColor: '#f44336', // Red for restart button
    '&:hover': {
      backgroundColor: '#d32f2f',
    },
    padding: '10px 20px',
    mt: 2,
  },
  progressBar: {
    height: '10px', // Larger height for better visual impact
    borderRadius: '5px', // Rounded corners for the progress bar
    my: 2,
  },
  box: {
    width: '100%',
    padding: '0 20px', 
  },
  questionText: {
    marginTop: '20px',
    fontWeight: 'bold',
    fontSize: '18px',
  },
};

