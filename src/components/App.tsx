import AuthenticatedRoute from './AuthenticatedRoute';
import Header from './Header/Header';
import { Authorize } from './Login/Authorize';
import { Login } from './Login/Login';
import { SpotifyUI } from './Spotify/SpotifyUI';
import { Switch, Route } from 'react-router-dom';

import { routes } from '../routes';
import '../styles/main.scss';

export const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <AuthenticatedRoute path={'/'} exact Component={SpotifyUI} />
        <Route path={`/${routes.LOGIN}`} exact component={Login} />
        <Route path={`/${routes.AUTHORIZE}`} component={Authorize} />
      </Switch>
    </>
  );
};
