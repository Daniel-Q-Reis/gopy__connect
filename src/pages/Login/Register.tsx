import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useHistory } from 'react-router';

import './Login.scss';
import { register } from '../../utils/api';
import { useAuth } from '../../context/auth';
import { ROUTES } from '../../utils/constants';
import fbNameLogo from '../../assets/fbNameLogo.png';

function Register(): React.ReactElement {
  const { signin } = useAuth();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false);

  const onRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!birthDate) {
      setError('Birth date is required');
      return;
    }

    // Convert date format from YYYY-MM-DD to ISO format
    const birthDateISO = new Date(birthDate).toISOString();

    try {
      await register({ email, password, name, birth_date: birthDateISO });
      // After successful registration, show success message and redirect to login
      setRegistered(true);
      setTimeout(() => {
        history.push(ROUTES.SIGNIN);
      }, 2000);
    } catch (error: any) {
      setError(error.message || 'Registration failed');
    }
  };

  if (registered) {
    return (
      <div className='login'>
        <div className='logo'>
          <img src={fbNameLogo} alt='name logo' />
          <h3>GoPy Connect made using Typescript and React,  to consume social_api (in Go), based on Facebook desing.</h3>
        </div>
        <div className='loginCard'>
          <div className='card'>
            <span className='title'>Registration Successful!</span>
            <div className="success">You have been registered successfully. Redirecting to login...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='login'>
      <div className='logo'>
        <img src={fbNameLogo} alt='name logo' />
        <h3>GoPy Connect made using Typescript and React,  to consume social_api (in Go), based on Facebook desing.</h3>
      </div>
      <div className='loginCard'>
        <div className='card'>
          <span className='title'>Sign Up</span>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <TextField label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <TextField 
            label="Birth Date" 
            type="date" 
            value={birthDate} 
            onChange={(e) => setBirthDate(e.target.value)} 
            InputLabelProps={{
              shrink: true,
            }}
          />
          {error && <div className="error">{error}</div>}
          <Button className='button' type='submit' onClick={onRegister}>
            SIGN UP
          </Button>
          <div className="login-link">
            Already have an account? <span onClick={() => history.push(ROUTES.SIGNIN)}>Sign In</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;