import allStocks from './all-stocks';
import stockData from './stock-data';
import currentDay from './current-day';

export const apis = [
  {
    prefix: '/all-stocks',
    router: allStocks,
  },
  {
    prefix: '/stock-data',
    router: stockData,
  },
  {
    prefix: '/current-day',
    router: currentDay,
  },
];
