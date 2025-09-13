import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { Login, Home } from './pages';
import { PublicRoute, PrivateRoute } from './components';
import { AuthProvider } from './context/auth';
import './App.scss';
import { ROUTES } from './utils/constants';

function App(): React.ReactElement {
  return (
    <Router>
      <AuthProvider>
        <div className='App'>
          <Switch>
            <PublicRoute path={ROUTES.SIGNIN} component={Login} exact />
            <PrivateRoute path={ROUTES.HOME} component={Home} exact />
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
