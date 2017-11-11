import moment, {Moment} from "moment";
import React from "react";
import {ScrollView, View} from 'react-native';
import {styles} from "./styles";
import {CalendarComponent} from "./components/calendar/calendarComponent";

export class CalendarScreen extends React.Component<{}, { month: number, year: number }> {

    constructor() {
        super();
        this.state = {month: 11, year: 2017};
    }

    render() {
        return (
            <View style={styles.body}>
                <ScrollView>
                    <CalendarComponent month={this.state.month} year={this.state.year} updateCalendar={(m, y) => this.setState({month: m, year: y})}/>
                    {
                        [1, 2, 3, 4].map((k, i) => (
                            <View key={i} style={styles.card}></View>
                        ))
                    }
                </ScrollView>
            </View>
        );
    }
}
