import React from "react";
import {ScrollView, View} from 'react-native';
import {styles} from "./styles";

export class PlusScreen extends React.Component<{}> {
    render() {
        return (
            <View style={styles.body}>
                <ScrollView>
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
