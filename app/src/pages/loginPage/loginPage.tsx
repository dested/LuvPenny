import React, {Component} from 'react';
import {
    Platform,
    Text,
    View
} from 'react-native';
import {Navigation} from "../../utils/navigationUtils";
import {MemberDataService} from "../../dataServices/memberDataService";
import {Member} from "../../../../common/http";
import styles from './styles'
import LinearGradient from "react-native-linear-gradient";

@Navigation({
    title: "Login"
})
export class LoginPage extends Component<{}, { member: Member|null }> {
    constructor() {
        super();
        this.state = {member: null};
    }

    async componentDidMount() {
        let member = await MemberDataService.getMember();
        await this.timeout(1000);
        await this.setState({member: member})
    }

    timeout(timeout:number){
        return new Promise((res)=>{
            setTimeout(()=>{
                res();
            },timeout);
        })
    }


    render() {
        return (

            <View style={styles.container}>
                <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
                    <Text style={styles.buttonText}>
                        Sign in with Facebook
                    </Text>
                </LinearGradient>


                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit App.js
                    {this.state.member?this.state.member.name:"No member"}
                </Text>
                <Text style={styles.instructions}>
                    {Platform.select({
                        ios: 'Press Cmd+R to reload,\n' +
                        'Cmd+D or shake for dev menu',
                        android: 'Double tap R on your keyboard to reload,\n' +
                        'Shake or press menu button for dev menu',
                    })}
                </Text>
            </View>
        );
    }
}
