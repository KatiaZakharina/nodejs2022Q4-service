import { Injectable } from '@nestjs/common';

import { EntityStore } from 'db/index';

@Injectable()
export class UserStore extends EntityStore {
  constructor() {
    super('users');
  }
}
