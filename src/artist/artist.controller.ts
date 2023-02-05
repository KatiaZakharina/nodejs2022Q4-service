import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';

import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ErrorMessages } from './constants/error-messages.constants';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async findAll() {
    const artists = await this.artistService.findAll();

    return artists;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = await this.artistService.findOne(id);

    if (!artist) {
      throw new NotFoundException(ErrorMessages.ARTIST_NOT_FOUND);
    }

    return artist;
  }

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistService.create(createArtistDto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    try {
      return await this.artistService.update(id, updateArtistDto);
    } catch (error) {
      if (error.message === ErrorMessages.ARTIST_NOT_FOUND) {
        throw new NotFoundException();
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      await this.artistService.remove(id);
    } catch (error) {
      if (error.message === ErrorMessages.ARTIST_NOT_FOUND) {
        throw new NotFoundException();
      }
      throw error;
    }
  }
}
