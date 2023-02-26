import { AlbumEntity } from 'modules/album/entities/album.entity';
import { ArtistEntity } from 'modules/artist/entities/artist.entity';
import { TrackEntity } from 'modules/track/entities/track.entity';

export class FavEntity {
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];
}
