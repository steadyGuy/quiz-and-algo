import { IQuestion } from "../types";

export const questions: IQuestion[] = [
  {
    id: 0,
    title: "What is the correct command to create a new React project?",
    answers: [
      "npm create-react-app myReactApp",
      "npx create-react-app",
      "npm create-react-app",
      "npx create-react-app myReactApp",
    ],
    correctAnswers: [3],
    type: "single",
    selected: null,
  },
  {
    id: 1,
    title: "Which of the following are not a React library",
    answers: ["Node.js", "Next.js", "Nuxt.js", "Spring Boot"],
    correctAnswers: [0, 2, 3],
    type: "multiple",
    selected: null,
  },
  {
    id: 2,
    title: "Which keyword creates a constant in JavaScript?",
    correctAnswers: "const",
    type: "input",
    selected: null,
  },
];
