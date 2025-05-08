import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, User, Edit, Trash2, X, Check, AlertTriangle, Star, CornerDownRight, Sparkles } from 'lucide-react';

const QuestionSection = ({ recipeId, currentUser }) => {
  const [user, setUser] = useState(currentUser || '');
  const [content, setContent] = useState('');
  const [showQuestions, setShowQuestions] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  
  // For editing
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [editContent, setEditContent] = useState('');
  
  // For confirmation popups
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);
  const [targetQuestionId, setTargetQuestionId] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Animation states
  const [showFormAnimation, setShowFormAnimation] = useState(false);
  const [questionAdded, setQuestionAdded] = useState(false);
  const [animateQuestionId, setAnimateQuestionId] = useState(null);
  
  // Load questions from localStorage on component mount
  useEffect(() => {
    if (recipeId) {
      setLoading(true);
      
      // Try to load existing questions from localStorage
      const storedQuestions = localStorage.getItem(`questions-${recipeId}`);
      const parsedQuestions = storedQuestions ? JSON.parse(storedQuestions) : [];
      
      // If there are stored questions, use them immediately
      if (parsedQuestions.length > 0) {
        // Add unique IDs to questions if they don't have them
        const questionsWithIds = parsedQuestions.map((q, index) => ({
          ...q,
          id: q.id || `q-${Date.now()}-${index}`
        }));
        setQuestions(questionsWithIds);
        localStorage.setItem(`questions-${recipeId}`, JSON.stringify(questionsWithIds));
        setLoading(false);
      } else {
        // Otherwise fetch from API (simulated)
        setTimeout(() => {
          const sampleQuestions = [
            { 
              id: `q-${Date.now()}-0`,
              user: 'kmdkc', 
              content: 'Does this recipe work with gluten-free flour?', 
              date: '5/8/2025, 10:20:31 AM'
            }
          ];
          setQuestions(sampleQuestions);
          
          // Save to localStorage
          localStorage.setItem(`questions-${recipeId}`, JSON.stringify(sampleQuestions));
          setLoading(false);
        }, 500);
      }
    }
  }, [recipeId]);

  // Show notification
  const showNotificationMessage = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Toggle question form visibility with animation
  const toggleForm = () => {
    if (!formVisible) {
      setFormVisible(true);
      setTimeout(() => {
        setShowFormAnimation(true);
      }, 50);
    } else {
      setShowFormAnimation(false);
      setTimeout(() => {
        setFormVisible(false);
      }, 300);
    }
  };

  // Submit new question
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!user.trim() || !content.trim()) return;

    try {
      // Show success animation
      setSubmitted(true);
      
      // Create new question object with unique ID
      const newId = `q-${Date.now()}`;
      const newQuestion = {
        id: newId,
        user,
        content,
        date: new Date().toLocaleString()
      };
      
      // Update state with the new question
      const updatedQuestions = [newQuestion, ...questions];
      setQuestions(updatedQuestions);
      
      // Save to localStorage for persistence
      localStorage.setItem(`questions-${recipeId}`, JSON.stringify(updatedQuestions));
      
      // Reset form after submission and animate the newly added question
      setTimeout(() => {
        setContent('');
        setSubmitted(false);
        setAnimateQuestionId(newId);
        setQuestionAdded(true);
        showNotificationMessage('Question submitted successfully!');
        
        // Reset animation state after animation completes
        setTimeout(() => {
          setQuestionAdded(false);
          setAnimateQuestionId(null);
        }, 2000);
      }, 1000);
    } catch (error) {
      console.error('Error submitting question:', error);
      showNotificationMessage('Failed to submit question. Please try again.', 'error');
    }
  };

  // Start editing a question
  const startEditQuestion = (question) => {
    setEditingQuestionId(question.id);
    setEditContent(question.content);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingQuestionId(null);
    setEditContent('');
  };

  // Confirm before updating
  const confirmUpdate = (questionId) => {
    setTargetQuestionId(questionId);
    setShowUpdateConfirm(true);
  };

  // Update question
  const updateQuestion = () => {
    const updatedQuestions = questions.map(q => 
      q.id === targetQuestionId 
        ? { ...q, content: editContent, edited: true, editDate: new Date().toLocaleString() } 
        : q
    );
    
    setQuestions(updatedQuestions);
    localStorage.setItem(`questions-${recipeId}`, JSON.stringify(updatedQuestions));
    
    // Reset states and animate the updated question
    setEditingQuestionId(null);
    setEditContent('');
    setShowUpdateConfirm(false);
    setAnimateQuestionId(targetQuestionId);
    
    setTimeout(() => {
      setAnimateQuestionId(null);
    }, 1000);
    
    setTargetQuestionId(null);
    showNotificationMessage('Question updated successfully!');
  };

  // Confirm before deleting
  const confirmDelete = (questionId) => {
    setTargetQuestionId(questionId);
    setShowDeleteConfirm(true);
  };

  // Delete question
  const deleteQuestion = () => {
    // Find the question to be deleted for fade-out animation
    const questionToDelete = questions.find(q => q.id === targetQuestionId);
    
    // Mark the question for deletion (for animation)
    setQuestions(questions.map(q => 
      q.id === targetQuestionId 
        ? { ...q, deleting: true } 
        : q
    ));
    
    // Actual deletion after animation
    setTimeout(() => {
      const filteredQuestions = questions.filter(q => q.id !== targetQuestionId);
      setQuestions(filteredQuestions);
      localStorage.setItem(`questions-${recipeId}`, JSON.stringify(filteredQuestions));
    }, 500);
    
    // Reset state
    setShowDeleteConfirm(false);
    setTargetQuestionId(null);
    
    showNotificationMessage('Question deleted successfully!');
  };

  // Check if current user is the author of a question
  const isAuthor = (questionUser) => {
    return user && questionUser === user;
  };

  return (
    <div>
      {/* Notification Toast */}
      {notification.show && (
        <div className={`notification-toast ${notification.type}`}>
          <span>{notification.message}</span>
          <button onClick={() => setNotification({ show: false })} className="close-notification">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Question Form Toggle Button */}
      <div className="ask-question-button-container">
        <button 
          onClick={toggleForm} 
          className={`ask-question-button ${formVisible ? 'active' : ''}`}
        >
          {formVisible ? 'Hide Form' : 'Ask a Question'}
          {formVisible ? <X size={16} className="toggle-icon" /> : <MessageSquare size={16} className="toggle-icon" />}
        </button>
      </div>

      {/* Question Form Section (with animation) */}
      {formVisible && (
        <div className={`question-form-container ${showFormAnimation ? 'visible' : ''}`}>
          <div className="question-section">
            <h2 className="section-title">
              <Sparkles size={20} className="title-icon sparkle" />
              Ask a Question
            </h2>
            
            <div className="question-form">
              <div className="input-group">
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="name-input"
                  />
                </div>
              </div>
              
              <div className="input-group">
                <textarea
                  placeholder="Type your question..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="question-textarea"
                  rows="4"
                />
              </div>
              
              <div className="form-actions">
                <button
                  onClick={handleSubmit}
                  disabled={submitted || !user.trim() || !content.trim()}
                  className={`submit-button ${submitted ? 'submitted' : ''}`}
                >
                  {submitted ? 'Sending...' : 'Submit Question'}
                  {!submitted ? <Send size={16} className="button-icon" /> : <Sparkles size={16} className="button-icon spin" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Questions List Section */}
      <div className="questions-list-section">
        <div className="questions-header">
          <h3 className="section-subtitle">
            <MessageSquare size={18} className="section-icon pulse" />
            Community Questions
          </h3>
          <button 
            onClick={() => setShowQuestions(!showQuestions)} 
            className="toggle-questions-button"
          >
            {showQuestions ? 'Hide' : 'Show'}
          </button>
        </div>
        
        {showQuestions && (
          <div className="questions-list">
            {loading ? (
              <div className="loading-questions">
                <div className="loader"></div>
                <span>Loading questions...</span>
              </div>
            ) : questions.length === 0 ? (
              <div className="no-questions">
                <Star size={40} className="no-questions-icon pulse" />
                <p>No questions yet. Be the first to ask!</p>
              </div>
            ) : (
              questions.map((question) => (
                <div 
                  key={question.id} 
                  className={`
                    question-item 
                    ${animateQuestionId === question.id ? 'highlight-animation' : ''} 
                    ${question.deleting ? 'deleting' : ''}
                    ${questionAdded && animateQuestionId === question.id ? 'new-question' : ''}
                  `}
                >
                  <div className="question-meta">
                    <span className="question-user">
                      <User size={16} className="user-icon" />
                      {question.user}
                    </span>
                    <div className="question-actions">
                      {isAuthor(question.user) && (
                        <div className="author-actions">
                          <button 
                            onClick={() => editingQuestionId === question.id ? confirmUpdate(question.id) : startEditQuestion(question)} 
                            className="action-button edit-button"
                            title={editingQuestionId === question.id ? "Save changes" : "Edit question"}
                          >
                            {editingQuestionId === question.id ? <Check size={16} /> : <Edit size={16} />}
                          </button>
                          {editingQuestionId === question.id && (
                            <button 
                              onClick={cancelEdit} 
                              className="action-button cancel-button"
                              title="Cancel editing"
                            >
                              <X size={16} />
                            </button>
                          )}
                          <button 
                            onClick={() => confirmDelete(question.id)} 
                            className="action-button delete-button"
                            title="Delete question"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                      <span className="question-date">
                        {question.date}
                        {question.edited && <span className="edited-tag">(edited)</span>}
                      </span>
                    </div>
                  </div>
                  
                  {editingQuestionId === question.id ? (
                    <div className="edit-question-area">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="edit-textarea"
                        rows="3"
                      />
                    </div>
                  ) : (
                    <div className="question-content">
                      <CornerDownRight size={14} className="content-icon" />
                      {question.content}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Popup */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="confirmation-modal delete-modal">
            <div className="modal-header">
              <AlertTriangle size={24} className="warning-icon shake" />
              <h4>Delete Question</h4>
            </div>
            <p>Are you sure you want to delete this question?</p>
            <p className="warning-text">This action cannot be undone.</p>
            <div className="modal-actions">
              <button onClick={() => setShowDeleteConfirm(false)} className="cancel-modal-button">
                Cancel
              </button>
              <button onClick={deleteQuestion} className="confirm-delete-button">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Confirmation Popup */}
      {showUpdateConfirm && (
        <div className="modal-overlay">
          <div className="confirmation-modal update-modal">
            <div className="modal-header">
              <Check size={24} className="confirm-icon bounce" />
              <h4>Update Question</h4>
            </div>
            <p>Do you want to save your changes to this question?</p>
            <div className="modal-actions">
              <button onClick={() => setShowUpdateConfirm(false)} className="cancel-modal-button">
                Cancel
              </button>
              <button onClick={updateQuestion} className="confirm-update-button">
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Base Styles */
        .question-section {
          margin-bottom: 30px;
          position: relative;
        }
        
        .section-title {
          font-size: 22px;
          font-weight: 600;
          color: #1d3557;
          margin-bottom: 20px;
          position: relative;
          padding-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .title-icon {
          color: #ff6b6b;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, #457b9d, #1d3557);
          border-radius: 2px;
        }
        
        .section-subtitle {
          font-size: 18px;
          font-weight: 600;
          color: #1d3557;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .section-icon {
          color: #457b9d;
        }
        
        /* Question Form Toggle Button */
        .ask-question-button-container {
          margin-bottom: 20px;
          text-align: center;
        }
        
        .ask-question-button {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 30px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(79, 172, 254, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin: 0 auto;
        }
        
        .ask-question-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 7px 15px rgba(79, 172, 254, 0.5);
        }
        
        .ask-question-button:active {
          transform: translateY(1px);
        }
        
        .ask-question-button.active {
          background: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%);
          box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
        }
        
        .toggle-icon {
          transition: all 0.3s ease;
        }
        
        .ask-question-button:hover .toggle-icon {
          transform: rotate(15deg);
        }
        
        /* Form Container Animation */
        .question-form-container {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.5s ease, opacity 0.3s ease;
          transform: translateY(-20px);
        }
        
        .question-form-container.visible {
          max-height: 500px;
          opacity: 1;
          transform: translateY(0);
        }
        
        .question-form {
          background: linear-gradient(145deg, #f8f9fa, #ffffff);
          border-radius: 16px;
          padding: 25px;
          margin-bottom: 20px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(236, 236, 236, 0.5);
          transition: all 0.3s ease;
        }
        
        .question-form:hover {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }
        
        .input-group {
          margin-bottom: 20px;
        }
        
        .input-wrapper {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .input-wrapper:focus-within {
          transform: scale(1.01);
        }
        
        .input-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #457b9d;
          transition: all 0.3s ease;
        }
        
        .input-wrapper:focus-within .input-icon {
          color: #1d3557;
        }
        
        .name-input {
          width: 100%;
          padding: 14px 14px 14px 45px;
          border: 2px solid #e7ecef;
          border-radius: 12px;
          font-size: 16px;
          transition: all 0.3s ease;
          background-color: #f8f9fa;
        }
        
        .name-input:focus {
          border-color: #457b9d;
          outline: none;
          box-shadow: 0 0 0 3px rgba(69, 123, 157, 0.2);
          background-color: #fff;
        }
        
        .question-textarea, .edit-textarea {
          width: 100%;
          padding: 15px;
          border: 2px solid #e7ecef;
          border-radius: 12px;
          font-size: 16px;
          resize: vertical;
          min-height: 120px;
          transition: all 0.3s ease;
          background-color: #f8f9fa;
        }
        
        .edit-textarea {
          min-height: 100px;
          border-color: #457b9d;
          background-color: #f0f7ff;
        }
        
        .question-textarea:focus, .edit-textarea:focus {
          border-color: #457b9d;
          outline: none;
          box-shadow: 0 0 0 3px rgba(69, 123, 157, 0.2);
          background-color: #fff;
        }
        
        .form-actions {
          display: flex;
          justify-content: flex-end;
        }
        
        .submit-button {
          background: linear-gradient(135deg, #457b9d 0%, #1d3557 100%);
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 4px 12px rgba(29, 53, 87, 0.2);
        }
        
        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(29, 53, 87, 0.3);
        }
        
        .submit-button:active:not(:disabled) {
          transform: translateY(1px);
        }
        
        .submit-button:disabled {
          background: linear-gradient(135deg, #adb5bd 0%, #6c757d 100%);
          cursor: not-allowed;
        }
        
        .submit-button.submitted {
          background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
          box-shadow: 0 4px 12px rgba(46, 204, 113, 0.3);
          animation: pulse 1.5s infinite;
        }
        
        .button-icon {
          transition: all 0.3s ease;
        }
        
        .submit-button:hover .button-icon:not(.spin) {
          transform: translateX(5px);
        }
        
        /* Questions List Section */
        .questions-list-section {
          background: linear-gradient(145deg, #f8f9fa, #ffffff);
          border-radius: 16px;
          padding: 25px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          border: 1px solid rgba(236, 236, 236, 0.5);
        }
        
        .questions-list-section:hover {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
        }
        
        .questions-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          border-bottom: 2px solid #e7ecef;
          padding-bottom: 15px;
        }
        
        .toggle-questions-button {
          background-color: transparent;
          color: #457b9d;
          border: 2px solid #457b9d;
          padding: 8px 16px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .toggle-questions-button:hover {
          background-color: #457b9d;
          color: white;
          transform: translateY(-2px);
        }
        
        .toggle-questions-button:active {
          transform: translateY(1px);
        }
        
        .questions-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .question-item {
          background-color: white;
          border-left: 5px solid #457b9d;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          transform-origin: center top;
        }
        
        .question-item:hover {
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }
        
        .question-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #457b9d, #a8dadc);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s ease;
        }
        
        .question-item:hover::before {
          transform: scaleX(1);
        }
        
        /* Question item animations */
        .question-item.highlight-animation {
          background-color: #f0f7ff;
          animation: highlightPulse 1s ease;
        }
        
        .question-item.new-question {
          animation: dropIn 0.5s ease;
        }
        
        .question-item.deleting {
          animation: fadeOut 0.5s ease forwards;
          pointer-events: none;
        }
        
        .question-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          align-items: center;
        }
        
        .question-user {
          font-weight: 600;
          color: #457b9d;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 5px 12px;
          background-color: rgba(69, 123, 157, 0.1);
          border-radius: 20px;
          transition: all 0.3s ease;
        }
        
        .question-user:hover {
          background-color: rgba(69, 123, 157, 0.2);
        }
        
        .user-icon {
          color: #457b9d;
        }
        
        .question-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .author-actions {
          display: flex;
          gap: 8px;
        }
        
        .action-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        
        .edit-button {
          color: #457b9d;
        }
        
        .edit-button:hover {
          background-color: rgba(69, 123, 157, 0.1);
          transform: scale(1.1);
        }
        
        .delete-button {
          color: #e63946;
        }
        
        .delete-button:hover {
          background-color: rgba(230, 57, 70, 0.1);
          transform: scale(1.1);
        }
        
        .cancel-button {
          color: #6c757d;
        }
        
        .cancel-button:hover {
          background-color: rgba(108, 117, 125, 0.1);
          transform: scale(1.1);
        }
        
        .question-date {
          font-size: 14px;
          color: #6c757d;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .edited-tag {
          font-size: 12px;
          color: #6c757d;
          font-style: italic;
          background-color: #f8f9fa;
          padding: 2px 6px;
          border-radius: 4px;
          margin-left: 4px;
        }
        
        .question-content {
          color: #212529;
          line-height: 1.6;
          position: relative;
          padding-left: 22px;
        }
        
        .content-icon {
          position: absolute;
          left: 0;
          top: 3px;
          color: #a8dadc;
        }
        
        .edit-question-area {
          margin-top: 15px;
          animation: fadeIn 0.3s ease;
        }
        
        .loading-questions {
          padding: 30px;
          text-align: center;
          color: #6c757d;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }
        
        .loader {
          width: 40px;
          height: 40px;
          border: 4px solid #e7ecef;
          border-radius: 50%;
          border-top-color: #457b9d;
          animation: spin 1s ease-in-out infinite;
        }
        
        .no-questions {
          padding: 40px 20px;
          text-align: center;
          color: #6c757d;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          background-color: #f8f9fa;
          border-radius: 12px;
          border: 1px dashed #ced4da;
        }
        
        .no-questions-icon {
          color: #a8dadc;
          opacity: 0.8;
        }
        
        /* Modal styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          backdrop-filter: blur(3px);
          animation: fadeIn 0.3s ease;
        }
        
        .confirmation-modal {
          background-color: white;
          border-radius: 16px;
          padding: 25px;
          width: 90%;
          max-width: 420px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          animation: scaleIn 0.3s ease;
          transform-origin: center;
          border-top: 5px solid #457b9d;
        }
        
        .delete-modal {
          border-top-color: #e63946;
        }
        
        .update-modal {
          border-top-color: #2ecc71;
        }
        
        .modal-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #e7ecef;
        }
        
        .modal-header h4 {
          font-size: 20px;
          margin: 0;
          color: #1d3557;
          font-weight: 600;
        }
        
        .warning-icon {
          color: #e63946;
        }
        
        .confirm-icon {
          color: #2ecc71;
        }
        
        .warning-text {
          color: #e63946;
          font-weight: 500;
          font-size: 14px;
          background-color: rgba(230, 57, 70, 0.1);
          padding: 8px 12px;
          border-radius: 6px;
          display: inline-block;
          margin-top: 5px;
        }
        
        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 15px;
          margin-top: 25px;
        }
        
        .cancel-modal-button {
          background-color: #f8f9fa;
          color: #6c757d;
          border: 2px solid #ced4da;
          padding: 10px 20px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .cancel-modal-button:hover {
          background-color: #e9ecef;
          transform: translateY(-2px);
        }
        
        .confirm-delete-button {
          background: linear-gradient(135deg, #e63946 0%, #c1121f 100%);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(230, 57, 70, 0.3);
        }
        
        .confirm-delete-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(230, 57, 70, 0.4);
        }
        
        .confirm-update-button {
          background: linear-gradient(135deg, #457b9d 0%, #1d3557 100%);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(69, 123, 157, 0.3);
        }
        
        .confirm-update-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(69, 123, 157, 0.4);
        }
        
        /* Notification toast */
        .notification-toast {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 15px 25px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          min-width: 300px;
          animation: slideInRight 0.5s forwards, fadeOut 0.5s 2.5s forwards;
        }
        
        .notification-toast.success {
          background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
          color: #155724;
          border-left: 5px solid #28a745;
        }
        
        .notification-toast.error {
          background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
          color: #721c24;
          border-left: 5px solid #dc3545;
        }
        
        .close-notification {
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.3s ease;
          color: inherit;
        }
        
        .close-notification:hover {
          background-color: rgba(0, 0, 0, 0.1);
          transform: rotate(90deg);
        }
        
        /* Animations */
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
            visibility: hidden;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
        
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes highlightPulse {
          0% {
            background-color: #fff;
          }
          50% {
            background-color: #e3f2fd;
          }
          100% {
            background-color: #f0f7ff;
          }
        }
        
        @keyframes scaleIn {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes dropIn {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          50% {
            transform: translateY(10px);
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-2px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(2px);
          }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        
        /* Animation classes */
        .pulse {
          animation: pulse 2s infinite;
        }
        
        .spin {
          animation: spin 2s linear infinite;
        }
        
        .shake {
          animation: shake 0.5s ease;
        }
        
        .bounce {
          animation: bounce 1s ease;
        }
        
        .sparkle {
          animation: pulse 1.5s infinite;
        }
        
        /* Responsive styles */
        @media (max-width: 768px) {
          .questions-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          
          .toggle-questions-button {
            align-self: flex-end;
          }
          
          .question-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          
          .question-actions {
            width: 100%;
            justify-content: space-between;
          }
          
          .notification-toast {
            top: auto;
            bottom: 20px;
            right: 20px;
            left: 20px;
            width: calc(100% - 40px);
          }
          
          .modal-actions {
            flex-direction: column-reverse;
          }
          
          .modal-actions button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default QuestionSection;