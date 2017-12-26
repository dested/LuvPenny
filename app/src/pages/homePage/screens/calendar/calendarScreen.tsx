import moment, {Moment} from 'moment';
import React from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import {styles} from './styles';
import {CalendarComponent} from './components/calendar/calendarComponent';
import {BottomScrollViewPadding} from '../../components/bottomScrollViewPadding';
import {ScrollViewFader} from '../../components/scrollViewFader';
import {MainScrollView} from '../../components/mainScrollView/mainScrollView';

interface State {
    month: number;
    year: number;
}

interface Props {
    refreshing: boolean;
    onRefresh: () => void;
}

export class CalendarScreen extends React.Component<Props, State> {
    constructor() {
        super();
        this.state = {month: 11, year: 2017};
    }

    render() {
        return (
            <View style={styles.body}>
                <MainScrollView refreshing={this.props.refreshing} onRefresh={() => this.props.onRefresh()}>
                    <View style={styles.calendarCard}>
                        <CalendarComponent
                            month={this.state.month}
                            year={this.state.year}
                            updateCalendar={(m, y) => this.setState({month: m, year: y})}
                        />
                    </View>
                    {[1, 2, 3, 4].map((k, i) => <View key={i} style={styles.card} />)}
                </MainScrollView>
            </View>
        );
    }
}
