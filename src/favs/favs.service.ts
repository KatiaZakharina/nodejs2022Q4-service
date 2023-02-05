import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { AlbumStore } from 'album/album.storage';
import { ArtistStore } from 'artist/artist.storage';
import { TrackStore } from 'track/track.storage';
import { FavEntity } from './entities/fav.entity';

@Injectable()
export class FavsService {
  private favsStore: FavEntity;

  constructor(
    private readonly trackStore: TrackStore,
    private readonly albumStore: AlbumStore,
    private readonly artistStore: ArtistStore,
  ) {
    this.favsStore = {
      tracks: [],
      albums: [],
      artists: [],
    };
  }

  async findAll() {
    return this.favsStore;
  }

  async addAlbum(id: string) {
    const album = this.albumStore.getById(id);

    if (!album) {
      throw new UnprocessableEntityException();
    }

    this.favsStore.albums.push(album);
  }

  async removeAlbum(id: string) {
    const index = this.favsStore.albums.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new NotFoundException();
    }

    this.favsStore.albums.splice(index, 1);
  }

  async addTrack(id: string) {
    const track = this.trackStore.getById(id);

    if (!track) {
      throw new UnprocessableEntityException();
    }

    this.favsStore.tracks.push(track);
  }

  async removeTrack(id: string) {
    const index = this.favsStore.tracks.findIndex((track) => track.id === id);

    if (index === -1) {
      throw new NotFoundException();
    }

    this.favsStore.tracks.splice(index, 1);
  }

  async addArtist(id: string) {
    const artist = this.artistStore.getById(id);

    if (!artist) {
      throw new UnprocessableEntityException();
    }

    this.favsStore.artists.push(artist);
  }

  async removeArtist(id: string) {
    const index = this.favsStore.artists.findIndex(
      (artist) => artist.id === id,
    );

    if (index === -1) {
      throw new NotFoundException();
    }

    this.favsStore.artists.splice(index, 1);
  }
}
