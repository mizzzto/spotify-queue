import { ComponentType } from 'react';
import { RouteComponentProps, Route, Redirect } from 'react-router-dom';

import { useAuthContext } from '../contexts/AuthContext';
import { routes } from '../routes';

interface Props {
  Component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
  path: string;
  exact?: boolean;
}

const AuthenticatedRoute = ({
  Component,
  path,
  exact = false,
}: Props): JSX.Element => {
  const { auth } = useAuthContext();

  const code = new URLSearchParams(window.location.search).get('code');

  return (
    <Route
      exact={exact}
      path={path}
      render={(props: RouteComponentProps) =>
        code ? (
          <Redirect
            to={{
              pathname: `/${routes.AUTHORIZE}`,
              search: `?code=${code}`,
              state: {
                requestedPath: path,
              },
            }}
          />
        ) : auth.accessToken ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: `/${routes.LOGIN}`,
              state: {
                requestedPath: path,
              },
            }}
          />
        )
      }
    />
  );
};

export default AuthenticatedRoute;
