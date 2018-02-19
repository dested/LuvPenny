import React, {Component} from 'react';
import {Animated, PanResponder, PanResponderInstance, StyleSheet, View} from 'react-native';
import {Utils} from '../utils/utils';
import LinearGradient from 'react-native-linear-gradient';

interface State {
    indexAnimator: Animated.Value;
}

interface Props {
    colors: string[];
    onIndexChange: (index: number) => void;
    canReverse: boolean;
    canProgress: boolean;
    indexAnimator?: (animator: Animated.Value, range: number) => void;
    pageIndex: number;
}

export default class HorizontalFullPan extends Component<Props, State> {
    panResponder: PanResponderInstance;
    canPan: boolean;

    constructor(props: Props) {
        super(props);
        this.canPan = true;

        this.state = {
            indexAnimator: new Animated.Value(props.pageIndex)
        };
    }

    componentDidMount() {
        if (this.props.indexAnimator) {
            this.props.indexAnimator(this.state.indexAnimator, React.Children.count(this.props.children));
        }
    }

    componentWillMount(): void {
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dx) > 0,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => Math.abs(gestureState.dx) > 0,
            onPanResponderMove: (evt, gestureState) => {
                if (this.canPan) {
                    if (gestureState.dx < -15 && this.props.canProgress) {
                        if (this.props.pageIndex < React.Children.count(this.props.children) - 1) {
                            this.progressIndex(+1);
                        }
                    }
                    if (gestureState.dx > 15 && this.props.canReverse) {
                        if (this.props.pageIndex > 0) {
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

    public progressIndex(amount: number) {
        this.setState(
            (prev, props) => {
                Animated.timing(this.state.indexAnimator, {
                    toValue: props.pageIndex + amount,
                    duration: 500,
                    useNativeDriver: true
                }).start();
                return {...prev, canPan: false, index: props.pageIndex + amount};
            },
            () => this.props.onIndexChange(this.props.pageIndex + amount)
        );
        this.canPan = false;
    }

    render() {
        let totalChildren = React.Children.count(this.props.children);
        let range = Utils.range(totalChildren);
        const scrollPosition = this.state.indexAnimator.interpolate({
            inputRange: range,
            outputRange: range.map(a => -a * Utils.getWindowWidth())
        });

        return (
            <View
                style={{left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'row'}}
                {...this.panResponder.panHandlers}
            >
                {React.Children.map(this.props.children, (item, index) => (
                    <Animated.View
                        key={index}
                        style={[
                            {
                                transform: [
                                    {
                                        translateX: scrollPosition
                                    }
                                ]
                            }
                        ]}
                    >
                        <LinearGradient
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            colors={this.getColors(index, totalChildren)}
                            locations={[0.85, 1]}
                            style={styles.section}
                        >
                            {item}
                        </LinearGradient>
                    </Animated.View>
                ))}
            </View>
        );
    }

    private getColors(index: number, total: number) {
        let getIndex = (i: number) => i % this.props.colors.length;
        return [
            this.props.colors[getIndex(index)],
            index === total - 1
                ? this.props.colors[getIndex(index)]
                : this.props.colors[getIndex(index + 1)]
                  ? this.props.colors[getIndex(index + 1)]
                  : this.props.colors[getIndex(index)]
        ];
    }
}

let styles = StyleSheet.create({
    outer: {
        height: '100%',
        width: '100%'
    },
    section: {
        height: Utils.getWindowHeight(),
        width: Utils.getWindowWidth()
    }
});
