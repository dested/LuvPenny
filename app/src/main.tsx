import React from 'react';
import {StackNavigator} from 'react-navigation';
import {HomePage} from './pages/homePage/homePage';
import {AppStore} from './mobx/stores/appStore';
import {Provider} from 'mobx-react';

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

const rootStores = {
    [AppStore.key]: new AppStore()
};

export default () => {
    return (
        <Provider {...rootStores}>
            <PennyApp />
        </Provider>
    );
};
