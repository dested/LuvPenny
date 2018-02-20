import React, {Component} from 'react';
import moment, {Moment} from 'moment';
import {StyleSheet, View} from 'react-native';
import {hideHeader, Navigation} from 'src/utils/navigationUtils';
import {CalendarComponent} from './components/calendar';

interface State {
    month: number;
    year: number;
    selectedDate: Moment;
}

interface Props {}

@Navigation({
    ...hideHeader
})
export default class CalendarPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            month: moment().get('month') + 1,
            year: moment().get('year'),
            selectedDate: null
        };
    }

    render() {
        return (
            <View style={styles.body}>
                <CalendarComponent
                    month={this.state.month}
                    year={this.state.year}
                    selectedDate={this.state.selectedDate}
                    setMonth={(month, year) => {
                        if (month < 1) {
                            month += 12;
                            year -= 1;
                        }
                        if (month > 12) {
                            month -= 12;
                            year += 1;
                        }

                        this.setState(prev => ({...prev, month, year}));
                    }}
                    selectDate={date => {
                        this.setState({...this.state, selectedDate: date});
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
