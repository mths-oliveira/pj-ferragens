interface StorageItem<T = any> {
  payload: T;
  expirationDate: Date;
}

export class Storage<T = any> {
  constructor(private _itemName: string) {}

  find() {
    const item = localStorage.getItem(this._itemName);
    if (!item) return;
    const storageItem: StorageItem<T> = JSON.parse(item);
    if (!this.isExpired(storageItem)) {
      return storageItem.payload;
    }
    this.remove();
  }

  remove() {
    localStorage.removeItem(this._itemName);
  }

  private isExpired(storageItem: StorageItem) {
    const expirationDate = new Date(storageItem.expirationDate);
    const now = new Date();
    return now > expirationDate;
  }

  save(payload: T, expireIn?: number) {
    const item = this.setExpirationDate(payload, expireIn);
    localStorage.setItem(this._itemName, JSON.stringify(item));
  }

  private setExpirationDate(payload: T, expireIn: number = 6) {
    const expirationDate = this.getExpirationDate(expireIn);
    return {
      expirationDate,
      payload,
    };
  }

  private getExpirationDate(expireIn: number) {
    const date = new Date();
    date.setHours(date.getHours() + expireIn);
    return date;
  }
}

export function useStorage<T = any>(itemName: string) {
  const storage = new Storage<T>(itemName);
  return storage;
}
