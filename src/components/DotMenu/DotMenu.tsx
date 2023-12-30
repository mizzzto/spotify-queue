import './DotMenu.scss';
import { Menu } from '@mui/material';
import { MouseEvent, useState } from 'react';

import { useSpotify } from '../../hooks/useSpotify';

import { useMediaContext } from '../../contexts/MediaContext';
import { ActionTypes } from '../../reducers/playerStateReducer';
import { Track } from '../../types/SpotifyTypes';

export interface DotMenuProps {
  track: Track;
}

export const DotMenu = ({ track }: DotMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement | SVGSVGElement>(
    null
  );
  const { addToQueue, play } = useSpotify();
  const { state, dispatch } = useMediaContext();
  const { deviceId, currentTrack } = state;

  const addTrackToQueue = async (track: Track) => {
    try {
      if (!currentTrack) {
        await play(deviceId!, [track.uri]);
        dispatch({
          type: ActionTypes.PopulateQueue,
          payload: {
            queue: [],
            currentTrack: track,
            playing: true,
            queueAlert: true,
            alertMessage: 'Song started',
          },
        });
      } else {
        await addToQueue(track, deviceId!);
        dispatch({
          type: ActionTypes.AddToQueue,
          payload: {
            currentTrack: track,
            queueAlert: true,
            alertMessage: 'Song added to queue',
          },
        });
      }
      handleClose();
    } catch (error) {
      console.error(error);
      dispatch({
        type: ActionTypes.ShowQueueAlert,
        payload: {
          alertMessage: `Error adding song to queue ${
            (error as Error).message
          }`,
        },
      });
    }
  };
  const open = Boolean(anchorEl);

  const openMenu = (event: MouseEvent<HTMLElement | SVGSVGElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <div className="dotmenu-container" onClick={(e) => openMenu(e)}>
        <div className="dotmenu"></div>
      </div>
      <Menu
        id="add-queue-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        PaperProps={{
          style: {
            padding: '.75em 1.5em .75em 1em',
            background: 'rgba(35, 35, 35, 0.95)',
            color: '#fff',
            cursor: 'pointer',
            border: '1px solid var(--input-bg-color)',
          },
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <div className="dotmenu-popup" onClick={() => addTrackToQueue(track)}>
          Add to queue
        </div>
      </Menu>
    </>
  );
};
