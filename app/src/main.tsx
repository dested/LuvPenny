import React from 'react';
import {StackNavigator} from 'react-navigation';
import {HomePage} from './pages/homePage/homePage';

const PennyApp = StackNavigator(
    {
        HomePage: {
            screen: HomePage
        }
    },
    {
        initialRouteName: 'HomePage'
    }
);

export default () => {
    return <PennyApp />;
};
