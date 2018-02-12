import React from 'react';
import {StackNavigator} from 'react-navigation';
import {HomePage} from './pages/homePage/homePage';
import {AppStore} from './mobx/stores/appStore';
import {Provider} from 'mobx-react';
import IntroPage from './pages/introPage/introPage';
import {UIManager} from 'react-native';

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

// UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
export default () => {
    return (
        <Provider {...rootStores}>
            <PennyApp />
        </Provider>
    );
};
