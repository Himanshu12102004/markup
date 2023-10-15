import React from 'react';
import './signup.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Signup = () => {
  const history = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState(''); // Initialize username state
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/users', {
        username, // Use the username state
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        history('/login')(); // Use history('/login')() to navigate
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  }

  return (
    <div className="signup">
      <h1>Signup</h1>

      <input className='button' type='text' onChange={(e) => { setUsername(e.target.value) }} placeholder='username' />
      <input className='button' type='email' onChange={(e) => { setEmail(e.target.value) }} placeholder='email' />
      <input className='button' type='password' onChange={(e) => { setPassword(e.target.value) }} placeholder='password' />
      <input className='button' type='submit' onClick={submit} placeholder='submit' />

      <br />

      or
      <a href="/login">Sign in</a>
    </div>
  );
}

export default Signup;
