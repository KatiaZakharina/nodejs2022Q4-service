import { Injectable } from '@nestjs/common';

import { EntityStore } from 'db';

@Injectable()
export class AlbumStore extends EntityStore {
  constructor() {
    super('albums');
  }
}
