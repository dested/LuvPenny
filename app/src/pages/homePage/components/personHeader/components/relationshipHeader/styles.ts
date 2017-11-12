import {StyleSheet} from "react-native";
import {CommonStyles} from "../../../../../../utils/commonStyles";


export let styles = StyleSheet.create({
    body: {
        height:90,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#ffffff'
    },
    image: {
        borderRadius: 25,
        height: 50,
        width: 50,
    },
    text: {
        paddingTop: 5,
        fontSize: 10,
        ...CommonStyles.thickFont,
    },
});
