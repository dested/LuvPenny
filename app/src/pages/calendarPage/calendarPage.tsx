import React, {Component} from 'react';
import moment, {Moment} from 'moment';
import {ActivityIndicator, ActivityIndicatorIOS, Platform, ScrollView, StyleSheet, View} from 'react-native';
import {hideHeader, Navigation} from 'src/utils/navigationUtils';
import {CalendarComponent} from './components/calendar';
import {Container} from '../../components/styled/container';
import {Card} from '../../components/styled/card';
import {Utils} from '../../utils/utils';
import {Title} from '../../components/styled/title';

interface State {
    calendarView: 'week' | 'month';
    loadingItems: boolean;
    selectedDate: Moment;
    visibleDate: Moment;
    visibleItems: {height: number; title: string}[];
}

interface Props {}

@Navigation({
    ...hideHeader
})
export default class CalendarPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            loadingItems: false,

            calendarView: 'week',
            selectedDate: moment(),
            visibleDate: moment(),
            visibleItems: Utils.range(Math.random() * 5).map(() => ({
                height: Math.random() * 250 + 100,
                title: Math.random() * 10000 + ''
            }))
        };
    }

    render() {
        return (
            <View style={styles.body}>
                <CalendarComponent
                    view={this.state.calendarView}
                    selectedDate={this.state.selectedDate}
                    visibleDate={this.state.visibleDate}
                    selectDate={date => {
                        this.setState(prev => ({
                            ...prev,
                            calendarView: 'week',
                            selectedDate: date,
                            visibleDate: date,
                            visibleItems: Utils.range(Math.random() * 5).map(() => ({
                                height: Math.random() * 250 + 100,
                                title: Math.random() * 10000 + ''
                            })),
                            loadingItems: true
                        }));
                        setTimeout(() => {
                            this.setState(prev => ({
                                ...prev,
                                loadingItems: false
                            }));
                        }, Math.random() * 1500);
                    }}
                    setVisibleDate={date => {
                        this.setState(prev => ({
                            ...prev,
                            visibleDate: date
                        }));
                    }}
                    updateView={view => {
                        this.setState(prev => ({
                            ...prev,
                            calendarView: view
                        }));
                    }}
                />
                {this.state.loadingItems ? (
                    <ActivityIndicator style={{flex: 1}} />
                ) : (
                    <ScrollView style={{flex: 1}}>{this.state.visibleItems.map(k => this.renderItem(k))}</ScrollView>
                )}
            </View>
        );
    }

    private renderItem(k: {title: string; height: number}) {
        return (
            <Container key={k.title}>
                <Card style={[styles.card, {height: k.height}]}>
                    <Title>{k.title}</Title>
                </Card>
            </Container>
        );
    }
}

let styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white'
    },
    card: {
        height: 200,
        borderColor: '#e3cfd1'
    }
});
