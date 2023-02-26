import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { AlbumStore } from 'modules/album/album.storage';
import { ArtistStore } from 'modules/artist/artist.storage';
import { TrackStore } from 'modules/track/track.storage';
import { FavEntity } from './entities/fav.entity';
import { FavsStore } from './interfaces/favs-store';

@Injectable()
export class FavsService {
  private favsStore: FavsStore;

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
    const favsEntities = {} as FavEntity;

    favsEntities.tracks = this.favsStore.tracks.map(
      (trackId) => this.trackStore.getById(trackId) || {},
    );

    favsEntities.albums = this.favsStore.albums.map(
      (albumId) => this.albumStore.getById(albumId) || {},
    );

    favsEntities.artists = this.favsStore.artists.map(
      (artistId) => this.artistStore.getById(artistId) || {},
    );

    return favsEntities;
  }

  async addAlbum(id: string) {
    const album = this.albumStore.getById(id);

    if (!album) {
      throw new UnprocessableEntityException();
    }

    this.favsStore.albums.push(id);
  }

  async removeAlbum(id: string) {
    const index = this.favsStore.albums.findIndex((albumId) => albumId === id);

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

    this.favsStore.tracks.push(id);
  }

  async removeTrack(id: string) {
    const index = this.favsStore.tracks.findIndex((trackId) => trackId === id);

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

    this.favsStore.artists.push(id);
  }

  async removeArtist(id: string) {
    const index = this.favsStore.artists.findIndex(
      (artistId) => artistId === id,
    );

    if (index === -1) {
      throw new NotFoundException();
    }

    this.favsStore.artists.splice(index, 1);
  }
}
