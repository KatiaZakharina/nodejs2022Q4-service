import { Injectable } from '@nestjs/common';

import { EntityStore } from 'db';

@Injectable()
export class UserStore extends EntityStore {
  constructor() {
    super('users');
  }
}
