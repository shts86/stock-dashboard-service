import express from 'express';
import { Stock } from '../models';
import { createLogger } from '../utils/logger';
import { getOrThrow, stockSchemaCode, newStockSchema } from '../validations';
import { resolveStore } from '../middleware/store';
import { wrapAsync, wrapAsyncAndSend } from '../utils/async-routes';

const logger = createLogger('allStockController');
const router = express.Router();

router.get(
  '/',
  wrapAsyncAndSend((req, res) => {
    // logger.info('get current stock data');
    const store = resolveStore(res);
    return store.allStocks.all();
  }),
);

// router.get(
//   '/:stockCode',
//   wrapAsyncAndSend((req, res) => {
//     // logger.info('get current stock data');

//     return
//   }),
// );

export default router;
