import stockListCollection from '../store/all-stocks';
import stockCollection from '../store/stock-data';
import { getDb } from '../middleware/store';
import mongodb from 'mongodb';
import { Stock } from '../models';
import express from 'express';

export const getStockData = async (stockCode?: string | null, res?: express.Response<any, Record<string, any>>) => {
  if (!stockCode) return;

  console.log('get stock data:', stockCode);

  const db = <mongodb.Db>getDb();
  const stockDataCollection = new stockCollection(db, stockCode);
};
