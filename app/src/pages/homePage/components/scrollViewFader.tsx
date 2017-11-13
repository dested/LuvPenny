import React from "react";
import {Animated, NativeScrollEvent, NativeSyntheticEvent, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";

interface Props {
    scrollPosition: Animated.Value;
}

export class ScrollViewFader extends React.Component<Props> {

    constructor(props: Props, context: any) {
        super(props, context);
        this.state = {
        };
    }


    shouldComponentUpdate() {
        return false;
    }

    render() {
        const fadeMove = this.props.scrollPosition.interpolate({
            inputRange: [0, 100, 10000],
            outputRange: [-101, 0, 0]
        });

        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 100,
                    transform: [{translateY: fadeMove}],
                }}
            >
                <LinearGradient
                    style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}
                    colors={['rgba(255,255,255,1)', 'rgba(255,255,255,.5)','rgba(255,255,255,0)']}
                    start={{x: .5, y: 0}}
                    end={{x: .5, y: 1}}
                    locations={[0.5,.8,1]}
                />
            </Animated.View>
        )
    }
}
