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
    logger.info('All Stock requested');
    const store = resolveStore(res);
    return store.allStocks.all();
  }),
);

router.get(
  '/:code',
  wrapAsync(async (req, res) => {
    logger.info('All Stock by Code requested');
    const code = getOrThrow<string>(req.params.code, stockSchemaCode);
    const store = resolveStore(res);
    const stock = await store.allStocks.findByStockCode(code);

    if (!stock) {
      res.sendStatus(404);
      return;
    }
    res.send(stock);
  }),
);

export default router;
