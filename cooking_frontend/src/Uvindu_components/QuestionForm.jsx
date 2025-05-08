import React, { useState } from 'react';
import { Send, MessageSquare, User } from 'lucide-react';

const QuestionForm = ({ recipeId, onSubmitSuccess }) => {
  const [user, setUser] = useState('');
  const [content, setContent] = useState('');
  const [showQuestions, setShowQuestions] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulating the axios post request
    console.log('Submitting:', { recipeId, user, content });
    
    // Show success animation
    setSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setUser('');
      setContent('');
      setSubmitted(false);
      if (onSubmitSuccess) onSubmitSuccess();
    }, 1500);
  };

  // Sample previous questions for display
  const previousQuestions = [
    { user: 'kmdkc', content: 'n x', date: '5/8/2025, 10:20:31 AM' },
    // More questions could be added here
  ];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Question Form Card */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Toggle Questions Button */}
        <button 
          onClick={() => setShowQuestions(!showQuestions)}
          className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 hover:bg-blue-700 transition-colors"
        >
          <MessageSquare size={18} />
          {showQuestions ? 'Hide Questions' : 'Show Questions'}
        </button>

        {/* Ask Question Section */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Ask a Question</h2>
          
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Your Name"
                className="border-2 border-gray-300 rounded-lg p-3 pl-10 w-full focus:border-blue-500 focus:outline-none transition-colors"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
            </div>
            
            <div className="relative">
              <textarea
                placeholder="Type your question..."
                className="border-2 border-gray-300 rounded-lg p-3 w-full h-32 focus:border-blue-500 focus:outline-none transition-colors"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={submitted}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-all ${
                  submitted
                    ? 'bg-green-500 scale-105'
                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md'
                }`}
              >
                {submitted ? 'Submitted!' : 'Submit'}
                {submitted ? null : <Send size={18} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Previous Questions Section */}
        {showQuestions && (
          <div className="border-t border-gray-200">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4 text-center">Previous Questions</h3>
              
              <ul className="space-y-4">
                {previousQuestions.map((question, index) => (
                  <li key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-blue-600">{question.user}:</span>
                      <span className="text-sm text-gray-500">{question.date}</span>
                    </div>
                    <p className="text-gray-700">{question.content}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionForm;