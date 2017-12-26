import {StyleSheet} from 'react-native';
import {CommonStyles} from '../../../../utils/commonStyles';

export let styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'stretch',
        ...CommonStyles.pageBackgroundColor
    },
    card: {
        height: 140,
        ...CommonStyles.card,
        borderColor: '#dde27c'
    },
    topCard: {
        height: 340,
        ...CommonStyles.card,
        borderColor: '#9ce243'
    }
});
