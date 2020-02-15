import { browser } from 'webextension-polyfill-ts';

export interface StorageResponse {
  success: boolean;
  data: string | Array<string>;
}

export const loadFromStorage = async (key: string): Promise<StorageResponse> => {
  let data: string | Array<string>;
  try {
    const response = await browser.storage.sync.get(key);
    data = response[key];
  } catch (error) {
    data = null;
  }
  return {
    success: data != null,
    data: data,
  };
};

export const saveToStorage = async (key: string, data: string | Array<string>): Promise<void> => {
  await browser.storage.sync.set({ [key]: data });
};

export const removeFromStorage = async (key: string): Promise<void> => {
  await browser.storage.sync.remove(key);
};
