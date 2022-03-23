import React, { FC } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import WrongIcon from '@mui/icons-material/Clear';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Box, SxProps } from '@mui/material';

type ResultBlock = {
  correctAnswers: number;
  wrongAnswers: number;
  emptyAnswers: number;
}

const ResultBlock: FC<ResultBlock> = ({ correctAnswers, wrongAnswers, emptyAnswers }) => {
  const alignment: SxProps<any> =
  {
    display: 'flex',
    alignItems: 'center'
  };

  return (
    <Box>
      <Box sx={alignment}>
        <Box>{correctAnswers}</Box>
        <Box sx={alignment}>
          <CheckIcon />
          CORRECT
        </Box>
      </Box>
      <Box sx={alignment}>
        <Box>{wrongAnswers}</Box>
        <Box sx={alignment}>
          <WrongIcon />
          WRONG
        </Box>
      </Box>
      <Box sx={alignment}>
        <Box>{emptyAnswers}</Box>
        <Box sx={alignment}>
          <CheckBoxOutlineBlankIcon />
          EMPTY
        </Box>
      </Box>
    </Box>
  );
}

export default ResultBlock