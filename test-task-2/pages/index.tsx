import { KeyboardReturnTwoTone } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react';
import AppModeBtn from '../components/AppModeBtn';
import QuestionBlock from '../components/QuestionBlock';
import QuestionBlockCorrection from '../components/QuestionBlockCorrection';
import QuizLine from '../components/QuizLine';
import ResultsBlock from '../components/ResultsBlock';
import { questions } from '../data';
import { IQuestion } from '../types';

const Home: NextPage = () => {
  const questionsItems = questions.sort(() => Math.random() - 0.5);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const totalQuestion = questionsItems.length - 1;
  const quizRef = useRef<null | HTMLDivElement>(null);

  const [questionIdx, setQuestionIdx] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [emptyAnswers, setEmptyAnswers] = useState(0);

  const handleQuestionClick = (selectedValue: number[] | string, currQuestion: IQuestion) => {
    if (totalQuestion >= questionIdx) {
      (questionsItems.find(itm => itm.id === currQuestion.id) as IQuestion).selected = selectedValue;
      setQuestionIdx((prev) => prev + 1);

      if (selectedValue.length < 1) {
        setEmptyAnswers((prev) => prev + 1);
        return;
      }

      if (typeof selectedValue === 'string'
        && selectedValue.trim().toLowerCase() === currQuestion.correctAnswers) {
        setCorrectAnswers((prev) => prev + 1);
        return;
      }

      if (Array.isArray(selectedValue) &&
        selectedValue.filter(v =>
          (currQuestion.correctAnswers as number[]).includes(v)).length === currQuestion.correctAnswers.length) {
        setCorrectAnswers((prev) => prev + 1);
        return;
      }

      setWrongAnswers((prev) => prev + 1);

    }
  };

  const resetSelection = () => {
    questionsItems.forEach((q) => (q.selected = null));
  };

  const handleRestartClick = () => {
    setQuizFinished(false);
    setQuizStarted(false);
    resetSelection();
    setQuestionIdx(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setEmptyAnswers(0);
  };

  useEffect(() => {
    if (quizStarted) {
      document.body.classList.add("game-started");
    } else {
      document.body.classList.remove("game-started");
    }
  }, [quizStarted]);

  useEffect(() => {
    if (questionIdx > totalQuestion) {
      setQuizFinished(true);
    }
  }, [questionIdx, totalQuestion]);

  return (
    <Box
      ref={quizRef}
      sx={{
        width: 400,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        m: '0 auto'
      }}
    >
      <AppModeBtn />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <QuizLine
          questions={questionsItems}
          title="React Quiz"
          description={`The test contains ${questionsItems.length} questions and there is no time limit.`}
          quizStarted={quizStarted}
          handleStart={() => setQuizStarted(true)}
        />
        {quizFinished && <ResultsBlock
          wrongAnswers={wrongAnswers}
          correctAnswers={correctAnswers}
          emptyAnswers={emptyAnswers}
        />}
        {quizFinished && <Button
          variant="contained"
          onClick={() => handleRestartClick()}
        >
          Restart Quiz
        </Button>}
      </Box>
      <div className="game-area">
        {questionsItems[questionIdx] && quizStarted && (
          <QuestionBlock
            questionMap={questionsItems[questionIdx]}
            buttonText={
              questionIdx !== totalQuestion ? "Next Question" : "Finish Quiz"
            }
            onBtnClick={handleQuestionClick}
          />
        )}

        {quizFinished && (
          <QuestionBlockCorrection questions={questionsItems} />
        )}
      </div>
    </Box>
  );
}

export default Home
