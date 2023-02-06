import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
  HttpCode,
  Put,
} from '@nestjs/common';

import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async findAll() {
    return await this.trackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const created = await this.trackService.findOne(id);

    if (!created) {
      throw new NotFoundException();
    }

    return created;
  }

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.trackService.create(createTrackDto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const updatedTrack = await this.trackService.update(id, updateTrackDto);

    if (!updatedTrack) {
      throw new NotFoundException();
    }

    return updatedTrack;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const isDeleted = await this.trackService.remove(id);

    if (!isDeleted) {
      throw new NotFoundException();
    }
  }
}
