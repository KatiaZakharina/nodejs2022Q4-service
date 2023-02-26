import { AppService } from './app.service';
import { Module } from '@nestjs/common';

import { UserModule } from 'modules/user/user.module';
import { ArtistModule } from 'modules/artist/artist.module';
import { TrackModule } from 'modules/track/track.module';
import { AlbumModule } from 'modules/album/album.module';
import { FavsModule } from 'modules/favs/favs.module';
import { CustomLoggerService } from 'services/logger/logger.service';
import { FileLoggerModule } from 'services/file-logger/file-logger.module';

import { AppController } from './app.controller';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavsModule,
    FileLoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService, CustomLoggerService],
})
export class AppModule {}
