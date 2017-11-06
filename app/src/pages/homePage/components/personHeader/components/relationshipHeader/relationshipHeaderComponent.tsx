import React from "react";
import {Relationship} from "../../../../../../models/member";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";

interface Props {
    relationship: Relationship;
    onSelect: () => void;
    selected :boolean;
}

export let RelationshipHeaderComponent: React.SFC<Props> = (props) => {
    return (
        <View style={[styles.body,{backgroundColor:props.selected?"#ffe8ff":"#f2f2f2"}]}>

            <TouchableOpacity
                onPress={() => props.onSelect()}
                style={[styles.image, {backgroundColor: props.relationship.color}]}
            >
                <Image
                    source={{uri: props.relationship.avatar}}
                    style={styles.image}
                />
            </TouchableOpacity>
            <Text style={styles.text}>
                {props.relationship.name}
            </Text>
        </View>
    )
};
