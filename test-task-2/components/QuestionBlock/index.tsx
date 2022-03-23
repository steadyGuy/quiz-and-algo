import { Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, List, ListItem, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { FC, useState } from 'react'
import { IQuestion } from '../../types';

type QuestionBlockProps = {
  questionMap: IQuestion;
  buttonText?: string;
  hasBtn?: boolean;
  onBtnClick?: (answr: string | number[], questionMap: IQuestion) => void;
  showAnswer?: boolean;
  markSelection?: null | number[] | string;
}

const QuestionBlock: FC<QuestionBlockProps> = ({
  questionMap,
  buttonText,
  onBtnClick,
  hasBtn = true,
  showAnswer = false,
  markSelection = null,
}) => {
  const [radioButtonsAnswer, setRadioButtonsAnswer] = useState<number[]>([]);
  const [stringAnswer, setStringAnswer] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('');

  const handleAnswer = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
    const value = e.target.value;

    if (questionMap.type === 'single') {
      setRadioButtonsAnswer([Number(value)]);
    } else if (questionMap.type === 'multiple') {
      if (radioButtonsAnswer.includes(Number(value))) {
        return setRadioButtonsAnswer((prev) => prev.filter((itm) => itm !== Number(value)));
      }
      setRadioButtonsAnswer((prev) => [...prev, Number(value)]);
    } else if (questionMap.type === 'input') {
      setStringAnswer(value);
    }

    setCurrentQuestion(name);
  }

  const handleNextQuestion = () => {
    if (onBtnClick) {
      onBtnClick(radioButtonsAnswer.length > 0 ? radioButtonsAnswer : stringAnswer, questionMap);
      setStringAnswer('');
      setRadioButtonsAnswer([]);
    }
  }

  const renderSingleRadio = () => {
    return (
      questionMap?.answers?.map((text, idx) => {
        const value = idx;
        const name = `q_${questionMap.id}`;
        return (
          <FormControlLabel key={idx} control={
            <Radio
              checked={
                !showAnswer ?
                  (radioButtonsAnswer.includes(value) && currentQuestion === name) :
                  typeof markSelection !== 'string' && markSelection?.includes(idx)
              }
              onChange={(e) => handleAnswer(e, name)}
              value={value}
              name={name}
            />
          }
            label={text}
          />

        );
      })
    );
  };

  const renderCheckboxGroup = () => {
    return (
      questionMap?.answers?.map((text, idx) => {
        const value = idx;
        const name = `q_${questionMap.id}`;
        return (
          <FormControlLabel key={idx} control={
            <Checkbox
              checked={!showAnswer
                ? (radioButtonsAnswer.includes(value) && currentQuestion === name) :
                typeof markSelection !== 'string' && markSelection?.includes(idx)
              }
              onChange={(e) => handleAnswer(e, name)}
              value={value}
              name={name}
            />
          }
            label={text}
          />

        );
      })
    );
  };

  const renderInput = () => {
    return (
      <TextField
        label={markSelection ? undefined : "Print your answer"}
        disabled={!!markSelection}
        name="input-q"
        variant="outlined"
        onChange={(e) => handleAnswer(e, "input-q")}
        value={markSelection || undefined}
      />
    );
  };

  return (
    <Box mt={4}>
      <Box sx={{ my: 2 }}>
        <FormControl>
          <FormLabel sx={{ textAlign: 'center', mb: 1.5 }}>{questionMap.title}</FormLabel>
          {questionMap.type === 'single' && renderSingleRadio()}
          {questionMap.type === 'multiple' && renderCheckboxGroup()}
          {questionMap.type === 'input' && renderInput()}
        </FormControl>
      </Box>
      {hasBtn && (
        <Button
          onClick={handleNextQuestion}>
          {buttonText}
        </Button>
      )}
    </Box>
  );
}

export default QuestionBlock