import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { UserEntity } from './entities/user.entity';
import { UserStore } from './users.storage';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ErrorMessages } from './constants/error-messages.constants';

@Injectable()
export class UsersService {
  constructor(private readonly userStore: UserStore) {}

  async findAll(): Promise<UserEntity[]> {
    return this.userStore.get().map((user) => new UserEntity(user));
  }

  async findOne(id: string): Promise<UserEntity> {
    return new UserEntity(this.userStore.getById(id));
  }

  async create(user: CreateUserDto): Promise<UserEntity> {
    const newUser = {} as UserEntity;
    const { login, password } = user;

    newUser.id = v4();
    newUser.login = login;
    newUser.password = password;
    newUser.version = 1;
    newUser.createdAt = Date.now();
    newUser.updatedAt = Date.now();

    return new UserEntity(this.userStore.create(newUser));
  }

  async updatePassword(
    id: string,
    data: UpdatePasswordDto,
  ): Promise<UserEntity> {
    const user = await this.userStore.getById(id);

    if (!user) {
      throw new Error(ErrorMessages.USER_NOT_FOUND);
    }

    if (user.password !== data.oldPassword) {
      throw new Error(ErrorMessages.WRONG_PASSWORD);
    }

    user.password = data.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    return new UserEntity(this.userStore.update(id, user));
  }

  async remove(id: string): Promise<void> {
    const isRemoved = this.userStore.remove(id);

    if (!isRemoved) {
      throw new Error(ErrorMessages.USER_NOT_FOUND);
    }
  }
}
