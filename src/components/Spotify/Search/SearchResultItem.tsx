import { Track } from '../../../types/SpotifyTypes';
import { DotMenu } from '../../DotMenu/DotMenu';
import { TrackRow } from '../TrackRow';

interface ISearchResultItem {
  track: Track;
}

const SearchResultItem = ({ track }: ISearchResultItem) => {
  // return (
  //   <DelayedButton
  //     className="search-result-item"
  //     delay={300}
  //     afterDelay={() => {
  //       addTrackToQueue(track);
  //     }}
  //   >
  //     <>
  //       {children}
  //       <DotMenu onClick={() => addTrackToQueue(track)} />
  //     </>
  //   </DelayedButton>
  // );
  return (
    <div className="search-result-item">
      <TrackRow track={track} />
      <DotMenu track={track} />
    </div>
  );
};

export default SearchResultItem;
