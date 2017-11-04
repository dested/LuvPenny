import React from 'react';
import {StackNavigator} from "react-navigation";
import {hideHeader} from "./utils/navigationUtils";
import {LoginPage} from "./pages/loginPage/loginPage";

const PennyApp = StackNavigator({
    LoginPage: {
        // ...hideHeader,
        screen: LoginPage
    },
})

export default () => {
    return (
        <PennyApp/>
    )
}