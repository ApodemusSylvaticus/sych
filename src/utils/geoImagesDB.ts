import { IGeoImg } from '../store/geoImgs.ts';

const DB_NAME = 'GeoImagesDB';
const STORE_NAME = 'geoImages';
const DB_VERSION = 1;
const GEO_IMAGES_KEY = 'allGeoImages';

export const geoImagesDB = {
  async openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        db.createObjectStore(STORE_NAME);
      };
    });
  },

  async getGeoImages(): Promise<IGeoImg[]> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(GEO_IMAGES_KEY);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result?.allGeoImages || []);
    });
  },

  async setGeoImages(geoImages: IGeoImg[]): Promise<void> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put({ [GEO_IMAGES_KEY]: geoImages }, GEO_IMAGES_KEY);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  },

  async addGeoImg(geoImg: IGeoImg): Promise<void> {
    const geoImages = await this.getGeoImages();
    geoImages.push(geoImg);
    await this.setGeoImages(geoImages);
  },

  async updateGeoImg(updatedGeoImg: IGeoImg): Promise<void> {
    const geoImages = await this.getGeoImages();
    const index = geoImages.findIndex((img) => img.uniqKey === updatedGeoImg.uniqKey);
    if (index !== -1) {
      geoImages[index] = updatedGeoImg;
      await this.setGeoImages(geoImages);
    }
  },

  async deleteGeoImg(key: string): Promise<void> {
    const geoImages = await this.getGeoImages();
    const filteredImages = geoImages.filter((img) => img.uniqKey !== key);
    await this.setGeoImages(filteredImages);
  },
};
