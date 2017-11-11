import {StyleSheet} from "react-native";
import {CommonStyles} from "../../../../../../utils/commonStyles";


let dayHeight = 50;
export let styles = StyleSheet.create({
    body: {
        height: dayHeight * 5,
    },
    week: {
        flex: 1,
        flexDirection: 'row',
    },
    day: {
        // borderWidth: StyleSheet.hairlineWidth,
        flex: 1,
        justifyContent: 'center'
    },
    dayCircle: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: 20,
        height: 20,
        backgroundColor: 'white'
    },
    dayText: {
        fontSize: 10,
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
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    calendarHeaderRight: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
