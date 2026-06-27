import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageAdapter {
    static async getItem(_key: string): Promise<any | null> {
        try {
            const value = await AsyncStorage.getItem(_key);
            return value !== null ? JSON.parse(value) : null;
        } catch (error) {
            return null;
        }
    }

    static async setItem(key: string, value: any): Promise<void> {
        try {
            const data = JSON.stringify(value);
            await AsyncStorage.setItem(key, data);
        } catch (error) {
            throw new Error(`Error setting item ${key} ${value}`);
        }
    }
}
