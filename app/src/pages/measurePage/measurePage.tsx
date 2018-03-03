import React, {Component} from 'react';
import {Animated, Image, PanResponder, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {hideHeader, Navigation} from 'src/utils/navigationUtils';
import {Utils} from '../../utils/utils';
import PopOutScrollView from '../../components/popoutScrollView';
import {Assets} from '../../assets';
import {Card} from '../../components/styled/card';

interface State {
    selectedItem: { index: number } | null;
    selectedItemPosition: { x: number; y: number };
    selectedItemAnimate: Animated.Value | null;
}

interface Props {
}

@Navigation({
    ...hideHeader
})
export default class MeasurePage extends Component<Props, State> {
    private popout: PopOutScrollView;

    constructor(props: Props) {
        super(props);

        this.state = {
            selectedItem: null,
            selectedItemPosition: null,
            selectedItemAnimate: null
        };
    }

    render() {
        return (
            <View style={styles.body}>
                <PopOutScrollView ref={r => (this.popout = r)}>
                    {Utils.range(10).map(m => (
                        <View key={m} style={{backgroundColor: 'transparent'}}>
                            <Card style={{height: 90}}>
                                <TouchableOpacity
                                    style={{flex: 1, flexDirection: 'row'}}
                                    onPress={async () => {
                                        let result = await this.popout.getPosition(m);
                                        this.setState(
                                            prev => {
                                                return {
                                                    ...prev,
                                                    selectedItem: {index: m},
                                                    selectedItemPosition: {x: 0, y: result.y},
                                                    selectedItemAnimate: new Animated.Value(0)
                                                };
                                            },
                                            () => {
                                                Animated.timing(this.state.selectedItemAnimate, {
                                                    toValue: 1,
                                                    duration: 1000,
                                                    useNativeDriver: true
                                                }).start();
                                            }
                                        );
                                    }}
                                >
                                    {this.state.selectedItem && this.state.selectedItem.index === m ? (
                                        <View style={{width: 90, height: 90, borderWidth: 2, borderColor: 'black'}}/>
                                    ) : (
                                        <Image
                                            source={Assets.elements.penny.penny}
                                            style={{width: 90, height: 90, borderWidth: 2, borderColor: 'black'}}
                                        />
                                    )}
                                    <View style={{flex: 1, flexDirection: 'column'}}>
                                        {this.state.selectedItem && this.state.selectedItem.index === m ? (
                                            <View style={{height: 30}}/>
                                        ) : (
                                            <Text
                                                style={{
                                                    height: 30,
                                                    color: 'white',
                                                    textAlignVertical: 'center',
                                                    textAlign: 'center',
                                                    backgroundColor: 'rgba(24,24,24,.6)'
                                                }}
                                            >
                                                This is a title
                                            </Text>
                                        )}
                                        <Text style={{flex: 1}}>
                                            This is a description. This is a description. This is a description. This is
                                            a description. This is a description. This is a description. This is a
                                            description. This is a description.
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </Card>
                        </View>
                    ))}
                </PopOutScrollView>
                {this.state.selectedItem && this.renderPopupItem()}
            </View>
        );
    }

    private renderPopupItem() {
        let lastValue = 0;
        const imageSize = 90;
        const finalScale = 2;
        const panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                let value = 1 - gestureState.dy / (imageSize * finalScale + 30);
                lastValue = value;
                this.state.selectedItemAnimate.setValue(value);
            },
            onPanResponderRelease: () => {
                if (lastValue < 0.7) {
                    Animated.timing(this.state.selectedItemAnimate, {
                        duration: 300,
                        toValue: 0,
                        useNativeDriver: true
                    }).start(() => {
                        this.setState(prev => ({
                            ...prev,
                            selectedItem: null,
                            selectedItemPosition: null,
                            selectedItemAnimate: null
                        }));
                    });
                } else {
                    Animated.timing(this.state.selectedItemAnimate, {
                        duration: 300,
                        toValue: 1,
                        useNativeDriver: true
                    }).start();
                }
            }
        });

        let imageX = this.state.selectedItemAnimate.interpolate({
            inputRange: [0, 1],
            outputRange: [this.state.selectedItemPosition.x, Utils.getWindowWidth() / 2 - imageSize / 2],
            extrapolate: 'clamp'
        });

        let imageY = this.state.selectedItemAnimate.interpolate({
            inputRange: [0, 1],
            outputRange: [this.state.selectedItemPosition.y, imageSize / finalScale],
            extrapolate: 'clamp'
        });

        let headerX = this.state.selectedItemAnimate.interpolate({
            inputRange: [0, 1],
            outputRange: [this.state.selectedItemPosition.x, 0],
            extrapolate: 'clamp'
        });
        let headerY = this.state.selectedItemAnimate.interpolate({
            inputRange: [0, 1],
            outputRange: [this.state.selectedItemPosition.y, 0],
            extrapolate: 'clamp'
        });

        let headerLabelX = this.state.selectedItemAnimate.interpolate({
            inputRange: [0, 1],
            outputRange: [this.state.selectedItemPosition.x + imageSize + 2, 0],
            extrapolate: 'clamp'
        });
        let headerLabelY = this.state.selectedItemAnimate.interpolate({
            inputRange: [0, 1],
            outputRange: [this.state.selectedItemPosition.y, imageSize * finalScale],
            extrapolate: 'clamp'
        });

        let bottomX = this.state.selectedItemAnimate.interpolate({
            inputRange: [0, 1],
            outputRange: [this.state.selectedItemPosition.x, 0],
            extrapolate: 'clamp'
        });
        let bottomY = this.state.selectedItemAnimate.interpolate({
            inputRange: [0, 1],
            outputRange: [this.state.selectedItemPosition.y, 0],
            extrapolate: 'clamp'
        });

        let imageScale = this.state.selectedItemAnimate.interpolate({
            inputRange: [0, 1],
            outputRange: [1, finalScale],
            extrapolate: 'clamp'
        });

        return (
            <React.Fragment>
                <Animated.View
                    style={{
                        position: 'absolute',
                        transform: [{translateX: bottomX}, {translateY: bottomY}],
                        opacity: this.state.selectedItemAnimate,
                        width: Utils.getWindowWidth(),
                        height: Utils.getWindowHeight(),
                        backgroundColor: 'white'
                    }}
                />
                <Animated.View
                    {...panResponder.panHandlers}
                    style={{
                        position: 'absolute',
                        transform: [{translateX: headerX}, {translateY: headerY}],
                        opacity: this.state.selectedItemAnimate,
                        width: Utils.getWindowWidth(),
                        height: imageSize * finalScale + 30,
                        backgroundColor: 'blue'
                    }}
                />
                <Animated.Text
                    pointerEvents={'none'}
                    style={{
                        height: 30,
                        color: 'white',
                        textAlignVertical: 'center',
                        textAlign: 'center',
                        backgroundColor: 'rgba(24,24,24,.6)',
                        position: 'absolute',
                        transform: [{translateX: headerLabelX}, {translateY: headerLabelY}],
                        opacity: 1,
                        width: Utils.getWindowWidth()
                    }}
                >
                    This is a title
                </Animated.Text>
                <Animated.Image
                    source={Assets.elements.penny.penny}
                    style={{
                        backgroundColor: 'transparent',
                        position: 'absolute',
                        transform: [
                            {translateX: imageX},
                            {translateY: imageY},
                            {scaleX: imageScale},
                            {scaleY: imageScale}
                        ],

                        width: imageSize,
                        height: imageSize
                    }}
                />
            </React.Fragment>
        );
    }
}

let styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#cccccc'
    }
});
