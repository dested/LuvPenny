import {StyleSheet} from 'react-native';
import {CommonStyles} from '../../../../../../utils/commonStyles';

export let styles = StyleSheet.create({
    calendarBody: {},
    week: {
        flex: 1,
        flexDirection: 'row'
    },
    day: {
        // borderWidth: StyleSheet.hairlineWidth,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#e5e5e5',
        borderRadius: 5,
        margin: 2
    },
    dayCircle: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: 20,
        height: 20,
        backgroundColor: '#FFFFFF'
    },
    dayText: {
        fontSize: 10
    },

    calendarHeader: {
        height: 30,
        flexDirection: 'row'
    },
    monthHeader: {
        // borderWidth: StyleSheet.hairlineWidth,
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    monthHeaderText: {
        fontSize: 15
    },
    calendarHeaderLeft: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    calendarHeaderRight: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    flexPadding: {
        flex: 1
    },
    imageSize: {
        width: 32,
        height: 32
    }
});
