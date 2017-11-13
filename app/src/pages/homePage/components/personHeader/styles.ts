import {Dimensions, StyleSheet} from "react-native";

export let halfScreen = Dimensions.get("screen").width / 2 - 45;
export let styles = StyleSheet.create({
    personHeader: {
        height: 90,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    leftPadding: {
        width: halfScreen
    },
    rightPadding: {
        width: halfScreen - 90
    },
    highlight: {
        marginLeft: halfScreen + 5,
        marginTop: 5,
        width: 80,
        height: 80,
        borderWidth: 2,
        borderColor: '#7df0e2',
        borderRadius: 45,
        top: 0,
        bottom: 0,
        position: 'absolute',
        opacity: .7,

    }
});

