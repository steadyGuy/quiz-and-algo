import { Box } from '@mui/material';
import React, { FC } from 'react'
import { IQuestion } from '../../types';
import QuestionBlock from '../QuestionBlock';

type QuestionBlockCorrection = {
  questions: IQuestion[];
}

const QuestionBlockCorrection: FC<QuestionBlockCorrection> = ({ questions }) => {
  return (
    <Box>
      {questions.map((question, idx) => {
        return (
          <QuestionBlock
            key={idx}
            hasBtn={false}
            markSelection={question.selected}
            showAnswer={true}
            questionMap={question}
          />
        );
      })}
    </Box>
  );
}

export default QuestionBlockCorrection