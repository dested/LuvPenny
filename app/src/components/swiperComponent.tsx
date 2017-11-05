import React, {Component} from 'react';
import {
    Animated,
    Dimensions,
    PanResponder, PanResponderInstance,
    View,
} from 'react-native';

interface Props {
    index?: number,
    threshold?: number,
    onPageChange?: (index: number) => void
    onAnimation?: (index: number) => void
}

interface State {
    index: number,
    scrollValue: Animated.Value,
    viewWidth: number
}

export class SwiperComponent extends Component<Props, State> {

    static defaultProps:Props = {
        index: 0,
        threshold: 25,
        onPageChange: (index) => {
        },
        onAnimation: (index) => {
        },
    };
    private _panResponder: PanResponderInstance;

    constructor(props: Props) {
        super(props);

        this.state = {
            index: props.index,
            scrollValue: new Animated.Value(props.index),
            viewWidth: Dimensions.get('window').width,
        };
        this.state.scrollValue.addListener((s)=>{
            this.props.onAnimation(s.value);
        })
    }

    componentWillMount() {
        const release = (e: any, gestureState: any) => {
            const relativeGestureDistance = gestureState.dx / this.state.viewWidth;
            const {vx} = gestureState;

            let newIndex = this.state.index;

            if (relativeGestureDistance < -0.5 || (relativeGestureDistance < 0 && vx <= -0.5)) {
                newIndex = newIndex + 1;
            } else if (relativeGestureDistance > 0.5 || (relativeGestureDistance > 0 && vx >= 0.5)) {
                newIndex = newIndex - 1;
            }

            this.goToPage(newIndex);
        };

        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (e, gestureState) => {
                const {threshold} = this.props;

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
                let offsetX = -dx / this.state.viewWidth + this.state.index;
                if (offsetX < 0 || offsetX > this.props.children.length - 1) return;
                this.state.scrollValue.setValue(offsetX);
            }
        });
    }

    goToPage(pageNumber: number) {
        // Don't scroll outside the bounds of the screens
        pageNumber = Math.max(0, Math.min(pageNumber, this.props.children.length - 1));
        this.setState({
            index: pageNumber
        });

        Animated.timing(this.state.scrollValue, {toValue: pageNumber,duration:200}).start();

        this.props.onPageChange(pageNumber);
    }

    handleLayout(event: any) {
        const {width} = event.nativeEvent.layout;

        if (width) {
            this.setState({viewWidth: width});
        }
    }

    render() {
        const scenes = React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {style: [child.props.style, {flex: 1}]});
        });

        const translateX = this.state.scrollValue.interpolate({
            inputRange: [0, 1], outputRange: [0, -this.state.viewWidth]
        });

        const sceneContainerStyle = {
            width: this.state.viewWidth * this.props.children.length,
            flex: 1,
            flexDirection: 'row',
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