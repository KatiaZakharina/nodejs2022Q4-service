import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { UserModule } from 'modules/user/user.module';
import { ArtistModule } from 'modules/artist/artist.module';
import { TrackModule } from 'modules/track/track.module';
import { AlbumModule } from 'modules/album/album.module';
import { FavsModule } from 'modules/favs/favs.module';
import { CustomLoggerService } from 'services/logger/logger.service';
import { FileLoggerModule } from 'services/file-logger/file-logger.module';
import { LoggerMiddleware } from 'services/logger/middlewares/request.middleware';

import { CustomExceptionFilter } from './filters/exception-filter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogBodyInterceptor } from 'interceptors/log-body-interceptor';

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
  providers: [
    AppService,
    CustomLoggerService,
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LogBodyInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
