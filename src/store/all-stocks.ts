import mongodb from 'mongodb';
import { Stock } from '../models';
import { OptionalId } from '../utils/types';
import { DbEntityCollection } from '../utils/db-entity-collection';

class AllStocksStore {
  private collection: DbEntityCollection<Stock>;

  constructor(db: mongodb.Db, collectionName: string) {
    this.collection = new DbEntityCollection(db.collection<Stock>(collectionName));
  }

  public all(): Promise<Stock[]> {
    return this.collection.all(true);
  }

  public findByStockCode(code: string): Promise<Stock | null> {
    return this.collection.findByStockCode(code, true);
  }
}

export default AllStocksStore;
