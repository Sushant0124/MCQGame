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
  },
});

const questions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Jupiter", "Venus", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale"
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
    correctAnswer: "William Shakespeare"
  },
  {
    question: "Which is the smallest continent by land area?",
    options: ["Europe", "Australia", "Antarctica", "South America"],
    correctAnswer: "Australia"
  },
  {
    question: "In what year did the Titanic sink?",
    options: ["1912", "1905", "1923", "1898"],
    correctAnswer: "1912"
  },
  {
    question: "Who was the first person to step on the moon?",
    options: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "John Glenn"],
    correctAnswer: "Neil Armstrong"
  },
  {
    question: "Which element is represented by the chemical symbol 'O'?",
    options: ["Oxygen", "Osmium", "Oganesson", "Oxygenium"],
    correctAnswer: "Oxygen"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Southern Ocean"],
    correctAnswer: "Pacific Ocean"
  },
  {
    question: "Which country hosted the 2016 Summer Olympics?",
    options: ["China", "Brazil", "Russia", "Japan"],
    correctAnswer: "Brazil"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Claude Monet", "Leonardo da Vinci", "Pablo Picasso"],
    correctAnswer: "Leonardo da Vinci"
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Gd", "Au", "Ag", "Pt"],
    correctAnswer: "Au"
  },
  {
    question: "Which year did World War II end?",
    options: ["1945", "1939", "1918", "1950"],
    correctAnswer: "1945"
  },
  {
    question: "What is the name of the longest river in the world?",
    options: ["Nile", "Amazon", "Yangtze", "Mississippi"],
    correctAnswer: "Nile"
  },
  {
    question: "Which organ in the human body is responsible for pumping blood?",
    options: ["Lungs", "Liver", "Heart", "Kidney"],
    correctAnswer: "Heart"
  },
  {
    question: "Which company is known for producing the iPhone?",
    options: ["Samsung", "Google", "Apple", "Microsoft"],
    correctAnswer: "Apple"
  },
  {
    question: "How many players are on a standard soccer team on the field?",
    options: ["9", "10", "11", "12"],
    correctAnswer: "11"
  },
  {
    question: "What is the boiling point of water in Celsius?",
    options: ["50°C", "90°C", "100°C", "110°C"],
    correctAnswer: "100°C"
  },
  {
    question: "Which country is the largest by area?",
    options: ["United States", "Canada", "Russia", "China"],
    correctAnswer: "Russia"
  },
  {
    question: "Who invented the telephone?",
    options: ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Isaac Newton"],
    correctAnswer: "Alexander Graham Bell"
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
            <LinearProgress variant="determinate" value={percentage} sx={{ my: 2 }} />
            <Typography variant="body2" align="center" color="text.secondary">
              {percentage}% Correct
            </Typography>
            <Button variant="contained" fullWidth onClick={restartQuiz} sx={{ mt: 2 }}>
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
          <LinearProgress variant="determinate" value={(currentQuestion / questions.length) * 100} sx={{ mb: 2 }} />
          <Typography variant="body1" gutterBottom align="center" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
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
              sx={styles.button}
            >
              Submit Answer
            </Button>
            <Button 
              variant="contained" 
              onClick={handleNextQuestion} 
              disabled={!showFeedback}
              sx={styles.button}
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
    minHeight: '100vh', // Takes full height of the viewport
    display: 'flex',
    justifyContent: 'center', // Centers horizontally
    alignItems: 'center', // Centers vertically
    backgroundColor: '#f5f5f5', // Light background color
  },
  card: {
    padding: '20px',
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
    borderRadius: '15px',
    backgroundColor: '#fff',
    maxWidth: '400px', // Restricts card width to 400px max
    width: '100%', // Ensures card takes full width up to 400px
  },
  option: {
    margin: '10px 0',
  },
  button: {
    padding: '10px 20px 10px 10px',
    fontSize: '0.7rem',
    fontWeight: 'bold',

  },
};



