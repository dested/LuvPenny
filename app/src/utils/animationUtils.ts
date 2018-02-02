import {Platform, PlatformOSType} from 'react-native';

export class AnimationUtils {
    static timeout(timeout: number): Promise<void> {
        return new Promise(res => {
            setTimeout(() => {
                res();
            }, timeout);
        });
    }
}
