import React from 'react';
import {View} from 'react-native';


interface Props {

}

export let Container: React.SFC<Props> = (props) => {
    return (
        <View style={{
            padding: 10,
            flex: 1,
            backgroundColor: "transparent"
        }}>
            {props.children}
        </View>
    );
};