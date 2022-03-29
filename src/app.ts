import express from 'express';
import cors from 'cors';
import { clientErrorHandler, errorHandler, logErrors } from './middleware/errors';
import storeMiddleware from './middleware/store';
import { traceLogger, errorLogger } from './middleware/log';
import { apis } from './routes';

import path from 'path';

const app = express();

app.use(express.json());
app.use(cors());

// app.use(traceLogger());

app.use('/assets', express.static(path.join(__dirname, 'public')));

app.use(storeMiddleware());

apis.forEach((o) => app.use(`/api${o.prefix}`, o.router));

app.use(errorLogger());

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

export { app };
