import {Animated, Easing} from 'react-native';

export class AnimationUtils {
    static timeout(timeout: number): Promise<void> {
        return new Promise(res => {
            setTimeout(() => {
                res();
            }, timeout);
        });
    }

    static repeat(duration: number) {
        let bounce = new Animated.Value(0);
        let cycleAnimation = () => {
            Animated.sequence([
                Animated.timing(bounce, {
                    toValue: 1,
                    duration: duration,
                    easing: Easing.out(Easing.linear),
                    useNativeDriver: true
                }),
                Animated.timing(bounce, {
                    toValue: 0,
                    duration: duration * 1.5,
                    easing: Easing.in(Easing.linear),
                    useNativeDriver: true
                })
            ]).start(() => {
                cycleAnimation();
            });
        };
        cycleAnimation();
        return bounce;
    }
}
