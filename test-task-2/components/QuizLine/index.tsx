import { Box, Button, Typography } from '@mui/material';
import React, { FC } from 'react'
import { IQuestion } from '../../types';

type QuizLineProps = {
  title: string;
  description: string;
  quizStarted: boolean;
  handleStart: () => void;
  questions: IQuestion[];
}

const QuizLine: FC<QuizLineProps> = ({
  title,
  description,
  quizStarted,
  handleStart,
  questions
}) => {
  return (
    <>
      <Typography variant="h2">{title}</Typography>
      {!quizStarted && (
        <>
          <Typography variant="subtitle1" sx={{ mt: 2, mb: 6 }}>{description}</Typography>
          <Button onClick={handleStart} variant="contained">
            Start Quiz
          </Button>
        </>
      )}
      {quizStarted && (
        <Box>
          {questions.map((q, idx) => {
            return (
              <Box
                key={idx}
              />
            );
          })}
        </Box>
      )}
    </>
  )
}

export default QuizLine