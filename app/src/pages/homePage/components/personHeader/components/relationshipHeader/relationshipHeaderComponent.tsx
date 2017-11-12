import React from "react";
import {Relationship} from "../../../../../../models/member";
import {Image, Animated, Text, TouchableOpacity, View, Dimensions} from "react-native";
import {styles} from "./styles";

interface Props {
    relationship: Relationship;
    index: number;
    scrollPosition: Animated.Value;
    onSelect: () => void;
}

export let RelationshipHeaderComponent: React.SFC<Props> = (props) => {
    let size = props.scrollPosition.interpolate({
        inputRange: [-100, props.index - 1.5, props.index, props.index + 1.5, 10000],
        outputRange: [34, 34, 64, 34, 34],
    });
    let opacity = props.scrollPosition.interpolate({
        inputRange: [-100, props.index - 1, props.index, props.index + 1, 10000],
        outputRange: [1, 1, 0, 1, 1],
    });
    let marginTop = props.scrollPosition.interpolate({
        inputRange: [-100, props.index - 1.5, props.index, props.index + 1.5, 10000],
        outputRange: [28, 28, 20, 28, 28],
    });

    let animatedTwo = new Animated.Value(2);

    return (
        <TouchableOpacity
            style={styles.body}
            onPress={() => props.onSelect()}
        >
            <View style={styles.body}>
                <Animated.View style={[styles.image, {marginTop: marginTop, width: size, height: size, borderRadius: Animated.divide(size, animatedTwo), backgroundColor: props.relationship.color}]}>
                    <Animated.Image
                        source={{uri: props.relationship.avatar}}
                        style={[styles.image, {width: size, height: size, borderRadius: Animated.divide(size, animatedTwo)}]}
                    />
                </Animated.View>
                <Animated.Text style={[styles.text, {opacity: opacity}]}>
                    {props.relationship.name}
                </Animated.Text>
            </View>
        </TouchableOpacity>
    )
};
