import { Injectable } from '@nestjs/common';

import { EntityStore } from 'db';

@Injectable()
export class ArtistStore extends EntityStore {
  constructor() {
    super('artists');
  }
}
