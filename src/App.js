// App.js
import React, { useReducer, useState, useEffect } from 'react';
import './App.css';

const initialState = {
  todos: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return { todos: [...state.todos, { id: Date.now(), text: action.payload }] };
    case 'DELETE_TODO':
      return { todos: state.todos.filter(todo => todo.id !== action.payload) };
    case 'EDIT_TODO':
      return {
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
        ),
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [newTodo, setNewTodo] = useState('');
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [editing, setEditing] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    const elements = document.querySelectorAll('.dark-mode-toggle');
    elements.forEach(element => {
      element.classList.toggle('dark-mode', darkMode);
    });
  }, [darkMode]);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '' && input1.trim() !== '' && input2.trim() !== '' && input3.trim() !== '') {
      dispatch({ type: 'ADD_TODO', payload: `${input1}, ${input2}, ${input3}: ${newTodo}` });
      setNewTodo('');
      setInput1('');
      setInput2('');
      setInput3('');
    }
  };

  const handleDeleteTodo = id => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const handleEditTodo = todo => {
    setEditing(todo.id);
    setEditedText(todo.text);
  };

  const handleSaveEdit = () => {
    if (editedText.trim() !== '') {
      dispatch({ type: 'EDIT_TODO', payload: { id: editing, text: editedText } });
      setEditing(null);
      setEditedText('');
    }
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Add new to-do"
          className="dark-mode-toggle"
        />
        <input
          type="text"
          value={input1}
          onChange={e => setInput1(e.target.value)}
          placeholder="Input 1"
          className="dark-mode-toggle"
        />
        <input
          type="text"
          value={input2}
          onChange={e => setInput2(e.target.value)}
          placeholder="Input 2"
          className="dark-mode-toggle"
        />
        <input
          type="text"
          value={input3}
          onChange={e => setInput3(e.target.value)}
          placeholder="Input 3"
          className="dark-mode-toggle"
        />
        <button onClick={handleAddTodo} className="dark-mode-toggle">
          Add
        </button>
      </div>
      <ul>
        {state.todos.map(todo => (
          <li key={todo.id} className="dark-mode-toggle">
            {editing === todo.id ? (
              <>
                <input
                  type="text"
                  value={editedText}
                  onChange={e => setEditedText(e.target.value)}
                  className="dark-mode-toggle"
                />
                <button onClick={handleSaveEdit} className="dark-mode-toggle">
                  Save
                </button>
              </>
            ) : (
              <>
                {todo.text}
                <button onClick={() => handleEditTodo(todo)} className="dark-mode-toggle">
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="dark-mode-toggle"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    
    </div>
  );
}

export default App;
