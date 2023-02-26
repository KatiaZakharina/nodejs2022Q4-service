import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private favoriteService: FavsService) {}

  @Get()
  findAll() {
    return this.favoriteService.findAll();
  }

  @Post('album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoriteService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.removeAlbum(id);
  }

  @Post('track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoriteService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.removeTrack(id);
  }

  @Post('artist/:id')
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoriteService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoriteService.removeArtist(id);
  }
}
