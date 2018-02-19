import {Animated, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import LinearGradient, {LinearGradientProps} from 'react-native-linear-gradient';

export const AnimatedLinearGradient = Animated.createAnimatedComponent(
    class extends React.Component<{location1: number; location2: number} & LinearGradientProps> {
        render() {
            return (
                <LinearGradient
                    {...this.props}
                    locations={[this.props.location0, this.props.location1, this.props.location2]}
                >
                    {this.props.children}
                </LinearGradient>
            );
        }
    }
);
