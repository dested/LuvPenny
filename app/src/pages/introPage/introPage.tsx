import React from 'react';
import {Animated, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import {hideHeader, Navigation} from 'src/utils/navigationUtils';
import FullPanComponent from 'src/components/fullPanComponent';
import {Utils} from 'src/utils/utils';
import {Assets} from 'src/assets';
import {HorizontalSelector} from '../../components/horizontalSelector';
import {DownBounceArrow} from './components/downBounceArrow';

interface State {
    stars: {translateX: Animated.Animated; translateY: Animated.Animated; scale: Animated.Animated}[];
    canProgress: boolean;
    canReverse: boolean;
    pageIndex: number;
    colors: string[];
    survey: {
        significantOther?: string;
        significantOtherRelationship?: string;
    };
}

interface Props {}

@Navigation({
    ...hideHeader
})
export default class IntroPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            stars: [],
            canReverse: true,
            canProgress: true,
            pageIndex: 0,
            colors: ['#60b6ff', '#ffabaa', '#af6fff', '#8fffa3', '#59d9ff'],
            survey: {}
        };
    }

    setupIndexAnimator(animator: Animated.Value, range: number): void {
        let introRange = Utils.range(range);

        this.setState(prev => ({
            ...prev,
            stars: Utils.range(6).map(() => ({
                translateX: animator.interpolate({
                    inputRange: introRange,
                    outputRange: introRange.map(() => Math.random() * Utils.getWindowWidth())
                }),
                translateY: animator.interpolate({
                    inputRange: introRange,
                    outputRange: introRange.map(() =>
                        Utils.randomFlip(
                            () => Math.random() * (Utils.getWindowHeight() * 0.25),
                            () => Utils.getWindowHeight() - Math.random() * (Utils.getWindowHeight() * 0.25)
                        )
                    )
                }),

                scale: animator.interpolate({
                    inputRange: introRange,
                    outputRange: introRange.map(() => Math.random() * 0.5 + 0.5)
                })
            }))
        }));
    }

    updatePageIndex(pageIndex: number): void {
        this.setState(prev => ({...prev, pageIndex: pageIndex, canProgress: true, canReverse: true}));
    }

    render() {
        let relationshipItems = [
            {color: 'yellow', icon: Assets.elements.relationship.boyfriend, label: 'Boyfriend'},
            {color: 'yellow', icon: Assets.elements.relationship.girlfriend, label: 'Girlfriend'},
            {color: 'yellow', icon: Assets.elements.relationship.husband, label: 'Husband'},
            {color: 'yellow', icon: Assets.elements.relationship.wife, label: 'Wife'},
            {color: 'yellow', icon: Assets.elements.relationship.son, label: 'Son'},
            {color: 'yellow', icon: Assets.elements.relationship.daughter, label: 'Daughter'}
        ];

        return (
            <View style={{left: 0, right: 0, top: 0, bottom: 0}}>
                <FullPanComponent
                    colors={this.state.colors}
                    pageIndex={this.state.pageIndex}
                    indexAnimator={(animator, range) => this.setupIndexAnimator(animator, range)}
                    canProgress={this.state.canProgress}
                    canReverse={this.state.canReverse}
                    onIndexChange={index => this.updatePageIndex(index)}
                >
                    <View style={styles.textHolder}>
                        <Text style={styles.text}>This is Penny</Text>
                        <DownBounceArrow />
                    </View>
                    <View style={styles.textHolder}>
                        <Text style={styles.text}>Penny is your relationship manager</Text>
                        <DownBounceArrow />
                    </View>
                    <View style={styles.textHolder}>
                        <Text style={styles.text}>She will make you a rockstar</Text>
                        <DownBounceArrow />
                    </View>
                    <View style={styles.textHolder}>
                        <Text style={styles.text}>The more information Penny knows about your significant others</Text>
                        <DownBounceArrow />
                    </View>
                    <View style={styles.textHolder}>
                        <Text style={styles.text}>The more help Penny can provide you</Text>
                        <DownBounceArrow />
                    </View>
                    <View style={styles.textHolder}>
                        <Text style={styles.text}>Let's get started with a simple questionnaire</Text>
                        <DownBounceArrow />
                    </View>
                    <View style={styles.textHolder}>
                        <Text style={styles.text}>
                            You don't have to answer every question, but the more you do the more Penny can help
                        </Text>
                        <DownBounceArrow />
                    </View>
                    <KeyboardAvoidingView style={styles.textHolder} behavior={'position'}>
                        <Text style={[styles.text, {fontSize: 26}]}>Answer this:</Text>
                        <Text style={styles.text}>My most significant other is</Text>
                        <TextInput
                            style={styles.textInput}
                            autoCapitalize={'words'}
                            returnKeyType={'next'}
                            onChangeText={text =>
                                this.setState(prev => ({...prev, survey: {...prev.survey, significantOther: text}}))
                            }
                            value={this.state.survey.significantOther}
                        />
                        {this.state.canProgress && <DownBounceArrow />}
                    </KeyboardAvoidingView>

                    <View style={styles.textHolder}>
                        <Text style={styles.text}>They are my</Text>

                        <HorizontalSelector
                            items={relationshipItems}
                            onSelect={() => {}}
                            selectedItem={relationshipItems[0]}
                            extraItem={{label: 'Other', color: 'yellow', icon: Assets.icons.star}}
                        />
                        {this.state.canProgress && <DownBounceArrow />}
                    </View>
                </FullPanComponent>
                {this.state.stars.map((star, i) => (
                    <Animated.Image
                        key={i}
                        style={[
                            styles.star,
                            {
                                transform: [
                                    {translateX: star.translateX},
                                    {translateY: star.translateY},
                                    {scaleX: star.scale},
                                    {scaleY: star.scale}
                                ]
                            }
                        ]}
                        source={Assets.elements.star}
                    />
                ))}
            </View>
        );
    }
}

let styles = StyleSheet.create({
    star: {
        height: 75,
        width: 75,
        position: 'absolute',
        opacity: 0.9
    },

    textHolder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    text: {
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-light',
        color: '#262926',
        margin: 20,
        fontSize: 32,
        textAlign: 'center'
    },
    textInput: {
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-light',
        color: '#262926',
        margin: 20,
        fontSize: 32,
        textAlign: 'center'
    },
    picker: {
        color: '#262926',
        margin: 20
    }
});
