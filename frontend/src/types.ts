export interface IUser {
  id: number | string,
  username: string,
  avatar: string,
  email: string,
  created_at: Date
}

export interface IPollutionData {
  ts: Date,
  aqius: number,
  mainus: string,
  aqicn: number,
  maincn: string
}

export interface IWeatherData {
  ts: Date,
  ic: string,
  hu: number,
  pr: number,
  tp: number,
  wd: number,
  ws: number
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  language_code?: string;
}

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: TelegramUser;
    query_id?: string;
    auth_date?: number;
    hash?: string;
  };
  ready: () => void;
}