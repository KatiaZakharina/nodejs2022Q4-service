import { Injectable } from '@nestjs/common';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistStore } from './artist.storage';

@Injectable()
export class ArtistService {
  constructor(private readonly artistStore: ArtistStore) {}

  async findAll() {
    return this.artistStore.get();
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
    return this.artistStore.remove(id);
  }
}
