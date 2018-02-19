import React, {Component} from 'react';
import {Animated, Dimensions, NativeSyntheticEvent, ScrollView, ScrollViewStatic, StyleSheet, View} from 'react-native';
import {Assets} from 'src/assets';
import {Relationship} from 'src/models/member';
import {RelationshipHeaderComponent} from './components/relationshipHeaderComponent';

interface Props {
    relationships: Relationship[];
    selectedRelationship: Relationship;
    onSelect: (r: Relationship) => void;
}

interface State {
    scrollPosition: Animated.Value;
}

export class PersonHeader extends Component<Props, State> {
    private scrollView: ScrollView;
    private scrollPosition: number;

    constructor(props: Props) {
        super(props);
        this.state = {
            scrollPosition: new Animated.Value(0)
        };
        this.state.scrollPosition.addListener(r => {
            this.scrollPosition = Math.abs(r.value);
        });
    }

    private snapDragPosition(velocityX: number) {
        setTimeout(() => {
            let position = Math.round(this.scrollPosition / 90);
            this.scrollView.scrollTo({x: position * 90, animated: true});
        }, Math.abs(velocityX) < 0.8 ? 0 : 300);
    }

    private selectPerson(r: Relationship) {
        this.scrollToIndex(this.props.relationships.indexOf(r) + 1);
        this.props.onSelect(r);
    }

    private scrollToIndex(index: number) {
        this.scrollView.scrollTo({x: index * 90, animated: true});
    }

    private addNew() {
        this.scrollToIndex(this.props.relationships.length + 1);
    }

    private selectEveryone() {
        this.scrollToIndex(0);
    }

    render() {
        let animatedDivision = Animated.divide(this.state.scrollPosition, new Animated.Value(90));
        return (
            <View style={styles.personHeader}>
                <ScrollView
                    ref={r => (this.scrollView = r as any)}
                    scrollEventThrottle={16}
                    onScroll={Animated.event([
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: this.state.scrollPosition
                                }
                            }
                        }
                    ])}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    onScrollEndDrag={ev => this.snapDragPosition(ev.nativeEvent.velocity.x)}
                >
                    <View style={styles.leftPadding} />
                    <RelationshipHeaderComponent
                        index={0}
                        scrollPosition={animatedDivision}
                        relationship={{
                            name: 'Everyone',
                            id: '',
                            color: '#FFFFFF',
                            avatar: Assets.icons.home
                        }}
                        onSelect={() => this.selectEveryone()}
                    />
                    {this.props.relationships.map((r, i) => (
                        <RelationshipHeaderComponent
                            key={i}
                            index={i + 1}
                            scrollPosition={animatedDivision}
                            relationship={r}
                            onSelect={() => this.selectPerson(r)}
                        />
                    ))}
                    <View style={styles.rightPadding} />
                    <RelationshipHeaderComponent
                        index={this.props.relationships.length + 1}
                        scrollPosition={animatedDivision}
                        relationship={{
                            name: ' ',
                            id: '',
                            color: '#FFFFFF',
                            avatar: Assets.icons.add_user
                        }}
                        onSelect={() => this.addNew()}
                    />
                </ScrollView>
                <View style={styles.highlight} pointerEvents={'none'} />
            </View>
        );
    }
}

let halfScreen = Dimensions.get('screen').width / 2 - 45;
let styles = StyleSheet.create({
    personHeader: {
        height: 90,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    leftPadding: {
        width: halfScreen
    },
    rightPadding: {
        width: halfScreen - 90
    },
    highlight: {
        marginLeft: halfScreen + 5,
        marginTop: 5,
        width: 80,
        height: 80,
        borderWidth: 2,
        borderColor: '#7df0e2',
        borderRadius: 45,
        top: 0,
        bottom: 0,
        position: 'absolute',
        opacity: 0.7
    }
});
