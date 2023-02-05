import { Module } from '@nestjs/common';

import { TrackStore } from 'track/track.storage';
import { AlbumStore } from 'album/album.storage';
import { ArtistStore } from 'artist/artist.storage';

import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';

@Module({
  controllers: [FavsController],
  providers: [FavsService, TrackStore, AlbumStore, ArtistStore],
})
export class FavsModule {}
