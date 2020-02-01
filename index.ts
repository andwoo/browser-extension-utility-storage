import { browser } from 'webextension-polyfill-ts';

export interface StorageResponse {
  success: boolean;
  data: string;
}

export const LoadFromStorage = async (key: string): Promise<StorageResponse> => {
  let data: string;
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

export const SaveToStorage = async (key: string, data: string): Promise<void> => {
  await browser.storage.sync.set({ [key]: data });
};

export const RemoveFromStorage = async (key: string): Promise<void> => {
  await browser.storage.sync.remove(key);
};
