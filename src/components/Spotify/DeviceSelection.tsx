import './DeviceSelection.scss';
import { useEffect, useState } from 'react';

import { useSpotify } from '../../hooks/useSpotify';

import { useMediaContext } from '../../contexts/MediaContext';
import { ActionTypes } from '../../reducers/playerStateReducer';
import { Device } from '../../types/SpotifyTypes';
import Loading from '../Loading/Loading';

const DeviceSelection = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [devices, setDevices] = useState<Device[]>([]);
  const { getMyDevices } = useSpotify();
  const { dispatch } = useMediaContext();

  const select = (id: string) => {
    dispatch({
      payload: {
        deviceId: id,
      },
      type: ActionTypes.SetDeviceId,
    });
  };

  useEffect(() => {
    const init = async () => {
      const devicesRes = await getMyDevices();
      if (devicesRes) {
        const active = devicesRes?.find((device) => device.is_active);
        if (active) select(active.id);
        else {
          setLoading(false);
          setDevices(devicesRes);
        }
      }
    };
    init();
  }, []);

  if (loading) return <Loading text={'Checking devices...'} />;

  if (!devices.length && !loading)
    return (
      <>
        <h3>No active devices found</h3>
        <p>
          Open Spotify on this or another device to control playback from here.
          Then refresh this page.
        </p>
      </>
    );

  return (
    <>
      <h3>Select a device</h3>
      <ul className="devices-list">
        {devices.map((device: Device) => (
          <li className="track" key={device.id}>
            <button onClick={() => select(device.id)}>
              {`${device.name} (${device.type})`}{' '}
              {device.is_active && `Currently Active`}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default DeviceSelection;
