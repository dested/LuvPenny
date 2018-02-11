import React from 'react';
import {Animated, Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import {hideHeader, Navigation} from '../../utils/navigationUtils';
import {Assets} from '../../assets';
import FullPanComponent from '../../components/fullPanComponent';
import {Utils} from '../../utils/utils';

interface State {
    stars: {animationX: Animated.Animated; animationY: Animated.Animated}[];
    canProgress: boolean;
    canReverse: boolean;
    pageIndex: number;
    colors: string[];
    survey: {
        significantOther?: string;
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
                animationX: animator.interpolate({
                    inputRange: introRange,
                    outputRange: introRange.map(() => Math.random() * Utils.getWindowWidth())
                }),
                animationY: animator.interpolate({
                    inputRange: introRange,
                    outputRange: introRange.map(() =>
                        Utils.randomFlip(
                            () => Math.random() * (Utils.getWindowHeight() * 0.35),
                            () => Utils.getWindowHeight() - Math.random() * (Utils.getWindowHeight() * 0.35)
                        )
                    )
                })
            }))
        }));
    }

    updatePageIndex(pageIndex: number): void {
        this.setState(prev => ({...prev, pageIndex: pageIndex, canProgress: true, canReverse: true}));
    }

    render() {
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
                    </View>
                    <View style={styles.textHolder}>
                        <Text style={styles.text}>Penny is your relationship manager</Text>
                    </View>
                    <View style={styles.textHolder}>
                        <Text style={styles.text}>She will make you a rockstar</Text>
                    </View>
                    <View style={styles.textHolder}>
                        <Text style={styles.text}>The more information Penny knows about your significant others</Text>
                    </View>
                    <View style={styles.textHolder}>
                        <Text style={styles.text}>The more help Penny can provide you</Text>
                    </View>
                    <View style={styles.textHolder}>
                        <Text style={styles.text}>Let's get started with a simple questionnaire</Text>
                    </View>
                    <View style={styles.textHolder}>
                        <Text style={styles.text}>
                            You don't have to answer every question, but the more you do the more Penny can help
                        </Text>
                    </View>
                    <View style={styles.textHolder}>
                        <Text style={styles.text}>Answer this:</Text>
                        <Text style={styles.text}>My most significant other is:</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={text =>
                                this.setState(prev => ({...prev, survey: {...prev.survey, significantOther: text}}))
                            }
                            value={this.state.survey.significantOther}
                        />
                    </View>
                </FullPanComponent>
                {this.state.stars.map((star, i) => (
                    <Animated.Image
                        key={i}
                        style={[
                            styles.star,
                            {transform: [{translateX: star.animationX}, {translateY: star.animationY}]}
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
    }
});