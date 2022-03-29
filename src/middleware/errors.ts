import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'joi';

export function logErrors(err: Error, req: Request, res: Response, next: NextFunction): void {
  console.error(err.stack);
  next(err);
}

export function clientErrorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  if (!req.xhr) {
    if (err instanceof ValidationError) {
      res.status(400).send(err.details);
      return;
    }
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  res.status(500);
  res.render('error', { error: err });
}
