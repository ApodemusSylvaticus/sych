import { IMarker } from '../store/markers.ts';

const DB_NAME = 'targetsDB';
const STORE_NAME = 'targetsStore';
const DB_VERSION = 1;
const ALL_MARKERS_KEY = 'allMarkers';

export const targetsDB = {
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

  async getMarkers(): Promise<IMarker[]> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(ALL_MARKERS_KEY);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  },

  async setMarkers(markers: IMarker[]): Promise<void> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(markers, ALL_MARKERS_KEY);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  },

  async addMarker(marker: IMarker): Promise<void> {
    const markers = await this.getMarkers();
    markers.push(marker);
    await this.setMarkers(markers);
  },

  async updateMarker(updatedMarker: IMarker): Promise<void> {
    const markers = await this.getMarkers();
    const index = markers.findIndex((marker) => marker.timeStamp === updatedMarker.timeStamp);
    if (index !== -1) {
      markers[index] = updatedMarker;
      await this.setMarkers(markers);
    }
  },

  async deleteMarker(timeStamp: number): Promise<void> {
    const markers = await this.getMarkers();
    const filteredMarkers = markers.filter((marker) => marker.timeStamp !== timeStamp);
    await this.setMarkers(filteredMarkers);
  },

  async clearAllMarkers(): Promise<void> {
    await this.setMarkers([]);
  },
};
