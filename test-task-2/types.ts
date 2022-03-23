export interface IQuestion {
  id: number;
  title: string;
  answers?: string[];
  correctAnswers: number[] | string;
  type: 'single' | 'multiple' | 'input';
  selected: null | number[] | string;
};