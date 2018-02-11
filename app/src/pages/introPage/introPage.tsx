import React from 'react';
import {Animated, PanResponder, PanResponderInstance, StyleSheet, Text, View} from 'react-native';
import {hideHeader, Navigation} from '../../utils/navigationUtils';
import {Utils} from '../../utils/utils';
import {Assets} from '../../assets';
import LinearGradient from 'react-native-linear-gradient';

interface State {
    introIndex: number;
    introIndexAnimator: Animated.Value;
    introIndexAnimatorNonNative: Animated.Value;
    stars: {animationX: Animated.Animated; animationY: Animated.Animated}[];
}

interface Props {}

@Navigation({
    ...hideHeader
})
export default class IntroPage extends React.Component<Props, State> {
    panResponder: PanResponderInstance;
    intro: {text: string; color: string}[];
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

        let indexAnimator = new Animated.Value(0);
        let introRange = Utils.range(this.intro.length);

        this.state = {
            introIndex: 0,
            introIndexAnimator: indexAnimator,
            introIndexAnimatorNonNative: new Animated.Value(0),
            stars: Utils.range(6).map(() => ({
                animationX: indexAnimator.interpolate({
                    inputRange: introRange,
                    outputRange: introRange.map(() => Math.random() * Utils.getWindowWidth())
                }),
                animationY: indexAnimator.interpolate({
                    inputRange: introRange,
                    outputRange: introRange.map(() =>
                        Utils.randomFlip(
                            () => Math.random() * (Utils.getWindowHeight() * 0.35),
                            () => Utils.getWindowHeight() - Math.random() * (Utils.getWindowHeight() * 0.35)
                        )
                    )
                })
            }))
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
                            this.progressIndex(+1);
                        }
                    }
                    if (gestureState.dy > 15) {
                        if (this.state.introIndex > 0) {
                            this.progressIndex(-1);
                        }
                    }
                }
            },
            onPanResponderRelease: () => {
                this.canPan = true;
            }
        });
    }

    private progressIndex(amount: number) {
        this.setState(prev => {
            Animated.timing(this.state.introIndexAnimator, {
                toValue: prev.introIndex + amount,
                duration: 500,
                useNativeDriver: true
            }).start();
            Animated.timing(this.state.introIndexAnimatorNonNative, {
                toValue: prev.introIndex + amount,
                duration: 500
            }).start();
            return {...prev, canPan: false, introIndex: prev.introIndex + amount};
        });
        this.canPan = false;
    }

    render() {
        let introRange = Utils.range(this.intro.length);

        const scrollPosition = this.state.introIndexAnimator.interpolate({
            inputRange: introRange,
            outputRange: introRange.map(a => -a * Utils.getWindowHeight())
        });

        return (
            <View style={{left: 0, right: 0, top: 0, bottom: 0}} {...this.panResponder.panHandlers}>
                {this.intro.map((intro, index) => (
                    <Animated.View
                        key={intro.text}
                        style={[
                            {
                                transform: [
                                    {
                                        translateY: scrollPosition
                                    }
                                ]
                            }
                        ]}
                    >
                        <LinearGradient
                            colors={[intro.color, this.intro[index + 1] ? this.intro[index + 1].color : intro.color]}
                            locations={[0.9, 1]}
                            style={styles.section}
                        >
                            <Text style={styles.introText}>{intro.text}</Text>
                        </LinearGradient>
                    </Animated.View>
                ))}

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
    outer: {
        height: '100%'
    },
    star: {
        height: 75,
        width: 75,
        position: 'absolute',
        opacity: 0.9
    },
    introText: {
        fontSize: 32,
        textAlign: 'center',
        margin: 20
    },
    section: {
        height: Utils.getWindowHeight() + 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
