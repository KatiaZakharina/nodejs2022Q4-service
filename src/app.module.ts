import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from 'modules/user/user.module';
import { ArtistModule } from 'modules/artist/artist.module';
import { TrackModule } from 'modules/track/track.module';
import { AlbumModule } from 'modules/album/album.module';
import { FavsModule } from 'modules/favs/favs.module';
import { CustomLoggerService } from 'services/logger/logger.service';
import { FileLoggerModule } from 'services/file-logger/file-logger.module';
import configuration from 'config/configuration';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
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
