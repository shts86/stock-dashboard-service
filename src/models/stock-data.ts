export interface TimeData {
  time: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  _id: string;
}

export interface DailyData {
  _id: string;
  day: string;
  hours: TimeData[];
}

export interface stockTimeIntervalRaw {
  close: string;
  high: string;
  low: string;
  open: string;
  time: string;
  volume: string;
}
