import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from '../api/api';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/user/login', {
        email,
        password
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status !== 200) {
        setIsLoading(false);
        setError(response.data.error);
      } else {
        const json = response.data;

        // Save the user to local storage
        localStorage.setItem('user', JSON.stringify(json));

        // Update the auth context
        dispatch({ type: 'LOGIN', payload: json });

        // Update loading state
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError('An error occurred during login.');
    }
  };

  return { login, isLoading, error };
};
