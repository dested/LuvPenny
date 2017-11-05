import {
    StyleSheet
} from 'react-native';

export let homeStyles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },
    personHeader: {
        height: 100,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    homeBody: {
        flex: 1
    },
    bottomLeftIcon:{
        position:'absolute',
        bottom:10,
    },
    bottomRightIcon:{
        position:'absolute',
        bottom:10,
    }
});

export let relationshipStyles = StyleSheet.create({
    body: {
        top: 0,
        bottom: 0,
        width: 100
    },
});

export let calendarScreenStyles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#faf8e0',

        borderRightColor: '#bbb',
        borderRightWidth: StyleSheet.hairlineWidth
    },
});
export let homeScreenStyles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#faf8e0',
    },
});
export let plusScreenStyles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#faf8e0',

        borderLeftColor: '#bbb',
        borderLeftWidth: StyleSheet.hairlineWidth
    },
});
