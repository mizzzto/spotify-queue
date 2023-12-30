import { Image, Track } from '../types/SpotifyTypes';

export const thumbnail = (track?: Track): string => {
  const albumThumbnail = track?.album.images.reduce(
    (smallest: Image, image: Image): Image => {
      if (
        image &&
        image.height &&
        smallest &&
        smallest.height &&
        image.height < smallest.height
      ) {
        smallest = image;
      }
      return smallest;
    }
  );
  if (albumThumbnail) return albumThumbnail.url;
  return '';
};
