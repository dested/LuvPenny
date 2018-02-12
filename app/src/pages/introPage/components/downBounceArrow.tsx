import React from 'react';
import {Image, Animated, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Assets} from '../../../assets';
import {AnimationUtils} from '../../../utils/animationUtils';

interface Props {
    press: () => void;
}

export let DownBounceArrow: React.SFC<Props> = props => {
    let bounce = AnimationUtils.repeat(1200).interpolate({
        inputRange: [0, 1],
        outputRange: [0, 25]
    });

    return (
        <TouchableWithoutFeedback onPress={() => props.press()}>
            <Animated.View style={[styles.outer, {transform: [{translateY: bounce}]}]}>
                <Image source={Assets.icons.arrow_down} style={styles.arrow} />
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

let styles = StyleSheet.create({
    outer: {
        position: 'absolute',
        bottom: 30,
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
