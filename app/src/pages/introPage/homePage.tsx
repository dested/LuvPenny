import React, {Component} from 'react';
import {Animated, Dimensions, PanResponder, PanResponderInstance, StyleSheet, Text, View} from 'react-native';
import {hideHeader, Navigation} from '../../utils/navigationUtils';
import {Utils} from '../../utils/utils';

interface State {
    introIndex: number;
    introIndexAnimator: Animated.Value;
    introIndexAnimatorNonNative: Animated.Value;
}

interface Props {
}

@Navigation({
    ...hideHeader
})
export default class IntroPage extends Component<Props, State> {
    panResponder: PanResponderInstance;
    intro: { text: string; color: string }[];
    canPan: boolean;

    constructor(props: Props) {
        super(props);

        this.intro = [
            {text: 'This is Penny', color: '#548eca'},
            {text: 'Penny is your relationship manager', color: '#ffacaa'},
            {text: 'She will make you a rockstar', color: '#8e5ace'},
            {text: 'The more information Penny knows about your significant others', color: '#4f8e5a'},
            {text: 'The more help Penny can provide you', color: '#48acca'}
        ];
        this.canPan = true;

        this.state = {
            introIndex: 0,
            introIndexAnimator: new Animated.Value(0),
            introIndexAnimatorNonNative: new Animated.Value(0)
        };
    }

    componentWillMount(): void {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: (evt, gestureState) => {
                if (this.canPan) {
                    if (gestureState.dy < -15) {
                        if (this.state.introIndex < this.intro.length - 1) {
                            this.setState(prev => {
                                Animated.timing(this.state.introIndexAnimator, {
                                    toValue: prev.introIndex + 1,
                                    duration: 500,
                                    useNativeDriver: true
                                }).start();
                                Animated.timing(this.state.introIndexAnimatorNonNative, {
                                    toValue: prev.introIndex + 1,
                                    duration: 500,
                                }).start();
                                return {...prev, canPan: false, introIndex: prev.introIndex + 1};
                            });
                            this.canPan = false;
                        }
                    }
                    if (gestureState.dy > 15) {
                        if (this.state.introIndex > 0) {
                            this.setState(prev => {
                                Animated.timing(this.state.introIndexAnimator, {
                                    toValue: prev.introIndex - 1,
                                    duration: 500,
                                    useNativeDriver: true
                                }).start();
                                Animated.timing(this.state.introIndexAnimatorNonNative, {
                                    toValue: prev.introIndex - 1,
                                    duration: 500,
                                }).start();
                                return {...prev, canPan: false, introIndex: prev.introIndex - 1};
                            });
                            this.canPan = false;
                        }
                    }
                }
            },
            onPanResponderRelease: () => {
                this.canPan = true;
            }
        });
    }

    render() {
        let introRange = Utils.range(this.intro.length);

        const position = this.state.introIndexAnimator.interpolate({
            inputRange: introRange,
            outputRange: introRange.map(a => -a * Utils.getWindowHeight())
        });

        const color = this.state.introIndexAnimatorNonNative.interpolate({
            inputRange: introRange,
            outputRange: this.intro.map(a => a.color)
        });

        return (
            <Animated.View style={[styles.outer, {backgroundColor: color}]} {...this.panResponder.panHandlers}>
                {this.intro.map(intro => (
                    <Animated.View
                        key={intro.text}
                        style={[
                            styles.section,
                            {
                                transform: [
                                    {
                                        translateY: position
                                    }
                                ]
                            }
                        ]}
                    >
                        <Text style={styles.introText}>
                            {intro.text}
                        </Text>
                    </Animated.View>
                ))}
            </Animated.View>
        );
    }
}

let styles = StyleSheet.create({
    outer: {
        height: '100%',
    },
    introText: {
        fontSize: 32,
        textAlign: 'center',
        margin: 10
    },
    section: {
        borderWidth: 5,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
