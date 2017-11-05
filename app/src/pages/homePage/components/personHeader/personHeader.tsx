import React, {Component} from "react";
import {Animated, Dimensions, Image, ScrollView, TouchableWithoutFeedback, View} from "react-native";
import {Assets} from "../../../../assets";
import {Relationship} from "../../../../models/member";
import {relationshipStyles, styles} from "./styles";

let RelationshipHeaderComponent: React.SFC<{ relationship: Relationship }> = (props) => {
    return (
        <View style={[relationshipStyles.body, {backgroundColor: props.relationship.color}]}>
        </View>
    )
};

interface Props {
    relationships: Relationship[],
}

interface State {
}

export class PersonHeader extends Component<Props, State> {

    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.personHeader}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        this.props.relationships.map((r, i) => (
                            <RelationshipHeaderComponent
                                key={i}
                                relationship={r}
                            />
                        ))
                    }
                </ScrollView>
            </View>
        );
    }
}


