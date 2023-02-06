import { Injectable } from '@nestjs/common';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistStore } from './artist.storage';
import { TrackStore } from 'track/track.storage';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistStore: ArtistStore,
    private readonly trackStore: TrackStore,
  ) {}

  async findAll() {
    return this.artistStore.getAll();
  }

  async findOne(id: string) {
    return this.artistStore.getById(id);
  }

  async create(createArtistDto: CreateArtistDto) {
    return this.artistStore.create(createArtistDto);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const updatedArtist = this.artistStore.update(id, updateArtistDto);

    return updatedArtist;
  }

  async remove(id: string) {
    const artistTracks = this.trackStore.find({ artistId: id });

    await Promise.all(
      artistTracks.map((track) =>
        this.trackStore.update(track.id, { artistId: null }),
      ),
    );

    return this.artistStore.remove(id);
  }
}
