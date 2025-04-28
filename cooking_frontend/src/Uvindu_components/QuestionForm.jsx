import React, { useState } from 'react';
import axios from 'axios';

const QuestionForm = ({ recipeId, onQuestionAdded }) => {
  const [customerName, setCustomerName] = useState('');
  const [questionText, setQuestionText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newQuestion = {
      recipeId,
      customerName,
      questionText,
      askedAt: new Date(),
    };

    try {
      await axios.post('http://localhost:9090/api/questions/ask', newQuestion);
      setCustomerName('');
      setQuestionText('');
      if (onQuestionAdded) onQuestionAdded(); // Refresh list after asking
    } catch (error) {
      console.error('Error asking question:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-white">
      <h2 className="text-xl mb-3 font-semibold">Ask a Question</h2>
      <input
        type="text"
        placeholder="Your Name"
        className="border p-2 w-full mb-2 rounded"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        required
      />
      <textarea
        placeholder="Your Question"
        className="border p-2 w-full mb-2 rounded"
        rows="4"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        required
      ></textarea>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Submit Question
      </button>
    </form>
  );
};

export default QuestionForm;
