import { API } from './types';

declare global {
  interface Window {
    api: API;
  }
}
