export interface PlaybackState {
  is_playing: boolean;
}

export interface Album {
  images: Image[];
  name: string;
  uri: string;
}

export interface Artist {
  name: string;
  uri: string;
}

export interface Image {
  height?: number;
  url: string;
  width?: number;
}

export interface Track {
  album: Album;
  artists: Artist[];
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface Queue {
  currently_playing: Track;
  queue: Track[];
}

export interface SearchResponse {
  tracks: {
    items: Track[];
  };
}

export interface Device {
  id: string;
  is_active: boolean;
  name: string;
  type: string;
}

export interface DevicesResponse {
  devices: Device[];
}
