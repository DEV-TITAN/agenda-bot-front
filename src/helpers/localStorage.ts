import { LocalStorageKeys } from './interfaces';

export const LOCAL_STORAGE_ACCESS_TOKEN = 'accessToken';

export function getLocalStorageKeys() {
  const keys: LocalStorageKeys = {
    accessToken: localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN),
  };

  return keys;
}
