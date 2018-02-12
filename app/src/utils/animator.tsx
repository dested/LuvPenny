import React from 'react';
import {Animated} from 'react-native';

export namespace Animator {
    interface SwingLeftProps {
        startPosition: {x: number; y: number};
        finalPosition: {x: number; y: number};
        duration: number;
    }

    export class In extends React.PureComponent<SwingLeftProps> {
        private swingAnimation: Animated.ValueXY;

        constructor(props: SwingLeftProps) {
            super(props);
            this.swingAnimation = new Animated.ValueXY({x: 0, y: 0});
            Animated.timing(this.swingAnimation.x, {
                toValue: 1,
                duration: props.duration,
                useNativeDriver: true
            }).start();
            Animated.timing(this.swingAnimation.y, {
                toValue: 1,
                duration: props.duration,
                useNativeDriver: true
            }).start();
        }

        render() {
            let swingX = this.swingAnimation.x.interpolate({
                inputRange: [0, 1],
                outputRange: [this.props.startPosition.x, this.props.finalPosition.x]
            });
            let swingY = this.swingAnimation.y.interpolate({
                inputRange: [0, 1],
                outputRange: [this.props.startPosition.y, this.props.finalPosition.y]
            });

            return (
                <Animated.View
                    pointerEvents={'none'}
                    style={{
                        left: 0,
                        top: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        transform: [{translateX: swingX}, {translateY: swingY}]
                    }}
                >
                    {this.props.children}
                </Animated.View>
            );
        }
    }
}
