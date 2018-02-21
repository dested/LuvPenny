import React from 'react';
import {View} from 'react-native';

interface Props {
    size: number;
}

export let VPadding: React.SFC<Props> = props => {
    return <View style={{height: props.size}} />;
};

export let HPadding: React.SFC<Props> = props => {
    return <View style={{width: props.size}} />;
};
