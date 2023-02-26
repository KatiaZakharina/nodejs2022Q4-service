import { Module } from '@nestjs/common';

import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumStore } from './album.storage';
import { TrackStore } from 'modules/track/track.storage';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AlbumStore, TrackStore],
})
export class AlbumModule {}
