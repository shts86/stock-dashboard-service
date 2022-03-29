import express from 'express';
import { createLogger } from '../utils/logger';
import { getOrThrow, stockSchemaCode, newStockSchema } from '../validations';
import { resolveStore, resolveDb } from '../middleware/store';
import { wrapAsync, wrapAsyncAndSend } from '../utils/async-routes';
import stockCollection from '../store/stock-data';
import { getStockData } from '../utils/stockService';

const logger = createLogger('stockDataController');
const router = express.Router();

router.get(
  '/get-stock-data/:stockCode',
  wrapAsyncAndSend((req, res) => {
    logger.info('get stock data: ' + req.params.stockCode);

    return getStockData(req.params.stockCode, res);
  }),
);

// router.get(
//   '/start-fetching-all',
//   wrapAsyncAndSend((req, res) => {
//     logger.info('Start fetching all');
//     // const store = resolveStore(res);

//     return stockFetcherService();
//   }),
// );

export default router;
