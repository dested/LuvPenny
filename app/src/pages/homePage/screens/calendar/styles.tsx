import {StyleSheet} from 'react-native';
import {CommonStyles} from '../../../../utils/commonStyles';

export let styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'stretch',
        ...CommonStyles.pageBackgroundColor,
        borderRightWidth: StyleSheet.hairlineWidth
    },
    calendar: {
        height: 250,
        margin: 4,
        borderRadius: 15,
        backgroundColor: '#fafac4'
    },
    calendarCard: {
        margin: 10,
        padding: 10,
        ...CommonStyles.card
    },
    card: {
        height: 80,
        ...CommonStyles.card,
        borderColor: '#e3cfd1'
    }
});
