import React from 'react';
import {Text} from 'react-native';

export let Penny: React.SFC<{she?: boolean}> = props => {
    return <Text style={{fontWeight: '800', color: 'red'}}>{props.she ? 'She' : 'Penny'}</Text>;
};
