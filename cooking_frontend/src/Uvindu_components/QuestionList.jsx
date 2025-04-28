import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuestionList = ({ recipeId }) => {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`http://localhost:9090/api/questions/recipe/${recipeId}`);
      setQuestions(res.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [recipeId]);

  return (
    <div className="p-4 shadow rounded bg-white mt-6">
      <h2 className="text-xl mb-3 font-semibold">Questions & Answers</h2>
      {questions.length === 0 ? (
        <p>No questions yet. Be the first to ask!</p>
      ) : (
        <ul className="space-y-4">
          {questions.map((q) => (
            <li key={q.id} className="border p-3 rounded">
              <p><strong>{q.customerName}</strong> asked:</p>
              <p className="mb-2">{q.questionText}</p>
              {q.answerText ? (
                <p className="text-green-600"><strong>Answer:</strong> {q.answerText}</p>
              ) : (
                <p className="text-gray-400">Not answered yet.</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestionList;
