import React, {Component} from 'react';
import {Animated, Dimensions, Image, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {Assets} from '../../../../assets';

interface Props {
    gotoPage: (page: number) => void;
}

interface State {
    bottomLeftIconOpacity: Animated.Value;
    bottomRightIconOpacity: Animated.Value;
    currentPage: number;
    bottomLeftIconPosition: Animated.Value;
    bottomRightIconPosition: Animated.Value;
}

export class IconAnimator extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            bottomLeftIconPosition: new Animated.Value(0),
            bottomRightIconPosition: new Animated.Value(1),

            bottomLeftIconOpacity: new Animated.Value(1),
            bottomRightIconOpacity: new Animated.Value(1),
            currentPage: 1
        };
    }

    setPage(page: number) {
        this.setState({currentPage: page});
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        const bottomLeftIconPosition = this.state.bottomLeftIconPosition.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [-32 - 10, 10, Dimensions.get('screen').width - 32 - 10]
        });

        const bottomRightIconPosition = this.state.bottomRightIconPosition.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [10, Dimensions.get('screen').width - 32 - 10, Dimensions.get('screen').width]
        });

        const bottomLeftIconOpacity = this.state.bottomRightIconOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        });

        const bottomRightIconOpacity = this.state.bottomLeftIconOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        });

        const bottomLeftIconOpacityInverted = this.state.bottomRightIconOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
        });

        const bottomRightIconOpacityInverted = this.state.bottomLeftIconOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
        });

        return (
            <View>
                <Animated.View
                    style={[
                        styles.bottomLeftIcon,
                        {
                            opacity: bottomLeftIconOpacity,
                            transform: [
                                {
                                    translateX: bottomLeftIconPosition
                                }
                            ]
                        }
                    ]}
                >
                    <TouchableWithoutFeedback onPress={() => this.leftIconTap()}>
                        <Image style={{width: 32, height: 32}} source={Assets.icons.calendar} />
                    </TouchableWithoutFeedback>
                </Animated.View>

                <Animated.View
                    style={[
                        styles.bottomLeftIcon,
                        {
                            opacity: bottomLeftIconOpacityInverted,
                            transform: [
                                {
                                    translateX: bottomLeftIconPosition
                                }
                            ]
                        }
                    ]}
                >
                    <TouchableWithoutFeedback onPress={() => this.leftIconTap()}>
                        <Image style={{width: 32, height: 32}} source={Assets.icons.home} />
                    </TouchableWithoutFeedback>
                </Animated.View>

                <Animated.View
                    style={[
                        styles.bottomRightIcon,
                        {
                            opacity: bottomRightIconOpacity,
                            transform: [
                                {
                                    translateX: bottomRightIconPosition
                                }
                            ]
                        }
                    ]}
                >
                    <TouchableWithoutFeedback onPress={() => this.rightIconTap()}>
                        <Image style={{width: 32, height: 32}} source={Assets.icons.star} />
                    </TouchableWithoutFeedback>
                </Animated.View>

                <Animated.View
                    style={[
                        styles.bottomRightIcon,
                        {
                            opacity: bottomRightIconOpacityInverted,
                            transform: [
                                {
                                    translateX: bottomRightIconPosition
                                }
                            ]
                        }
                    ]}
                >
                    <TouchableWithoutFeedback onPress={() => this.rightIconTap()}>
                        <Image style={{width: 32, height: 32}} source={Assets.icons.home} />
                    </TouchableWithoutFeedback>
                </Animated.View>
            </View>
        );
    }

    private leftIconTap() {
        switch (this.state.currentPage) {
            case 0:
                this.props.gotoPage(1);
                break;
            case 1:
                this.props.gotoPage(0);
                break;
        }
    }

    private rightIconTap() {
        switch (this.state.currentPage) {
            case 1:
                this.props.gotoPage(2);
                break;
            case 2:
                this.props.gotoPage(1);
                break;
        }
    }

    animationIndex(index: number) {
        if (index === 1) {
            this.state.bottomLeftIconOpacity.setValue(1);
            this.state.bottomRightIconOpacity.setValue(1);
            this.state.bottomLeftIconPosition.setValue(0);
            this.state.bottomRightIconPosition.setValue(1);
        }
        if (index < 1) {
            this.state.bottomLeftIconPosition.setValue(1 - index);
            this.state.bottomRightIconPosition.setValue(1 + (1 - index));

            this.state.bottomRightIconOpacity.setValue(index);
            this.state.bottomLeftIconOpacity.setValue(1);
        }
        if (index > 1) {
            this.state.bottomLeftIconPosition.setValue(1 - index);
            this.state.bottomRightIconPosition.setValue(1 - (index - 1));

            this.state.bottomLeftIconOpacity.setValue(1 - (index - 1));
            this.state.bottomRightIconOpacity.setValue(1);
        }
    }
}

let styles = StyleSheet.create({
    bottomLeftIcon: {
        position: 'absolute',
        bottom: 10
    },
    bottomRightIcon: {
        position: 'absolute',
        bottom: 10
    }
});
