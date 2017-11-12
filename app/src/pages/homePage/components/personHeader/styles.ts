import {Dimensions, StyleSheet} from "react-native";

let halfScreen = Dimensions.get("screen").width / 2;
export let styles = StyleSheet.create({
    personHeader: {
        height: 90,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    padding: {
        width: halfScreen - 45
    },
    highlight: {
        marginLeft: halfScreen - 45+5,
        marginTop:5,
        width: 80,
        height: 80,
        borderWidth:2,
        borderColor:'#7df0e2',
        borderRadius:45,
        top: 0,
        bottom: 0,
        position: 'absolute',
        opacity: .7,

    }
});

