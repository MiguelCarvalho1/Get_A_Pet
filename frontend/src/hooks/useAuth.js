import api from '../utils/api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate here
import useFlashMessage from './useFlashMessage';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  async function register(user) {
    let msgText = 'Registration successful!';
    let msgType = 'success';

    try {
      const data = await api.post('/users/register', user);
      await authUser(data);
    } catch (error) {
      msgText = error.response ? error.response.data.message : 'Error during registration';
      msgType = 'error';
    }

    setFlashMessage(msgText, msgType);
  }

  async function login(user) {
    let msgText = 'Login successful!';
    let msgType = 'success';

    try {
      const data = await api.post('/users/login', user);
      await authUser(data);
    } catch (error) {
      msgText = error.response ? error.response.data.message : 'Error during login';
      msgType = 'error';
    }

    setFlashMessage(msgText, msgType);
  }

  async function authUser(data) {
    setAuthenticated(true);
    localStorage.setItem('token', JSON.stringify(data.token)); // Save token in localStorage
    localStorage.setItem('user', JSON.stringify(data.user)); // Save user data in localStorage

    navigate('/'); // Use navigate instead of history.push
  }

  function logout() {
    const msgText = 'Logout successful!';
    const msgType = 'success';

    setAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    api.defaults.headers.Authorization = undefined;
    navigate('/login'); // Use navigate instead of history.push

    setFlashMessage(msgText, msgType);
  }

  return { authenticated, loading, register, login, logout };
}
