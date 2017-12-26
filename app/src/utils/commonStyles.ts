import {Platform, StyleSheet, ViewStyle} from 'react-native';


export let cardStyles = (cardElevation: number): ViewStyle => (
    {
        borderRadius: 10,
        margin: 10,
        ...Platform.select({
            android: {
                elevation: cardElevation
            } as ViewStyle,
            ios: {
                shadowOffset: {
                    width: 0,
                    height: cardElevation
                },
                shadowRadius: cardElevation,
                shadowOpacity: 0.24
            } as ViewStyle
        })
    }
);

export let CommonStyles = {
    card: {
        ...cardStyles(2)
    },
    centerContent: StyleSheet.create({
        centerContent: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }
    }),
    baseTextColor: {
        color: '#223843'
    },
    pageBackgroundColor: {
        backgroundColor: '#FFFFFF'
    },
    thinFont: {
        fontFamily: Platform.select({
            ios: () => 'HelveticaNeue-Thin',
            android: () => 'sans-serif-thin'
        })()
    },
    thickFont: {
        fontFamily: Platform.select({
            ios: () => 'HelveticaNeue-Thin',
            android: () => 'sans-serif-condensed'
        })()
    }
    //https://github.com/react-native-training/react-native-fonts
};
