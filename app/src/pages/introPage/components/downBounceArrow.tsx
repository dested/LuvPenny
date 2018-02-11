import React from 'react';
import {Image, View, Animated, Easing, StyleSheet, EasingFunction} from 'react-native';
import {Assets} from '../../../assets';
import {AnimationUtils} from '../../../utils/animationUtils';

interface Props {}

export let DownBounceArrow: React.SFC<Props> = props => {
    let bounce = AnimationUtils.repeat(600).interpolate({
        inputRange: [0, 1],
        outputRange: [0, 25]
    });

    return (
        <Animated.View style={[styles.outer, {transform: [{translateY: bounce}]}]}>
            <Image source={Assets.icons.arrow_down} style={styles.arrow} />
        </Animated.View>
    );
};

let styles = StyleSheet.create({
    outer: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    arrow: {
        width: 48,
        height: 48
    }
});
