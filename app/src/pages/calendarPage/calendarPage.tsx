import React, {Component} from 'react';
import moment, {Moment} from 'moment';
import {ActivityIndicator, Animated, ScrollView, StyleSheet} from 'react-native';
import {hideHeader, Navigation} from 'src/utils/navigationUtils';
import {CalendarComponent} from './components/calendar';
import {Container} from '../../components/styled/container';
import {Card} from '../../components/styled/card';
import {Utils} from '../../utils/utils';
import {Title} from '../../components/styled/title';
import LinearGradient from 'react-native-linear-gradient';

interface State {
    calendarView: 'week' | 'month';
    loadingItems: boolean;
    selectedDate: Moment;
    visibleDate: Moment;
    scrollPosition: Animated.Value;
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
            scrollPosition: new Animated.Value(0),
            calendarView: 'week',
            selectedDate: moment(new Date(2018, 1, 5)),
            visibleDate: moment(new Date(2018, 1, 5)),
            visibleItems: Utils.range(10).map(() => ({
                height: Math.random() * 250 + 100,
                title: Math.random() * 10000 + ''
            }))
        };
    }

    render() {
        return (
            <LinearGradient style={styles.body} colors={['#FF9D83', '#FB6B67']} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
                <ScrollView
                    style={{flex: 1}}
                    scrollEventThrottle={16}
                    onScroll={Animated.event([
                        {
                            nativeEvent: {
                                contentOffset: {
                                    y: this.state.scrollPosition
                                }
                            }
                        }
                    ])}
                >
                    <CalendarComponent
                        scrollKeeper={this.state.scrollPosition}
                        view={this.state.calendarView}
                        selectedDate={this.state.selectedDate}
                        visibleDate={this.state.visibleDate}
                        selectDate={date => {
                            this.setState(prev => ({
                                ...prev,
                                calendarView: 'week',
                                selectedDate: date,
                                visibleDate: date,
                                visibleItems: Utils.range(10).map(() => ({
                                    height: Math.random() * 500 + 100,
                                    title: Math.random() * 10000 + ''
                                })),
                                loadingItems: true
                            }));
                            setTimeout(() => {
                                this.setState(prev => ({
                                    ...prev,
                                    loadingItems: false
                                }));
                            }, Math.random() * 3000);
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
                        this.state.visibleItems.map(k => this.renderItem(k))
                    )}
                </ScrollView>
            </LinearGradient>
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
