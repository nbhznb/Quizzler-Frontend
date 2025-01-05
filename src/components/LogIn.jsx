// src/components/LogIn.jsx
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAxios } from '../AxiosContext';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/actions/userActions';
import { sanitize } from '../utils/sanitize';
import { useToast } from './Toast';
import { loginSchema } from '../schemas/loginSchema'; // Assuming you have a login schema

function LogIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const axiosInstance = useAxios();
  const { addToast } = useToast();
  const hasNavigated = useRef(false);

  const {
    register,
    handleSubmit,
    watch, // Ensure watch is destructured
    formState: { errors },
    setError,
    setValue,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      showPassword: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      const sanitizedUsername = sanitize.text(data.username);
      const response = await axiosInstance.post('/users/login', {
        username: sanitizedUsername,
        password: data.password,
      });
      const { id, token, refreshToken } = response.data;
      dispatch(login(id, token, refreshToken));
      addToast('Login successful!', 'success');
      if (!hasNavigated.current) {
        hasNavigated.current = true;
        navigate('/quiz');
      }
    } catch (err) {
      if (err.response?.status === 429) {
        setError('submit', {
          type: 'manual',
          message: 'Too many login attempts. Please try again later.',
        });
      } else {
        setError('submit', {
          type: 'manual',
          message: 'Invalid username or password',
        });
      }
      addToast(err.message, 'error');
    }
  };

  useEffect(() => {
    if (loggedIn && !hasNavigated.current) {
      hasNavigated.current = true;
      navigate('/quiz', { replace: true });
    }
  }, [loggedIn, navigate]);

  const handleGuestLogin = () => {
    try {
      const guestId = `guest_${Date.now()}`;
      dispatch(login(guestId, null, null));
      addToast('Logged in as guest', 'success');
      if (!hasNavigated.current) {
        hasNavigated.current = true;
        navigate('/quiz');
      }
    } catch (err) {
      addToast('Failed to login as guest', 'error');
    }
  };

  return (
    <div id="login" className="w-[80vw] md:w-[40vw] mx-auto bg-powder shadow-card rounded-lg p-8 shadow-xl text-center">
      <h2 className="text-2xl font-semibold mb-6 text-navy-blue">Login</h2>
      {errors.submit && <p className="text-danger text-sm my-2.5">{errors.submit.message}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="floating-input-group">
            <input
              type="text"
              {...register('username')}
              placeholder=" "
              required
              className={`floating-input ${errors.username ? 'error' : ''}`}
            />
            <label className="floating-label">Username</label>
            {errors.username && <span className="error-message">{errors.username.message}</span>}
          </div>

          <div className="floating-input-group">
            <input
              type={watch('showPassword') ? 'text' : 'password'}
              {...register('password')}
              placeholder=" "
              required
              className={`floating-input ${errors.password ? 'error' : ''}`}
            />
            <label className="floating-label">Password</label>
            {errors.password && <span className="error-message">{errors.password.message}</span>}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs ml-[10%]">
          <input
            type="checkbox"
            checked={watch('showPassword')}
            onChange={(e) => setValue('showPassword', e.target.checked)}
            className="checkbox"
          />
          <label>Show password</label>
        </div>

        <div className="flex justify-center items-center gap-4">
          <button
            type="submit"
            className="btn bg-primary hover:bg-primary-focus text-white border-none normal-case w-1/3 py-3"
          >
            Log in
          </button>
          <button
            className="btn bg-transparent hover:bg-primary/10 text-primary border-2 border-primary normal-case w-1/3 py-3"
            onClick={handleGuestLogin}
            type="button"
          >
            Guest
          </button>
          <button
            className="btn bg-transparent hover:bg-primary text-primary hover:text-white border-2 border-primary normal-case w-1/3 py-3"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
