import mongodb from 'mongodb';
import { TimeData, DailyData } from '../models';
import { OptionalId } from '../utils/types';
import { DbEntityCollection } from '../utils/db-entity-collection';

class ExtendedHoursStore {
  private collection: DbEntityCollection<DailyData>;

  constructor(db: mongodb.Db, collectionName: string) {
    this.collection = new DbEntityCollection(db.collection<DailyData>(collectionName));
  }

  public all(): Promise<DailyData[]> {
    return this.collection.all(true, 'day', -1);
  }

  public findAllExistingDates(): Promise<string[]> {
    return this.collection.findAllExistingDates(true);
  }

  public findByStockCode(code: string): Promise<DailyData | null> {
    return this.collection.findByStockCode(code, true);
  }
}

export default ExtendedHoursStore;
