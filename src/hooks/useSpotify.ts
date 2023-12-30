import { useAxios } from './useAxios';

import { HttpStatus } from '../constants';
import {
  DevicesResponse,
  PlaybackState,
  Queue,
  SearchResponse,
  Track,
} from '../types/SpotifyTypes';

export const useSpotify = () => {
  const axiosInstance = useAxios();

  const getMyDevices = async () => {
    const res = await axiosInstance.get<DevicesResponse>('me/player/devices');

    if (res.status === HttpStatus.OK) {
      return res.data.devices;
    }
    return undefined;
  };

  const search = async (query: string) => {
    if (!query) return [];
    const res = await axiosInstance.get<SearchResponse>('search', {
      params: {
        q: query,
        type: 'track',
      },
    });

    if (res.status === HttpStatus.OK) {
      return res.data.tracks.items;
    }
    return undefined;
  };

  const getMyQueue = async () => {
    const res = await axiosInstance.get<Queue>('/me/player/queue');
    if (res.status === HttpStatus.OK) {
      return res.data;
    }
  };

  const getPlaybackState = async () => {
    const res = await axiosInstance.get<PlaybackState>('me/player/');
    if (res.status === HttpStatus.OK) {
      return res.data;
    }
  };
  const addToQueue = async (track: Track, deviceId: string) => {
    await axiosInstance.post(`/me/player/queue?uri=${track.uri}`);
  };

  const play = async (deviceId: string, uris?: string[]) => {
    await axiosInstance.put(`me/player/play?device_id=${deviceId}`, {
      uris,
      position_ms: 0,
    });
  };
  const pause = async (deviceId: string) => {
    await axiosInstance.put(`me/player/pause?device_id=${deviceId}`);
  };

  const previousTrack = async (deviceId: string) => {
    await axiosInstance.post('me/player/previous', {
      params: {
        device_id: deviceId,
      },
    });
  };
  const nextTrack = async (deviceId: string) => {
    await axiosInstance.post('me/player/next', {
      params: {
        device_id: deviceId,
      },
    });
  };

  return {
    getMyDevices,
    getMyQueue,
    addToQueue,
    play,
    pause,
    nextTrack,
    previousTrack,
    getPlaybackState,
    search,
  };
};
