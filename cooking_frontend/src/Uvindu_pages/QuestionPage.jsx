import React, { useEffect, useState } from 'react';
import QuestionForm from '../Uvindu_components/QuestionForm';
import QuestionList from '../Uvindu_components/QuestionList';
import { useParams } from 'react-router-dom';

const QuestionPage = () => {
  const { recipeId } = useParams();
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const userData = JSON.parse(userString);
        setCurrentUser(userData.username || userData.email);
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-8">
      <QuestionForm 
        recipeId={recipeId} 
        currentUser={currentUser}
        onQuestionAdded={() => window.location.reload()} 
      />
      <QuestionList recipeId={recipeId} />
    </div>
  );
};

export default QuestionPage;