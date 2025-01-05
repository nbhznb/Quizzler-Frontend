// src/main.jsx
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout.jsx';
import './index.css';
import { ToastProvider } from './components/Toast';
import { ErrorBoundary } from './components/ErrorBoundary';
import RedirectHandler from './components/RedirectHandler'; // Import the new component
import { AxiosProvider } from './AxiosContext'; // Import the AxiosProvider

// Eager load critical components
import App from './App.jsx';
import LogIn from './components/LogIn.jsx';
import Register from './components/Register.jsx';

// Lazy load less critical components
const Quiz = lazy(() => import('./components/Quiz.jsx'));
const AccountManagement = lazy(() => import('./components/AccountManagement.jsx'));
const Leaderboard = lazy(() => import('./components/Leaderboard.jsx'));

const Providers = ({ children }) => (
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <ToastProvider>
          <AxiosProvider> {/* Wrap with AxiosProvider */}
            <Router>
              <Layout>{children}</Layout>
            </Router>
          </AxiosProvider>
        </ToastProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Providers>
    <Suspense fallback={<div className="loading loading-spinner loading-lg"></div>}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AccountManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<RedirectHandler />} />
      </Routes>
    </Suspense>
  </Providers>
);
