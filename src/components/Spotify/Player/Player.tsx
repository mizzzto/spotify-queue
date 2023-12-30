import './Player.scss';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { useEffect } from 'react';

import { useInterval } from '../../../hooks/useInterval';
import { useSpotify } from '../../../hooks/useSpotify';

import { useMediaContext } from '../../../contexts/MediaContext';
import { ActionTypes } from '../../../reducers/playerStateReducer';
import '../../../styles/main.scss';
import { TrackRow } from '../TrackRow';

// testing queue modal
// import QueueMusic from '@mui/icons-material/QueueMusic';
// import QueueModal from './QueueModal';

const POLLING_INTERVAL = 10000; //ms

export const Player = () => {
  const { state, dispatch } = useMediaContext();
  const { getMyQueue, play, pause, getPlaybackState } = useSpotify();
  // testing queue modal
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement | SVGSVGElement>(
  //   null
  // );
  // const open = Boolean(anchorEl);
  const { deviceId, currentTrack } = state;

  useEffect(() => {
    populateQueue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useInterval(() => {
    populateQueue();
  }, POLLING_INTERVAL);

  // testing queue modal
  // const openQueue = async (event: MouseEvent<HTMLElement | SVGSVGElement>) => {
  //   setAnchorEl(event.currentTarget);
  //   await populateQueue();
  // };
  // const handleClose = () => setAnchorEl(null);

  const populateQueue = async () => {
    const queueRes = getMyQueue();
    const playbackState = getPlaybackState();
    const [q, s] = await Promise.all([queueRes, playbackState]);
    dispatch({
      type: ActionTypes.PopulateQueue,
      payload: {
        queue: q?.queue,
        currentTrack: q?.currently_playing,
        playing: s?.is_playing,
      },
    });
  };

  const resumeTrack = async () => {
    await play(deviceId!);
    dispatch({
      type: ActionTypes.TogglePlay,
      payload: { playing: true },
    });
  };

  const pauseTrack = async () => {
    await pause(deviceId!);
    dispatch({
      type: ActionTypes.TogglePlay,
      payload: { playing: false },
    });
  };

  return (
    <>
      <TrackRow track={currentTrack} />
      <div className="player-icons">
        {state.playing ? (
          <PauseCircleFilledIcon
            onClick={() => {
              pauseTrack();
            }}
            fontSize="large"
            className="clickable-icon"
          />
        ) : (
          <PlayCircleFilledIcon
            onClick={() => {
              resumeTrack();
            }}
            fontSize="large"
            className="clickable-icon"
          />
        )}
      </div>
      {/* testing queue modal */}
      {/* <div className="queue-icon-container" onClick={(e) => openQueue(e)}>
        <QueueMusic className="clickable-icon" />
      </div>
      <QueueModal
        open={open}
        anchorElement={anchorEl}
        currentTrack={currentTrack}
        queue={queue}
        onClose={handleClose}
      /> */}
    </>
  );
};
