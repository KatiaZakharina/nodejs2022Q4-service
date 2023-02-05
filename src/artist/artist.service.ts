import { Injectable } from '@nestjs/common';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistStore } from './artist.storage';
import { ErrorMessages } from './constants/error-messages.constants';

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

    if (!updatedArtist) {
      throw new Error(ErrorMessages.ARTIST_NOT_FOUND);
    }

    return updatedArtist;
  }

  async remove(id: string) {
    const isRemoved = this.artistStore.remove(id);

    if (!isRemoved) {
      throw new Error(ErrorMessages.ARTIST_NOT_FOUND);
    }
  }
}
