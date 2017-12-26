import {StyleSheet} from 'react-native';
import {CommonStyles} from '../../../../../../utils/commonStyles';

export let styles = StyleSheet.create({
    body: {
        height: 90,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    image: {},
    imageBody: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        paddingTop: 5,
        fontSize: 10,
        ...CommonStyles.thickFont
    }
});
