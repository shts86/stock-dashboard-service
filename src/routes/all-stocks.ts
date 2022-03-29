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

router.post(
  '/',
  wrapAsync(async (req, res) => {
    const stock = getOrThrow<Stock>(req.body, newStockSchema);
    const store = resolveStore(res);
    await store.allStocks.add([stock]);
    res.status(201).send(stock);
  }),
);

// TODO - use code param and not _id
// router.put(
//   '/:code',
//   wrapAsync(async (req, res) => {
//     const id = getOrThrow<string>(req.params.id, idSchema);
//     const stock = getOrThrow<Stock>(req.body, stockSchemaCode);
//     stock._id = id;

//     const store = resolveStore(res);
//     const replaced = await store.allStocks.replace(stock);
//     if (!replaced) {
//       res.sendStatus(404);
//       return;
//     }

//     res.send(stock);
//   }),
// );

// router.delete(
//   '/:code',
//   wrapAsync(async (req, res) => {
//     const code = getOrThrow<string>(req.params.id, idSchema);
//     const store = resolveStore(res);

//     const deleted = await store.allStocks.deleteById(code);
//     if (!deleted) {
//       res.sendStatus(404);
//       return;
//     }

//     res.sendStatus(204);
//   }),
// );

export default router;
