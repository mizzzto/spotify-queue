import './Search.scss';
import SearchResultItem from './SearchResultItem';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { useSpotify } from '../../../hooks/useSpotify';

import { useAuthContext } from '../../../contexts/AuthContext';
import { Track } from '../../../types/SpotifyTypes';
import '../SpotifyUI.scss';

export const Search = () => {
  const { auth } = useAuthContext();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Track[] | undefined>([]);
  const { search } = useSpotify();
  const [debouncedSearch] = useDebounce(query, 500);

  const searchSpotify = async (): Promise<void> => {
    try {
      const res = await search(debouncedSearch);
      setSearchResults(res);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!debouncedSearch || debouncedSearch.length < 3) {
      setSearchResults([]);
    }
    if (!auth.accessToken) return;
    searchSpotify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const clear = () => {
    setQuery('');
  };

  return (
    <>
      <div className="search-input-container">
        <input
          type="text"
          name="SearchInput"
          value={query}
          placeholder="Search Songs / Artists..."
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          autoFocus={true}
        />
        <button onClick={clear}>
          <CloseIcon />
        </button>
      </div>
      <div>
        {searchResults &&
          searchResults.map((track: Track) => (
            <SearchResultItem track={track} key={track.id} />
          ))}
      </div>
    </>
  );
};
