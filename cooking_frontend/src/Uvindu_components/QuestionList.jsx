import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuestionList = ({ recipeId }) => {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`/api/questions/recipe/${recipeId}`);
      setQuestions(res.data);
    } catch (err) {
      console.error('Error loading questions:', err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [recipeId]);

  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-3">Previous Questions</h3>
      {questions.length === 0 ? (
        <p>No questions yet. Be the first to ask!</p>
      ) : (
        <ul className="space-y-3">
          {questions.map((q) => (
            <li key={q.id} className="p-3 bg-gray-50 border rounded">
              <p className="font-medium text-blue-700">{q.user}:</p>
              <p>{q.content}</p>
              <p className="text-sm text-gray-500">{new Date(q.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestionList;
