import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', {
        username,
        password,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
    console.log('Registration submitted:', { username, password });
  };

  return  (
    <div>
      <h2>Register</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
  
};

export default Register;
