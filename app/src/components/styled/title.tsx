import React from 'react';
import {Text} from 'react-native';

interface Props {}

export let Title: React.SFC<Props> = props => {
    return (
        <Text
            style={{
                fontSize: 26,
                padding: 12
            }}
        >
            {props.children}
        </Text>
    );
};
