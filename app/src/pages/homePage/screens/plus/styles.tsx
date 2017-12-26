import {StyleSheet} from 'react-native';
import {CommonStyles} from '../../../../utils/commonStyles';

export let styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'stretch',
        ...CommonStyles.pageBackgroundColor,
        borderLeftWidth: StyleSheet.hairlineWidth
    },
    card: {
        height: 160,
        ...CommonStyles.card,
        borderColor: '#ACFACA'
    }
});
