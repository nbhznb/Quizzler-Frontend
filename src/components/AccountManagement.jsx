// src/components/AccountManagement.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector, useDispatch } from 'react-redux';
import { useAxios } from '../AxiosContext';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { PasswordStrength, calculatePasswordStrength } from './PasswordStrength';
import { useToast } from './Toast';
import { logout } from '../store/actions/userActions';
import { passwordChangeSchema } from '../schemas/passwordChangeSchema';

const AccountManagement = () => {
  const { userID, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [score, setScore] = useState(0);
  const [newUsername, setNewUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const response = await axiosInstance.get(`/users/${userID}/score`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setScore(response.data.score);
      } catch (error) {
        console.error('Error fetching score:', error);
      }
    };

    fetchScore();
  }, [userID, token, axiosInstance]);

  const handleChangeUsername = async () => {
    if (newUsername.trim() === '') {
      setError('New username cannot be empty.');
      return;
    }

    try {
      await axiosInstance.put(
        `/users/${userID}/username`,
        { username: newUsername },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Username updated successfully.');
      setNewUsername('');
    } catch (error) {
      setError('Failed to update username.');
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordChangeSchema),
  });

  const onSubmit = async (data) => {
    setError('');
    setSuccess('');

    try {
      await axiosInstance.put(
        `/users/${userID}/password`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Password updated successfully');
      addToast('Password updated successfully!', 'success');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update password');
      addToast('Failed to update password', 'error');
    }
  };

  const newPassword = watch('newPassword');
  const passwordStrength = newPassword ? calculatePasswordStrength(newPassword) : 0;

  const handleDeleteAccount = async () => {
    const confirmText = 'DELETE';
    const userInput = prompt(`This action cannot be undone. Type ${confirmText} to confirm deletion:`);

    if (userInput === confirmText) {
      try {
        await axiosInstance.delete(`/users/${userID}`, {
          headers: { Authorization: `Bearer ${token}` },
          data: { password: watch('currentPassword') },
        });
        dispatch(logout());
        navigate('/login');
        addToast('Account deleted successfully', 'info');
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete account');
        addToast('Failed to delete account', 'error');
      }
    }
  };

  return (
    <div id='account-management' className='w-[80vw] md:w-[30vw] mx-auto bg-powder shadow-card rounded-lg p-8 shadow-xl text-center'>
      <h2 className="text-2xl font-semibold mb-6 text-navy-blue">Account Management</h2>
      {error && <p className='text-danger text-sm my-2.5'>{error}</p>}
      {success && <p className='text-success text-sm my-2.5'>{success}</p>}

      <div className='mb-6'>
        <h3 className="text-xl font-medium text-navy-blue">Your Total Score: {score}</h3>
      </div>

      <div className="space-y-6">
        <div className='flex flex-col items-center space-y-4'>
          <div className='floating-input-group'>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder=' '
              className='floating-input'
            />
            <label className='floating-label'>New Username</label>
          </div>
          <button
            className='btn bg-primary hover:bg-primary-focus text-white border-none normal-case w-full py-3'
            onClick={handleChangeUsername}
          >
            Update Username
          </button>
        </div>

        <div className='flex flex-col items-center space-y-4'>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
            <div className='floating-input-group'>
              <input
                type="password"
                {...register('currentPassword')}
                placeholder=' '
                className={`floating-input ${errors.currentPassword ? 'error' : ''}`}
              />
              <label className='floating-label'>Current Password</label>
              {errors.currentPassword && <span className="error-message">{errors.currentPassword.message}</span>}
            </div>

            <div className='floating-input-group'>
              <input
                type="password"
                {...register('newPassword')}
                placeholder=' '
                className={`floating-input ${errors.newPassword ? 'error' : ''}`}
              />
              <label className='floating-label'>New Password</label>
              <PasswordStrength strength={passwordStrength} />
              {errors.newPassword && <span className="error-message">{errors.newPassword.message}</span>}
            </div>

            <div className='floating-input-group'>
              <input
                type="password"
                {...register('confirmNewPassword')}
                placeholder=' '
                className={`floating-input ${errors.confirmNewPassword ? 'error' : ''}`}
              />
              <label className='floating-label'>Confirm New Password</label>
              {errors.confirmNewPassword && <span className="error-message">{errors.confirmNewPassword.message}</span>}
            </div>

            <button
              type="submit"
              className='btn bg-primary hover:bg-primary-focus text-white border-none normal-case w-full py-3'
            >
              Update Password
            </button>
          </form>
        </div>

        <div className='pt-4'>
          <button
            className='btn bg-danger hover:bg-danger-hover text-white border-none normal-case w-1/2 py-3'
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;
