import React from "react";
import {RefreshControl, ScrollView, View} from 'react-native';
import {styles} from "./styles";

interface Props {
    refreshing: boolean;
    onRefresh: () => void;
}

export class PlusScreen extends React.Component<Props> {
    render() {
        return (
            <View style={styles.body}>
                <ScrollView refreshControl={
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

                </ScrollView>
            </View>
        );
    }
}
