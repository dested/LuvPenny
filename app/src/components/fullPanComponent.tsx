import React, {Component, ReactNode} from 'react';
import {Animated, PanResponder, PanResponderInstance, StyleSheet, View} from 'react-native';
import {Utils} from '../utils/utils';
import LinearGradient from 'react-native-linear-gradient';

interface State {
    introIndex: number;
    introIndexAnimator: Animated.Value;
}

interface Props {
    items: {color: string; component: ReactNode}[];
    introIndexAnimator?: (animator: Animated.Value) => void;
}

export default class FullPanComponent extends Component<Props, State> {
    panResponder: PanResponderInstance;
    canPan: boolean;

    constructor(props: Props) {
        super(props);
        this.canPan = true;

        this.state = {
            introIndex: 0,
            introIndexAnimator: new Animated.Value(0)
        };
    }

    componentWillMount(): void {
        this.props.introIndexAnimator && this.props.introIndexAnimator(this.state.introIndexAnimator);

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: (evt, gestureState) => {
                if (this.canPan) {
                    if (gestureState.dy < -15) {
                        if (this.state.introIndex < this.props.items.length - 1) {
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
            return {...prev, canPan: false, introIndex: prev.introIndex + amount};
        });
        this.canPan = false;
    }

    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): boolean {
        return false;
    }

    render() {
        let introRange = Utils.range(this.props.items.length);
        const scrollPosition = this.state.introIndexAnimator.interpolate({
            inputRange: introRange,
            outputRange: introRange.map(a => -a * Utils.getWindowHeight())
        });

        return (
            <View style={{left: 0, right: 0, top: 0, bottom: 0}} {...this.panResponder.panHandlers}>
                {this.props.items.map((intro, index) => (
                    <Animated.View
                        key={index}
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
                            colors={[
                                intro.color,
                                this.props.items[index + 1] ? this.props.items[index + 1].color : intro.color
                            ]}
                            locations={[0.9, 1]}
                            style={styles.section}
                        >
                            {this.props.items[index].component}
                        </LinearGradient>
                    </Animated.View>
                ))}
            </View>
        );
    }
}

let styles = StyleSheet.create({
    outer: {
        height: '100%'
    },
    introText: {
        fontSize: 32,
        textAlign: 'center',
        margin: 20
    },
    section: {
        height: Utils.getWindowHeight()
    }
});
