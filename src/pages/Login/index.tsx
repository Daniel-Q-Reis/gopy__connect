import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useHistory } from 'react-router';

import './Login.scss';
import { useAuth } from '../../context/auth';
import { ROUTES } from '../../utils/constants';
import { register } from '../../utils/api';
import fbNameLogo from '../../assets/fbNameLogo.png';

function Login(): React.ReactElement {
  const { signin } = useAuth();
  const history = useHistory();
  
  // Form toggle state
  const [isLogin, setIsLogin] = useState(true);
  
  // Login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Registration state
  const [name, setName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  
  // Error state
  const [error, setError] = useState('');

  const onSignIn = async () => {
    try {
      await signin({ email, password });
      history.push(ROUTES.HOME);
    } catch (error) {
      setError('Invalid email or password');
      console.log(error.message);
    }
  };

  const onRegister = async () => {
    // Validation
    if (!name || !regEmail || !regPassword || !birthDate) {
      setError('All fields are required');
      return;
    }
    
    if (regPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    if (regPassword !== verifyPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      // Call register API
      await register({ 
        name, 
        email: regEmail, 
        password: regPassword, 
        birth_date: birthDate 
      });
      
      // After successful registration, switch to login form
      setIsLogin(true);
      // Pre-fill email field with registered email
      setEmail(regEmail);
      setError('Registration successful! Please sign in.');
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.log(error.message);
    }
  };

  return (
    <div className='login'>
      <div className='logo'>
        <img src={fbNameLogo} alt='name logo' />
        <h3>GoPy Connect made using Typescript and React,  to consume social_api (in Go), based on Facebook desing.</h3>
      </div>
      <div className='loginCard'>
        <div className='card'>
          <span className='title'>{isLogin ? 'Sign In' : 'Register'}</span>
          
          {error && <div className="error">{error}</div>}
          
          {isLogin ? (
            <>
              <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button className='button' type='submit' onClick={onSignIn}>
                SIGN IN
              </Button>
              <div className="register-link">
                <span>Don't have an account? </span>
                <Button onClick={() => setIsLogin(false)}>Register here</Button>
              </div>
            </>
          ) : (
            <>
              <TextField label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
              <TextField label="Email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} />
              <TextField label="Password" type="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} />
              <TextField label="Verify Password" type="password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} />
              <TextField 
                label="Birth Date" 
                type="date" 
                InputLabelProps={{ shrink: true }} 
                value={birthDate} 
                onChange={(e) => setBirthDate(e.target.value)} 
              />
              <Button className='button' type='submit' onClick={onRegister}>
                REGISTER
              </Button>
              <div className="login-link">
                <span>Already have an account? </span>
                <Button onClick={() => setIsLogin(true)}>Sign in here</Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
