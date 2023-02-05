import { Module } from '@nestjs/common';

import { TrackStore } from 'track/track.storage';

import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistStore } from './artist.storage';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ArtistStore, TrackStore],
})
export class ArtistModule {}
