import React from 'react';
import {StackNavigator} from 'react-navigation';
import {HomePage} from './pages/homePage/homePage';
import {AppStore} from './mobx/stores/appStore';
import {Provider} from 'mobx-react';
import IntroPage from './pages/introPage/homePage';

const PennyApp = StackNavigator(
    {
        HomePage: {screen: HomePage},
        IntroPage: {screen: IntroPage}
    },
    {
        initialRouteName: 'IntroPage'
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
