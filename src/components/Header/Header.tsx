import './Header.scss';
import PowerOff from '@mui/icons-material/PowerOff';

// @ts-ignore
import spotifyLogo from '../../assets/Spotify_Icon_RGB_White.png';
import partyLogo from '../../assets/party.png';
import { useAuthContext } from '../../contexts/AuthContext';
import { useMediaContext } from '../../contexts/MediaContext';
import { ActionTypes } from '../../reducers/playerStateReducer';

const Header = () => {
  const { auth, clearAuth } = useAuthContext();
  const { dispatch } = useMediaContext();
  const code = new URLSearchParams(window.location.search).get('code');

  const logout = () => {
    dispatch({
      type: ActionTypes.SetDeviceId,
      payload: {
        deviceId: undefined,
      },
    });
    clearAuth();
  };

  return (
    <>
      <header>
        <div className="header">
          <div className="header-left">
            <img
              className="spotify-logo"
              src={spotifyLogo}
              alt="Spotify Logo"
            />
            <img className="party-logo" src={partyLogo} alt="Party Logo" />
          </div>
          <div className="header-right">
            {(auth.accessToken || code) && (
              <button className="btn" onClick={() => logout()}>
                <PowerOff
                  className="clickable-icon"
                  fontSize="inherit"
                  onClick={() => logout()}
                  titleAccess="Logout"
                />{' '}
                Logout
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
