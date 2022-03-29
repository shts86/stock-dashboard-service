import mongodb, { FilterQuery } from 'mongodb';
import { OptionalId } from './types';

export interface DbEntity {
  _id: string;
}

export class DbEntityCollection<T extends DbEntity> {
  constructor(private readonly collection: mongodb.Collection) {}

  public async all(stripObjectId = true): Promise<T[]> {
    const projection = stripObjectId ? { _id: 0 } : undefined;
    return await this.collection.find({}, { projection }).toArray();
  }

  public async findAllExistingDates(stripObjectId = true): Promise<string[]> {
    return await this.collection.distinct('day', {});
  }

  public async findById(id: string | mongodb.ObjectID, stripObjectId = true): Promise<T | null> {
    const documentId = new mongodb.ObjectID(id);
    return await this.findOne({ _id: documentId } as FilterQuery<DbEntity>, stripObjectId);
  }

  public async findByStockCode(codeOriginal: string, stripObjectId = true): Promise<T | null> {
    const code = codeOriginal.toUpperCase();
    return await this.findOne({ code } as FilterQuery<DbEntity>, stripObjectId);
  }

  public async findOne(filter: FilterQuery<T>, stripObjectId = true): Promise<T | null> {
    const projection = stripObjectId ? { _id: 0 } : undefined;
    return await this.collection.findOne(filter, { projection });
  }
}
