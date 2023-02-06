import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  ParseUUIDPipe,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ErrorMessages } from './constants/error-messages.constants';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserEntity[]> {
    const users = await this.userService.findAll();

    return users;
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserEntity> {
    const user = await this.userService.findOne(id);

    if (!user?.id) {
      throw new NotFoundException(ErrorMessages.USER_NOT_FOUND);
    }

    return new UserEntity(user);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userService.create(createUserDto);
  }

  @Put(':id')
  async updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdatePasswordDto,
  ) {
    try {
      return await this.userService.updatePassword(id, updateUserDto);
    } catch (error) {
      if (error.message === ErrorMessages.WRONG_PASSWORD) {
        throw new ForbiddenException();
      }
      if (error.message === ErrorMessages.USER_NOT_FOUND) {
        throw new NotFoundException();
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      return await this.userService.remove(id);
    } catch (error) {
      if (error.message === ErrorMessages.USER_NOT_FOUND) {
        throw new NotFoundException();
      }
      throw error;
    }
  }
}
