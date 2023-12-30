import { Menu } from '@mui/material';

import { Track } from '../../../types/SpotifyTypes';
import { TrackRow } from '../TrackRow';

interface IQueueModalProps {
  open: boolean;
  onClose: () => void;
  anchorElement: null | HTMLElement | SVGSVGElement;
  currentTrack?: Track;
  queue?: Track[];
}

const QueueModal = ({
  open,
  onClose,
  anchorElement,
  currentTrack,
  queue,
}: IQueueModalProps) => {
  return (
    <Menu
      id="long-menu"
      MenuListProps={{
        'aria-labelledby': 'long-button',
      }}
      anchorEl={anchorElement}
      open={open}
      onClose={() => onClose()}
      PaperProps={{
        style: {
          maxHeight: '80vh',
          width: '150ch',
          paddingInline: '0.75em',
          background: 'rgba(35, 35, 35, 0.95)',
          color: '#fff',
        },
      }}
    >
      <div>
        <h3>Queue</h3>
        <h4>Now Playing:</h4>
        {currentTrack && <TrackRow track={currentTrack} />}
        {queue && queue.length > 0 && <h4>Next In Queue:</h4>}
        {queue &&
          queue.map((track: Track) => (
            <TrackRow track={track} key={track.id} />
          ))}
      </div>
    </Menu>
  );
};

export default QueueModal;
