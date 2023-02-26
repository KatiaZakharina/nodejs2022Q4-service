import { Module } from '@nestjs/common';

import { UserModule } from './modules/user/user.module';
import { ArtistModule } from './modules/artist/artist.module';
import { TrackModule } from './modules/track/track.module';
import { AlbumModule } from './modules/album/album.module';
import { FavsModule } from './modules/favs/favs.module';

@Module({
  imports: [UserModule, ArtistModule, TrackModule, AlbumModule, FavsModule],
})
export class AppModule {}
