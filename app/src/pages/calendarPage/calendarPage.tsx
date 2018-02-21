import React, {Component} from 'react';
import moment, {Moment} from 'moment';
import {StyleSheet, View} from 'react-native';
import {hideHeader, Navigation} from 'src/utils/navigationUtils';
import {CalendarComponent} from './components/calendar';

interface State {
    calendarView: 'week' | 'month';
    selectedDate: Moment;
    visibleDate: Moment;
}

interface Props {
}

@Navigation({
    ...hideHeader
})
export default class CalendarPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            calendarView: 'month',
            selectedDate: moment(),
            visibleDate: moment()
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
                                visibleDate: date
                            }
                        ));
                    }}
                    setVisibleDate={date => {
                        this.setState(prev => ({
                                ...prev,
                                visibleDate: date
                            }
                        ));
                    }}
                    updateView={view => {
                        this.setState(prev => ({
                                ...prev,
                                calendarView: view
                            }
                        ));
                    }}
                />
            </View>
        );
    }
}

let styles = StyleSheet.create({
    body: {
        flex: 1
    }
});
