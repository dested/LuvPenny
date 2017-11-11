import React from "react";
import {ScrollView, View} from 'react-native';
import {styles} from "./styles";
import {CalendarComponent} from "../calendar/components/calendar/calendarComponent";
import moment from "moment";

export class HomeScreen extends React.Component<{}> {
    render() {
        return (
            <View style={styles.body}>
                <ScrollView>
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
