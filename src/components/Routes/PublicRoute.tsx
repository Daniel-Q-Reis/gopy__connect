import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { useAuth } from '../../context/auth';

interface PublicRouteProps extends RouteProps {
  restricted?: boolean;
  component: React.ComponentType<any>;
  children?: React.ReactNode;
}

export default function PublicRoute({
  component: Component,
  restricted = false,
  children,
  ...rest
}: PublicRouteProps): React.ReactElement {
  const { isAuthenticated } = useAuth();

  const render = (props: any) => {
    // Remove computedMatch from props to prevent React warning
    const { computedMatch, ...restProps } = props;
    
    if (isAuthenticated && restricted) {
      return <Redirect to={ROUTES.HOME} />;
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
