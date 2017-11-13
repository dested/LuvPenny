import moment, {Moment} from "moment";
import React from "react";
import {RefreshControl, ScrollView, View} from 'react-native';
import {styles} from "./styles";
import {CalendarComponent} from "./components/calendar/calendarComponent";
import {BottomScrollViewPadding} from "../../components/bottomScrollViewPadding";
import {ScrollViewFader} from "../../components/scrollViewFader";

interface State {
    month: number;
    year: number;
}

interface Props {
    refreshing: boolean;
    onRefresh: ()=>void;
}

export class CalendarScreen extends React.Component<Props, State> {
    private svf: ScrollViewFader;

    constructor() {
        super();
        this.state = {month: 11, year: 2017 };
    }

    render() {
        return (
            <View style={styles.body}>
                <ScrollView
                    onScroll={(r) => this.svf.handleScroll(r)}
                    refreshControl={
                    <RefreshControl
                        refreshing={this.props.refreshing}
                        onRefresh={() => this.props.onRefresh()}
                    />
                }>
                    <View style={styles.calendarCard}>
                        <CalendarComponent month={this.state.month} year={this.state.year} updateCalendar={(m, y) => this.setState({month: m, year: y})}/>
                    </View>
                    {
                        [1, 2, 3, 4].map((k, i) => (
                            <View key={i} style={styles.card}/>
                        ))
                    }
                    <BottomScrollViewPadding/>
                </ScrollView>
                <ScrollViewFader ref={(svf => this.svf = svf)}/>
            </View>
        );
    }

}
