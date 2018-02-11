import React, {Component, ReactChild} from 'react';
import {
    Animated,
    Dimensions,
    GestureResponderEvent,
    LayoutChangeEvent,
    PanResponder,
    PanResponderGestureState,
    PanResponderInstance,
    View,
    ViewProperties
} from 'react-native';

interface Props {
    startPage: number;
    onPageChange?: (page: number) => void;
    onAnimation?: (page: number) => void;
    children?: ReactChild[];
}

interface State {
    page: number;
    scrollValue: Animated.Value;
    viewWidth: number;
}

export class SwiperComponent extends Component<Props, State> {
    private _panResponder: PanResponderInstance;

    constructor(props: Props) {
        super(props);

        this.state = {
            page: props.startPage,
            scrollValue: new Animated.Value(props.startPage),
            viewWidth: Dimensions.get('window').width
        };
        this.state.scrollValue.addListener(s => {
            this.props.onAnimation(s.value);
        });
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.onPageChange(this.props.startPage);
        });
    }

    componentWillMount() {
        const release = (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
            const relativeGestureDistance = gestureState.dx / this.state.viewWidth;
            const {vx} = gestureState;

            let newPage = this.state.page;

            if (relativeGestureDistance < -0.5 || (relativeGestureDistance < 0 && vx <= -0.5)) {
                newPage = newPage + 1;
            } else if (relativeGestureDistance > 0.5 || (relativeGestureDistance > 0 && vx >= 0.5)) {
                newPage = newPage - 1;
            }

            this.gotoPage(newPage);
        };

        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (e, gestureState) => {
                const threshold = 25;

                // Claim responder if it's a horizontal pan
                if (Math.abs(gestureState.dx) > Math.abs(gestureState.dy)) {
                    return true;
                }

                // and only if it exceeds the threshold
                if (threshold - Math.abs(gestureState.dx) > 0) {
                    return false;
                }
            },

            // Touch is released, scroll to the one that you're closest to
            onPanResponderRelease: release,
            onPanResponderTerminate: release,

            // Dragging, move the view with the touch
            onPanResponderMove: (e, gestureState) => {
                let dx = gestureState.dx;
                let offsetX = -dx / this.state.viewWidth + this.state.page;
                if (offsetX < 0 || offsetX > this.props.children.length - 1) return;
                this.state.scrollValue.setValue(offsetX);
            }
        });
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        if (nextState.page !== this.state.page) return false;
        /*        if (this.shallowEqualObjects(this.props, nextProps)) {
            return false;
        }*/
        console.log(nextProps, this.props);
        return true;
    }

    gotoPage(pageNumber: number) {
        // Don't scroll outside the bounds of the screens
        pageNumber = Math.max(0, Math.min(pageNumber, this.props.children.length - 1));
        this.setState({
            page: pageNumber
        });

        Animated.timing(this.state.scrollValue, {
            toValue: pageNumber,
            duration: 200,
            useNativeDriver: true
        }).start();

        this.props.onPageChange(pageNumber);
    }

    handleLayout(event: LayoutChangeEvent) {
        const {width} = event.nativeEvent.layout;

        if (width) {
            this.setState({viewWidth: width});
        }
    }

    render() {
        console.log('rendewr');
        const scenes = React.Children.map(this.props.children, (child: any) => {
            return React.cloneElement(child, {style: [child.props.style, {flex: 1}]});
        });

        const translateX = this.state.scrollValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -this.state.viewWidth]
        });

        const sceneContainerStyle = {
            width: this.state.viewWidth * this.props.children.length,
            flex: 1,
            flexDirection: 'row'
        };
        return (
            <View onLayout={this.handleLayout.bind(this)} style={{flex: 1, overflow: 'hidden'}}>
                <Animated.View
                    {...this._panResponder.panHandlers}
                    style={[sceneContainerStyle, {transform: [{translateX}]}]}
                >
                    {scenes}
                </Animated.View>
            </View>
        );
    }
}
