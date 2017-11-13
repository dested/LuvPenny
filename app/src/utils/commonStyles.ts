import {Platform, StyleSheet} from 'react-native'

export let CommonStyles = {
    card:{
        margin:10,
        borderRadius:10,
        borderWidth:3,
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
        backgroundColor: '#FFFFFF',
    },
    thinFont: {
        fontFamily: Platform.select({
            ios: () => 'HelveticaNeue-Thin',
            android: () => 'sans-serif-thin',
        })()
    },
    thickFont: {
        fontFamily: Platform.select({
            ios: () => 'HelveticaNeue-Thin',
            android: () => 'sans-serif-condensed',
        })()
    }
    //https://github.com/react-native-training/react-native-fonts
};
