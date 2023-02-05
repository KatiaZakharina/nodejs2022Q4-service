import { v4 as uuid } from 'uuid';

export const inMemoryStore = {};

export class EntityStore {
  private entityName: string;

  constructor(entityName: string) {
    inMemoryStore[entityName] = [];
    this.entityName = entityName;
  }

  public get = (): any[] => {
    return inMemoryStore[this.entityName];
  };

  public getById = (id: string): any => {
    return inMemoryStore[this.entityName].find((item) => item.id === id);
  };

  public create = (item: any): any => {
    item.id = uuid();

    inMemoryStore[this.entityName].push(item);

    return item;
  };

  public update = (id: string, item: any): any => {
    const index = inMemoryStore[this.entityName].findIndex(
      (item) => item.id === id,
    );

    const storedItem = inMemoryStore[this.entityName][index];

    if (index === -1) {
      return null;
    }

    const updatedItem = { ...storedItem, ...item };

    inMemoryStore[this.entityName][index] = updatedItem;

    return updatedItem;
  };

  public remove = (id: string): boolean => {
    const index = inMemoryStore[this.entityName].findIndex(
      (item) => item.id === id,
    );

    if (index === -1) {
      return false;
    }

    inMemoryStore[this.entityName].splice(index, 1);

    return true;
  };
}

export const createEntityStore = (entityName: string): EntityStore =>
  new EntityStore(entityName);
