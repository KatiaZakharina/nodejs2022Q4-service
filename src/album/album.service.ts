import { Injectable } from '@nestjs/common';

import { TrackStore } from 'track/track.storage';

import { AlbumStore } from './album.storage';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(
    private readonly artistStore: AlbumStore,
    private readonly trackStore: TrackStore,
  ) {}

  async findAll() {
    return this.artistStore.getAll();
  }

  async findOne(id: string) {
    return this.artistStore.getById(id);
  }

  async create(createArtistDto: CreateAlbumDto) {
    return this.artistStore.create(createArtistDto);
  }

  async update(id: string, updateArtistDto: UpdateAlbumDto) {
    const updatedAlbum = this.artistStore.update(id, updateArtistDto);

    return updatedAlbum;
  }

  async remove(id: string) {
    const albumTracks = this.trackStore.find({ albumId: id });

    await Promise.all(
      albumTracks.map((track) =>
        this.trackStore.update(track.id, { albumId: null }),
      ),
    );

    return this.artistStore.remove(id);
  }
}
