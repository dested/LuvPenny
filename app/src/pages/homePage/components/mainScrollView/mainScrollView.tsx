import React, {ReactChild} from "react";
import {Animated, NativeScrollEvent, NativeSyntheticEvent, RefreshControl, ScrollView, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {styles} from "../../screens/calendar/styles";
import {BottomScrollViewPadding} from "../bottomScrollViewPadding";
import {ScrollViewFader} from "../scrollViewFader";

interface State {
    scrollPosition: Animated.Value;
}

interface Props {
    children: any;
    onRefresh: () => void;
    refreshing: boolean;
}

const Aux = (props: any) => props.children;

export class MainScrollView extends React.Component<Props, State> {
    private svf: ScrollViewFader;

    constructor(props: Props, context: any) {
        super(props, context);
        this.state = {
            scrollPosition: new Animated.Value(0),
        };
    }

    render() {
        return (
            <Aux>
                <ScrollView
                    onScroll={(r) => this.svf.handleScroll(r)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.refreshing}
                            onRefresh={() => this.props.onRefresh()}
                        />
                    }>
                    {this.props.children}
                    <BottomScrollViewPadding/>
                </ScrollView>
                <ScrollViewFader ref={(svf => this.svf = svf)}/>
            </Aux>
        )
    }
}
