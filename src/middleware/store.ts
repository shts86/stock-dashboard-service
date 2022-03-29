import { Request, Response, NextFunction } from 'express';
import config, { KnownConfigKey } from '../utils/config';
import { MongoConnection } from '../utils/mongo-connection';
import rootStore, { RootStore } from '../store/root';
import mongodb from 'mongodb';

const url = config.get(KnownConfigKey.DbServer);
const connection = new MongoConnection(url);

export async function connectDb(): Promise<void> {
  await connection.connect();
}

export async function closeDb(): Promise<void> {
  await connection.close();
}

export function resolveStore(res: Response): RootStore {
  const store = res.locals.store;
  if (!store) throw new Error('Store in not available');
  return store as RootStore;
}

export function resolveDb(res: Response): mongodb.Db {
  const db = res.locals.db;
  if (!db) throw new Error('Store in not available');
  return db as mongodb.Db;
}

export function getDb() {
  return connection.db;
}

// const storeMiddleware = () => (req: Request, res: Response, next: NextFunction) => {
//   if (connection.db) {
// res.locals.store = rootStore(connection.db);
//   }

//   next();
// };

const dbMiddleware = () => (req: Request, res: Response, next: NextFunction) => {
  if (connection.db) {
    res.locals.store = rootStore(connection.db);
    res.locals.db = connection.db;
  }

  next();
};

// export default storeMiddleware;
export default dbMiddleware;
