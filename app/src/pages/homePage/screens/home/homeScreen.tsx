import React from "react";
import {RefreshControl, ScrollView, View} from 'react-native';
import {styles} from "./styles";
import {CalendarComponent} from "../calendar/components/calendar/calendarComponent";
import moment from "moment";


interface Props {
    refreshing: boolean;
    onRefresh: ()=>void;
}

export class HomeScreen extends React.Component<Props> {

    render() {
        return (
            <View style={styles.body}>
                <ScrollView  refreshControl={
                    <RefreshControl
                        refreshing={this.props.refreshing}
                        onRefresh={() => this.props.onRefresh()}
                    />
                }>
                    {
                        [1, 2, 3, 4, 5, 6].map((k, i) => (
                            <View key={i} style={styles.card}></View>
                        ))
                    }

                </ScrollView>
            </View>
        );
    }
}
