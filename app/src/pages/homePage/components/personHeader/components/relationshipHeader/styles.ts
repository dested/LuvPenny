import {StyleSheet} from "react-native";
import {CommonStyles} from "../../../../../../utils/commonStyles";


export let styles = StyleSheet.create({
    body: {
        top: 0,
        bottom: 0,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 50,
        borderRadius: 25,
        width: 50,
    },
    text: {
        paddingTop: 5,
        fontSize: 10,
        ...CommonStyles.thickFont,
    },
});
