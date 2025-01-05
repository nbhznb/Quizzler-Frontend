// src/components/Layout.jsx
import React from 'react';
import Navbar from './Navbar.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../store/actions/quizActions';
import { useLocation } from 'react-router-dom';

function Layout({ children }) {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.quiz.category);
  const location = useLocation();

  const handleSetCategory = (newCategory) => {
    dispatch(setCategory(newCategory));
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar setCategory={handleSetCategory} category={category} />
      </div>
      <main className="container mx-auto px-4 pt-16">
        {children}
      </main>
    </div>
  );
}

export default Layout;
