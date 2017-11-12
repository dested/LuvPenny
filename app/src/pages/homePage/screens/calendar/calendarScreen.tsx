import moment, {Moment} from "moment";
import React from "react";
import {RefreshControl, ScrollView, View} from 'react-native';
import {styles} from "./styles";
import {CalendarComponent} from "./components/calendar/calendarComponent";

interface State {
    month: number;
    year: number;
}

interface Props {
    refreshing: boolean;
    onRefresh: ()=>void;
}

export class CalendarScreen extends React.Component<Props, State> {

    constructor() {
        super();
        this.state = {month: 11, year: 2017 };
    }

    render() {
        return (
            <View style={styles.body}>
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={this.props.refreshing}
                        onRefresh={() => this.props.onRefresh()}
                    />
                }>
                    <CalendarComponent month={this.state.month} year={this.state.year} updateCalendar={(m, y) => this.setState({month: m, year: y})}/>
                    {
                        [1, 2, 3, 4].map((k, i) => (
                            <View key={i} style={styles.card}/>
                        ))
                    }
                </ScrollView>
            </View>
        );
    }

}
