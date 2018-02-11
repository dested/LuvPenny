import React from 'react';
import {Relationship} from 'src/models/member';
import {Animated, TouchableOpacity, View, StyleSheet} from 'react-native';
import {CommonStyles} from 'src/utils/commonStyles';

interface Props {
    relationship: Relationship;
    index: number;
    scrollPosition: Animated.AnimatedInterpolation;
    onSelect: () => void;
}
let animatedTwo = new Animated.Value(2);
let animatedFour = new Animated.Value(4);

export let RelationshipHeaderComponent: React.SFC<Props> = props => {
    let size = props.scrollPosition.interpolate({
        inputRange: [-100, props.index - 1.5, props.index, props.index + 1.5, 10000],
        outputRange: [34, 34, 64, 34, 34]
    });
    let opacity = props.scrollPosition.interpolate({
        inputRange: [-100, props.index - 1, props.index, props.index + 1, 10000],
        outputRange: [1, 1, 0, 1, 1]
    });
    let marginTop = props.scrollPosition.interpolate({
        inputRange: [-100, props.index - 1.5, props.index, props.index + 1.5, 10000],
        outputRange: [28, 28, 20, 28, 28]
    });

    let paddedSize = Animated.add(size, animatedFour);
    let imageBodyStyles = {
        marginTop: marginTop,
        width: paddedSize,
        height: paddedSize,
        borderRadius: Animated.divide(paddedSize, animatedTwo),
        backgroundColor: props.relationship.color
    };

    let imageStyles = {
        width: size,
        height: size,
        borderRadius: Animated.divide(size, animatedTwo)
    };

    return (
        <TouchableOpacity style={styles.body} onPress={() => props.onSelect()}>
            <View style={styles.body}>
                <Animated.View style={[styles.imageBody, imageBodyStyles]}>
                    <Animated.Image
                        source={
                            props.relationship.avatar.length
                                ? {uri: props.relationship.avatar}
                                : props.relationship.avatar
                        }
                        style={[styles.image, imageStyles]}
                    />
                </Animated.View>
                <Animated.Text style={[styles.text, {opacity: opacity}]}>{props.relationship.name}</Animated.Text>
            </View>
        </TouchableOpacity>
    );
};

let styles = StyleSheet.create({
    body: {
        height: 90,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    image: {},
    imageBody: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        paddingTop: 5,
        fontSize: 10,
        ...CommonStyles.thickFont
    }
});
