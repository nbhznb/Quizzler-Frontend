// src/components/Navbar.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CategorySelection from './CategorySelection';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../store/actions/userActions';

function Navbar({ setCategory, category }) {
  const { loggedIn, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  const toggleMainMenu = () => {
    setIsMainMenuOpen(!isMainMenuOpen);
    setIsCategoryMenuOpen(false); // Close other menu
  };

  const toggleCategoryMenu = () => {
    setIsCategoryMenuOpen(!isCategoryMenuOpen);
    setIsMainMenuOpen(false); // Close other menu
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsMainMenuOpen(false);
    navigate('/login');
  };

  const handleLoginClick = () => {
    if (loggedIn) {
      dispatch(logout());
    }
    setIsMainMenuOpen(false);
    navigate('/login');
  };

  return (
    <div className="navbar bg-primary text-powder">
      <div className="navbar-start">
        <div className="dropdown">
          <details open={isMainMenuOpen} onClick={(e) => {
            e.preventDefault();
            toggleMainMenu();
          }}>
            <summary tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg className="h-10 w-10" stroke="currentColor">
                <use href="menu.svg#menu-icon" />
              </svg>
            </summary>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-powder text-secondary rounded-box z-[1] mt-3 w-52 p-0 shadow"
              onClick={(e) => e.stopPropagation()}
            >
              {loggedIn && token && location.pathname !== '/quiz' && (
                <li>
                  <Link
                    to="/quiz"
                    className="btn bg-powder text-primary ring-0 hover:bg-primary/10 normal-case w-full"
                    onClick={() => setIsMainMenuOpen(false)}
                  >
                    Quizzes
                  </Link>
                </li>
              )}

              {loggedIn && token ? (
                <>
                  <li>
                    <Link
                      to="/account"
                      className="btn bg-powder text-primary ring-0 hover:bg-primary/10 normal-case w-full"
                      onClick={() => setIsMainMenuOpen(false)}
                    >
                      Account
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/leaderboard"
                      className="btn bg-powder text-primary ring-0 hover:bg-primary/10 normal-case w-full"
                      onClick={() => setIsMainMenuOpen(false)}
                    >
                      Leaderboard
                    </Link>
                  </li>
                  <li>
                    <button
                      className="btn bg-powder text-primary ring-0 hover:bg-primary/10 normal-case w-full"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="btn bg-powder text-primary ring-0 hover:bg-primary/10 normal-case w-full"
                    onClick={handleLoginClick}
                  >
                    Log In
                  </Link>
                </li>
              )}
            </ul>
          </details>
        </div>
      </div>

      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">Quizzler</a>
      </div>

      <div className="navbar-end">
        {category && (
          <div className="dropdown dropdown-end">
            <details open={isCategoryMenuOpen} onClick={(e) => {
              e.preventDefault();
              toggleCategoryMenu();
            }}>
              <summary tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <svg className="h-10 w-10" fill="currentColor">
                  <use href="category.svg#cat-icon" />
                </svg>
              </summary>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-powder text-secondary rounded-box z-[1] mt-3 w-52 p-0 shadow right-0"
                onClick={(e) => e.stopPropagation()}
              >
                <CategorySelection
                  setCategory={(cat) => {
                    setCategory(cat);
                    setIsCategoryMenuOpen(false);
                  }}
                  layout="dropdown"
                />
              </ul>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
