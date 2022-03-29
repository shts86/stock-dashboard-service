import mongodb from 'mongodb';
import AllStocks from './all-stocks';
import ExtendedHours from './stock-data';

export interface RootStore {
  allStocks: AllStocks;
  extendedHours: ExtendedHours;
}

export default (db: mongodb.Db): RootStore => ({
  allStocks: new AllStocks(db, 'available-stocks'),
  extendedHours: new ExtendedHours(db, 'stock-data'),
});
