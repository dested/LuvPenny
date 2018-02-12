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

    static randomizeArray<T>(arr: T[]): T[] {
        let items = [...arr];
        for (let i = items.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [items[i], items[j]] = [items[j], items[i]];
        }

        return items.sort(() => Math.random());
    }

    static getRandomItem<T>(items: T[]): T {
        return this.randomizeArray(items)[0];
    }
}
