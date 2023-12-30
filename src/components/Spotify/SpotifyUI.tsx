import { Alert } from './Alert/Alert';
import DeviceSelection from './DeviceSelection';
import { Player } from './Player/Player';
import { Search } from './Search/Search';
import './SpotifyUI.scss';

import { useMediaContext } from '../../contexts/MediaContext';

export interface DashboardProps {
  code: string;
}

export const SpotifyUI = () => {
  const { state } = useMediaContext();

  if (!state.deviceId) {
    return (
      <div className="search-container">
        <DeviceSelection />
      </div>
    );
  }
  return (
    <>
      <div>
        <div className="search-container">
          <Search />
        </div>
        <div className="footer">
          <Player />
        </div>
      </div>
      <Alert />
    </>
  );
};
