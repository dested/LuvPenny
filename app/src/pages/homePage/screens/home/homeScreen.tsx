import React from "react";
import {styles} from "./styles";
import {BottomScrollViewPadding} from "../../components/bottomScrollViewPadding";
import {RefreshControl, ScrollView, View} from "react-native";
import {ScrollViewFader} from "../../components/scrollViewFader";


interface Props {
    refreshing: boolean;
    onRefresh: () => void;
}

interface State {
}

export class HomeScreen extends React.Component<Props, State> {
    private svf: ScrollViewFader;

    constructor(props: Props, context: any) {
        super(props, context);
        this.state = {};
    }


    render() {
        return (
            <View style={styles.body}>
                <ScrollView
                    onScroll={(r) => this.svf.handleScroll(r)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.refreshing}
                            onRefresh={() => this.props.onRefresh()}
                        />
                    }
                >
                    <View style={styles.topCard}></View>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((k, i) => (
                            <View key={i} style={styles.card}></View>
                        ))
                    }
                    <BottomScrollViewPadding/>
                </ScrollView>
                <ScrollViewFader ref={(svf => this.svf = svf)}/>
            </View>
        );
    }
}
