import {Dimensions, Platform} from 'react-native';

export class Utils {
    static getWindowHeight(): number {
        let height = Dimensions.get('window').height;
        return Platform.OS == 'android' ? (height - 24) : height;
    }

    static range(length: number): number[] {
        const arr = [];
        for (let i = 0; i < length; i++) {
            arr.push(i);
        }
        return arr;
    }
}
