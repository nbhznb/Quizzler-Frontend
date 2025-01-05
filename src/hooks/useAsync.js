import { useState, useCallback } from 'react';
import { useToast } from '../components/Toast';

export const useAsync = (asyncFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const { addToast } = useToast();

  const execute = useCallback(async (...params) => {
    try {
      setLoading(true);
      setError(null);
      const result = await asyncFunction(...params);
      setData(result);
      return result;
    } catch (error) {
      setError(error);
      addToast(error.message, 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [asyncFunction, addToast]);

  return { execute, loading, error, data };
};
