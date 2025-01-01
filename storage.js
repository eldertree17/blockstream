// storage.js
export class MyStorage {
    async setItem(key, value) {
        // Example implementation using local storage
        localStorage.setItem(key, value);
    }

    async getItem(key) {
        // Example implementation using local storage
        return localStorage.getItem(key);
    }

    async removeItem(key) {
        // Example implementation using local storage
        localStorage.removeItem(key);
    }
}
