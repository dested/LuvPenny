import {Dimensions, Platform} from 'react-native';

export class Utils {
    static randomFlip<T>(heads: () => T, tails: () => T): T {
        if (Math.random() * 100 < 50) {
            return heads();
        } else {
            return tails();
        }
    }

    static getWindowHeight(): number {
        let height = Dimensions.get('window').height;
        return Platform.OS === 'android' ? height - 24 : height;
    }

    static getWindowWidth(): number {
        return Dimensions.get('window').width;
    }

    static range(length: number): number[] {
        const arr = [];
        for (let i = 0; i < length; i++) {
            arr.push(i);
        }
        return arr;
    }
}
