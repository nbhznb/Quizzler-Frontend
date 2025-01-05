// src/components/Register.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAxios } from '../AxiosContext';
import { useToast } from './Toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/actions/userActions';
import { PasswordStrength, calculatePasswordStrength } from './PasswordStrength';
import { registerSchema } from '../schemas/registerSchema';

function Register() {
  const { addToast } = useToast();
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post('/users/register', data);
      const { id, token, refreshToken } = response.data;
      dispatch(login(id, token, refreshToken));
      addToast('Registration successful!', 'success');
      navigate('/quiz');
    } catch (error) {
      addToast(error.response?.data?.message || 'Registration failed', 'error');
    }
  };

  const password = watch('password');
  const passwordStrength = password ? calculatePasswordStrength(password) : 0;

  return (
    <div id='register' className='w-[80vw] md:w-[30vw] mx-auto bg-powder shadow-card rounded-lg p-8 shadow-xl text-center'>
      <h2 className="text-2xl font-semibold mb-6 text-navy-blue">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className='flex flex-col items-center space-y-4'>
          <div className='floating-input-group'>
            <input
              type='text'
              {...register('username')}
              placeholder=' '
              className={`floating-input ${errors.username ? 'error' : ''}`}
            />
            <label className='floating-label'>Username</label>
            {errors.username && <span className="error-message">{errors.username.message}</span>}
          </div>

          <div className='floating-input-group'>
            <input
              type='password'
              {...register('password')}
              placeholder=' '
              className={`floating-input ${errors.password ? 'error' : ''}`}
            />
            <label className='floating-label'>Password</label>
            <PasswordStrength strength={passwordStrength} />
            {errors.password && <span className="error-message">{errors.password.message}</span>}
          </div>

          <div className='floating-input-group'>
            <input
              type='password'
              {...register('confirmPassword')}
              placeholder=' '
              className={`floating-input ${errors.confirmPassword ? 'error' : ''}`}
            />
            <label className='floating-label'>Confirm Password</label>
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword.message}</span>}
          </div>
        </div>

        <div className='flex justify-center items-center gap-4'>
          <button
            type='submit'
            className='btn bg-primary hover:bg-primary-focus text-white border-none normal-case w-1/2 py-3'
          >
            Register
          </button>
          <button
            type='button'
            onClick={() => navigate('/login')}
            className='btn bg-transparent hover:bg-primary text-primary hover:text-white border-2 border-primary normal-case w-1/2 py-3'
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
