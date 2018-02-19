import React from 'react';
import {NavigationActions, NavigationParams, StackNavigator} from 'react-navigation';
import {HomePage} from './pages/homePage/homePage';
import {AppStore} from './mobx/stores/appStore';
import {Provider} from 'mobx-react';
import IntroPage from './pages/introPage/introPage';
import {Button, View} from 'react-native';
import Intro2Page from './pages/introPage/intro2Page';
import CalendarPage from './pages/calendarPage/calendarPage';

const PennyApp = StackNavigator(
    {
        HomePage: {screen: HomePage},
        Switcher: {
            screen: (props: NavigationParams) => {
                return (
                    <View>
                        <Button
                            title={'old'}
                            onPress={() =>
                                props.navigation.dispatch(
                                    NavigationActions.reset({
                                        index: 0,
                                        actions: [NavigationActions.navigate({routeName: 'IntroPage'})]
                                    })
                                )
                            }
                        />
                        <Button
                            title={'new'}
                            onPress={() =>
                                props.navigation.dispatch(
                                    NavigationActions.reset({
                                        index: 0,
                                        actions: [NavigationActions.navigate({routeName: 'Intro2Page'})]
                                    })
                                )
                            }
                        />
                        <Button
                            title={'home'}
                            onPress={() =>
                                props.navigation.dispatch(
                                    NavigationActions.reset({
                                        index: 0,
                                        actions: [NavigationActions.navigate({routeName: 'HomePage'})]
                                    })
                                )
                            }
                        />
                        <Button
                            title={'CalendarPage'}
                            onPress={() =>
                                props.navigation.dispatch(
                                    NavigationActions.reset({
                                        index: 0,
                                        actions: [NavigationActions.navigate({routeName: 'CalendarPage'})]
                                    })
                                )
                            }
                        />
                    </View>
                );
            }
        },
        IntroPage: {screen: IntroPage},
        CalendarPage: {screen: CalendarPage},
        Intro2Page: {screen: Intro2Page}
    },
    {
        initialRouteName: 'CalendarPage'
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
