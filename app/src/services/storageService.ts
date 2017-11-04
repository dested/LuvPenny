import {AsyncStorage} from "react-native";

export class StorageService {
    public static async getValue(key: string) {
        const result = await AsyncStorage.getItem(key);
        if (result === null) {
            return null;
        }
        return JSON.parse(result);
    }

    public static async setValue(key: string, value: any) {
        await AsyncStorage.setItem(key, value);
    }

    public static async removeValue(key: string) {
        await AsyncStorage.removeItem(key);
    }


    public static async get_jwt() {
        return await StorageService.getValue('jwt');
    }
    public static async set_jwt(value: string) {
        await StorageService.setValue("jwt", value);
    }
}