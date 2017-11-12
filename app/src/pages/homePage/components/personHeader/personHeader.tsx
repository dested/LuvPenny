import React, {Component} from "react";
import {Animated, Dimensions, Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, ScrollViewStatic, Text, TouchableHighlight, View} from "react-native";
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
    scrollPosition:Animated.Value;
}


export class PersonHeader extends Component<Props, State> {
    private scrollView: ScrollView;
    private scrollPosition: number;

    constructor() {
        super();
        this.state = {
            scrollPosition:new Animated.Value(0)
        };
    }

    render() {
        return (
            <View style={styles.personHeader}>
                <ScrollView
                    ref={(r) => this.scrollView = r as any}
                    onScroll={(r) => this.handleScroll(r)}

                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    onScrollEndDrag={() => this.snapDragPosition()}
                >
                    <View style={styles.padding}></View>
                    {
                        this.props.relationships.map((r, i) => (
                            <RelationshipHeaderComponent
                                key={i}
                                index={i}
                                scrollPosition={this.state.scrollPosition}
                                relationship={r}
                                onSelect={() => this.selectPerson(r)}
                            />
                        ))
                    }
                    <View style={styles.padding}></View>
                </ScrollView>
                <View style={styles.highlight} pointerEvents={"none"}></View>
            </View>
        );
    }


    private snapDragPosition() {
        setTimeout(() => {
            let position = Math.round(this.scrollPosition / 90);
            this.scrollView.scrollTo({x: position * 90, animated: true});
        }, 300);
    }

    private handleScroll(r: NativeSyntheticEvent<NativeScrollEvent>) {
        this.scrollPosition = Math.abs(r.nativeEvent.contentOffset.x);
        this.state.scrollPosition.setValue(r.nativeEvent.contentOffset.x/90);
    }

    private selectPerson(r: Relationship) {
        let index = this.props.relationships.indexOf(r);
        this.scrollView.scrollTo({x: index * 90, animated: true});
        this.props.onSelect(r);
    }
}
