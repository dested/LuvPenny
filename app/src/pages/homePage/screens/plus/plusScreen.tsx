import React from "react";
import {RefreshControl, ScrollView, View} from 'react-native';
import {styles} from "./styles";
import {BottomScrollViewPadding} from "../../components/bottomScrollViewPadding";
import {ScrollViewFader} from "../../components/scrollViewFader";

interface Props {
    refreshing: boolean;
    onRefresh: () => void;
}

export class PlusScreen extends React.Component<Props> {
    private svf: ScrollViewFader;
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
                }>
                    {
                        [1, 2, 3, 4].map((k, i) => (
                            <View key={i} style={styles.card}>

                            </View>
                        ))
                    }
                    <BottomScrollViewPadding/>
                </ScrollView>
                <ScrollViewFader ref={(svf => this.svf = svf)}/>
            </View>
        );
    }
}
