import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useHistory } from 'react-router';

import './Login.scss';
import { useAuth } from '../../context/auth';
import { ROUTES } from '../../utils/constants';
import fbNameLogo from '../../assets/fbNameLogo.png';

function Login(): React.ReactElement {
  const { signin } = useAuth();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignIn = async () => {
    try {
      await signin({ email, password });
      history.push(ROUTES.HOME);
    } catch (error) {
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
          <span className='title'>Sign In</span>
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button className='button' type='submit' onClick={onSignIn}>
            SIGN IN
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
