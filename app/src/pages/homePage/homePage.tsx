import React, {Component} from 'react';
import {
    Button, Image,
    Platform, ScrollView,
    Text,
    View, StyleSheet, TouchableWithoutFeedback, Dimensions, Animated
} from 'react-native';
import {hideHeader, Navigation} from "../../utils/navigationUtils";
import {SwiperComponent} from "../../components/swiperComponent";
import {CalendarScreen} from "./screens/calendar/calendarScreen";
import {HomeScreen} from "./screens/home/homeScreen";
import {PlusScreen} from "./screens/plus/plusScreen";
import {IconAnimator} from "./components/iconAnimator/iconAnimator";
import {PersonHeader} from "./components/personHeader/personHeader";
import {Relationship} from "../../models/member";
import {styles} from "./styles";


interface HomePageState {
    currentPage: number,
    relationships: Relationship[],
}

@Navigation({
    ...hideHeader
})
export class HomePage extends Component<{}, HomePageState> {
    private swiper: SwiperComponent;
    private iconAnimator: IconAnimator;

    constructor() {
        super();
        this.state = {
            currentPage: 1,

            relationships: [
                {name: 'Mike', icon: '', color: 'yellow'},
                {name: 'Chris', icon: '', color: 'green'},
                {name: 'Mike', icon: '', color: 'yellow'},
                {name: 'Chris', icon: '', color: 'green'},
                {name: 'Mike', icon: '', color: 'yellow'},
                {name: 'Chris', icon: '', color: 'green'},
                {name: 'Mike', icon: '', color: 'yellow'},
                {name: 'Chris', icon: '', color: 'green'},
                {name: 'Mike', icon: '', color: 'yellow'},
                {name: 'Chris', icon: '', color: 'green'},
            ]
        };
    }

    render() {
        return (
            <View style={styles.body}>
                <PersonHeader
                    relationships={this.state.relationships}
                />
                <SwiperComponent
                    ref={r => this.swiper = r}
                    index={1}
                    onAnimation={(index) => this.animationIndex(index)}
                    onPageChange={(index) => this.setState({currentPage: index})}
                >
                    <CalendarScreen/>
                    <HomeScreen/>
                    <PlusScreen/>
                </SwiperComponent>

                <IconAnimator
                    ref={r => this.iconAnimator = r}
                    currentPage={this.state.currentPage}
                    gotoPage={(page) => this.swiper.gotoPage(page)}
                />

            </View>
        );
    }

    private animationIndex(index: number) {
        this.iconAnimator.animationIndex(index);
    }
}
