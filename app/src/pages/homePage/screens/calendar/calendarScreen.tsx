import React from "react";
import {ScrollView, View} from 'react-native';
import {styles} from "./styles";

export class CalendarScreen extends React.Component<{}> {
    render() {
        return (
            <View style={styles.body}>
                <ScrollView>
                    <View style={styles.calendar}></View>
                    {
                        [1,2,3,4].map((k,i)=>(
                            <View key={i} style={styles.card}></View>
                        ))
                    }
                </ScrollView>
            </View>
        );
    }
}
