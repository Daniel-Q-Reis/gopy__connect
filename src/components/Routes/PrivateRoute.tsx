import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { useAuth } from '../../context/auth';

interface PrivateRouteProps extends RouteProps {
  component?: React.ComponentType<any>;
  children?: React.ReactNode;
}

export default function PrivateRoute({
  component: Component,
  children,
  ...rest
}: PrivateRouteProps): React.ReactElement {
  const { isAuthenticated } = useAuth();

  const render = (props: any) => {
    // Remove computedMatch from props to prevent React warning
    const { computedMatch, ...restProps } = props;
    
    if (!isAuthenticated) {
      return <Redirect to={ROUTES.SIGNIN} />;
    } else {
      if (Component) {
        return <Component {...restProps} />;
      } else {
        return children;
      }
    }
  };

  return <Route {...rest} render={render} />;
}
