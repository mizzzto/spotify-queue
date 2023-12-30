import { Track } from '../../types/SpotifyTypes';
import { thumbnail } from '../../utils';

interface ITrackRowProps {
  track?: Track;
}
export const TrackRow = ({ track }: ITrackRowProps) => {
  if (!track) return <div className="track"></div>;
  return (
    <div className="track">
      <div className="albumThumbnail">
        <img src={thumbnail(track)} />
      </div>
      <div className="trackDetails">
        {track.name}
        <br />
        <span className="smallText">{track.artists[0].name}</span>
      </div>
    </div>
  );
};
