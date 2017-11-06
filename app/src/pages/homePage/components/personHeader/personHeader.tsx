import React, {Component} from "react";
import {Animated, Dimensions, Image, ScrollView, Text, TouchableHighlight, View} from "react-native";
import {Assets} from "../../../../assets";
import {Relationship} from "../../../../models/member";
import {styles} from "./styles";
import {RelationshipHeaderComponent} from "./components/relationshipHeader/relationshipHeaderComponent";


interface Props {
    relationships: Relationship[],
    selectedRelationship: Relationship,
    onSelect: (r: Relationship) => void;
}

interface State {
}

export class PersonHeader extends Component<Props, State> {

    constructor() {
        super();
        this.state = {};
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
                                selected={this.props.selectedRelationship === r}
                                relationship={r}
                                onSelect={() => this.props.onSelect(r)}
                            />
                        ))
                    }
                </ScrollView>
            </View>
        );
    }


}


