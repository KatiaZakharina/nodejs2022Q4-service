import { Injectable } from '@nestjs/common';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackStore } from './track.storage';

@Injectable()
export class TrackService {
  constructor(private readonly trackStore: TrackStore) {}

  async findAll() {
    return this.trackStore.get();
  }

  async findOne(id: string) {
    return this.trackStore.getById(id);
  }

  async create(createTrackDto: CreateTrackDto) {
    return this.trackStore.create(createTrackDto);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.trackStore.update(id, updateTrackDto);
  }

  async remove(id: string) {
    return this.trackStore.remove(id);
  }
}
