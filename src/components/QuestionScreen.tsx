import React from 'react';
import { useTranslation } from 'react-i18next';
import { Trait } from '../types';
import './QuestionScreen.css';

interface QuestionScreenProps {
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (trait: Trait) => void;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  currentQuestion,
  totalQuestions,
  onAnswer,
}) => {
  const { t } = useTranslation();
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  
  const question = t(`questions.${currentQuestion}.question`);
  const options = [
    { text: t(`questions.${currentQuestion}.options.0`), trait: ['E', 'N', 'T', 'J', 'E', 'N', 'T', 'J'][currentQuestion] as Trait },
    { text: t(`questions.${currentQuestion}.options.1`), trait: ['I', 'S', 'F', 'P', 'I', 'S', 'F', 'P'][currentQuestion] as Trait }
  ];

  return (
    <div className="question-screen">
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="progress-text">
          {currentQuestion + 1} / {totalQuestions}
        </div>
      </div>
      <div className="question-container">
        <h2>{question}</h2>
        <div className="options">
          {options.map((option, index) => (
            <button
              key={index}
              className="option-btn"
              onClick={() => onAnswer(option.trait)}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
