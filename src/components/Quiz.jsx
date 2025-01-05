// src/components/Quiz.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory, setScore } from '../store/actions/quizActions';
import QnA from './QnA';
import CategorySelection from './CategorySelection';

const Quiz = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.quiz.category);
  const score = useSelector((state) => state.quiz.score);

  const handleSetCategory = (newCategory) => {
    dispatch(setCategory(newCategory));
  };

  const handleSetScore = (newScore) => {
    dispatch(setScore(newScore));
  };

  return (
    <div className="container mx-auto px-4 min-h-[calc(100vh-theme(spacing.navbar))] flex items-center justify-center">
      <div className="w-full">
        {category && (
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold text-navy-blue">
              Score: <span className="badge badge-neutral">{score}</span>
            </h3>
          </div>
        )}
        <div className="flex flex-col items-center">
          {!category ? (
            <div id="quiz" className="text-center w-full max-w-4xl">
              <h3 className="text-xl text-navy-blue mb-4">Select Quiz Category:</h3>
              <CategorySelection setCategory={handleSetCategory} layout="grid" />
            </div>
          ) : (
            <div className="w-full max-w-2xl">
              <QnA category={category} setScore={handleSetScore} score={score} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
