import React from 'react';
import QuestionForm from '../Uvindu_components/QuestionForm';
import QuestionList from '../Uvindu_components/QuestionList';
import { useParams } from 'react-router-dom';

const QuestionPage = () => {
  const { recipeId } = useParams();

  return (
    <div className="max-w-3xl mx-auto py-8">
      <QuestionForm recipeId={recipeId} onQuestionAdded={() => window.location.reload()} />
      <QuestionList recipeId={recipeId} />
    </div>
  );
};

export default QuestionPage;
