import { Injectable } from '@nestjs/common';

import { EntityStore } from 'db';

@Injectable()
export class TrackStore extends EntityStore {
  constructor() {
    super('tracks');
  }
}
