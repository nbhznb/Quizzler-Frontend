// src/App.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import Quiz from './components/Quiz.jsx';
import LogIn from './components/LogIn.jsx';
import './App.css';

function App() {
  const loggedIn = useSelector((state) => state.user.loggedIn);

  return (
    <>
      {loggedIn ? (
        <Quiz />
      ) : (
        <LogIn />
      )}
    </>
  );
}

export default App;
