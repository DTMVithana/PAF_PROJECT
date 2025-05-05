import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuestionSection = ({ recipeId, currentUser }) => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState('');

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`/api/questions/${recipeId}`);
      setQuestions(res.data);
    } catch (err) {
      console.error('Error fetching questions:', err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [recipeId]);

  const handleSubmit = async () => {
    if (!newQuestion.trim()) return;
    try {
      await axios.post('/api/questions', {
        recipeId,
        user: currentUser,
        content: newQuestion
      });
      setNewQuestion('');
      fetchQuestions();
    } catch (err) {
      console.error('Submit failed:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/questions/${id}`);
      fetchQuestions();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleEdit = async (id) => {
    try {
      await axios.put(`/api/questions/${id}`, { content: editingContent });
      setEditingId(null);
      fetchQuestions();
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <div style={styles.wrapper}>
      <h3>Questions</h3>
      <div style={styles.askBox}>
        <textarea
          placeholder="Ask something about this recipe..."
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          style={styles.textarea}
        />
        <button onClick={handleSubmit} style={styles.button}>Submit</button>
      </div>
      <ul style={styles.questionList}>
        {questions.map((q) => (
          <li key={q.id} style={styles.questionItem}>
            <strong>{q.user}</strong>:
            {editingId === q.id ? (
              <>
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  style={styles.editArea}
                />
                <button onClick={() => handleEdit(q.id)} style={styles.smallBtn}>Save</button>
              </>
            ) : (
              <p>{q.content}</p>
            )}
            {q.user === currentUser && editingId !== q.id && (
              <>
                <button onClick={() => {
                  setEditingId(q.id);
                  setEditingContent(q.content);
                }} style={styles.smallBtn}>Edit</button>
                <button onClick={() => handleDelete(q.id)} style={styles.smallBtn}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  wrapper: { marginTop: 40 },
  askBox: { display: 'flex', flexDirection: 'column', marginBottom: 20 },
  textarea: { padding: 10, borderRadius: 5, border: '1px solid #ccc', marginBottom: 10 },
  button: { alignSelf: 'flex-start', padding: '6px 12px', backgroundColor: '#457b9d', color: 'white', border: 'none', borderRadius: 4 },
  questionList: { listStyle: 'none', padding: 0 },
  questionItem: { marginBottom: 20, backgroundColor: '#f1f1f1', padding: 10, borderRadius: 6 },
  editArea: { width: '100%', padding: 8, marginBottom: 8 },
  smallBtn: { marginRight: 8, padding: '4px 8px', fontSize: 12, cursor: 'pointer' }
};

export default QuestionSection;
