import { Module } from '@nestjs/common';

import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistStore } from './artist.storage';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ArtistStore],
})
export class ArtistModule {}
