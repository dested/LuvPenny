import React from 'react';
import moment, {Moment} from 'moment';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
    month: number;
    year: number;
    selectedDate: Moment;
    updateCalendar: (date: Moment) => void;
}

interface State {
    selectedAnimation: Animated.Value;
    month: Moment;
    today: Moment;
    calendarDays: DateInfo[][];
}

function padZero(m: number) {
    if (m < 10) {
        return '0' + m;
    }
    return m;
}

function weekCount(year: number, monthNumber: number) {
    // month_number is in the range 1..12

    let firstOfMonth = new Date(year, monthNumber - 1, 1);
    let lastOfMonth = new Date(year, monthNumber, 0);

    let used = firstOfMonth.getDay() + lastOfMonth.getDate();

    return Math.ceil(used / 7);
}

interface DateInfo {
    outOfMonth: boolean;
    day: number;
    dateNumber: number;
    date: Moment;
}

export class CalendarComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            selectedAnimation: new Animated.Value(0),
            month: moment(props.year + '-' + padZero(props.month) + '-01'),
            today: moment(),
            calendarDays: this.getCalendarDays(props.year, props.month)
        };
        Animated.timing(this.state.selectedAnimation, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
        }).start();
    }

    private getCalendarDays(year: number, monthNumber: number): DateInfo[][] {
        let month = moment(year + '-' + padZero(monthNumber) + '-01');
        let firstOfTheMonth = month.weekday();
        let daysInMonth = month.daysInMonth();

        let calendarDays: DateInfo[][] = [];
        for (let i = 0; i < weekCount(year, monthNumber); i++) {
            let week: DateInfo[] = [];
            calendarDays.push(week);
            for (let j = 1; j <= 7; j++) {
                let day = i * 7 + j;

                let outOfMonth = false;
                if (day - 1 - firstOfTheMonth < 0) {
                    outOfMonth = true;
                } else if (day - 1 - firstOfTheMonth >= daysInMonth) {
                    outOfMonth = true;
                }

                week.push({
                    day: day,
                    dateNumber: moment(month)
                        .add(day - 1 - firstOfTheMonth, 'days')
                        .get('date'),
                    date: moment(month).add(day - 1 - firstOfTheMonth, 'days'),
                    outOfMonth: outOfMonth
                });
            }
        }
        return calendarDays;
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        if (this.props.selectedDate.get('date') !== nextProps.selectedDate.get('date')) {
            this.state.selectedAnimation.setValue(0);
            Animated.timing(this.state.selectedAnimation, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            }).start();
            this.setState(prev => ({
                ...prev,
                month: moment(nextProps.year + '-' + padZero(nextProps.month) + '-01'),
                calendarDays: this.getCalendarDays(nextProps.year, nextProps.month)
            }));
        }
    }

    render() {
        let calendarDays = this.state.calendarDays;
        let today = this.state.today;

        return (
            <LinearGradient colors={['#FF9D83', '#FB6B67']} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
                <View style={styles.calendarBody}>
                    <View style={styles.calendarHeader}>
                        <View style={styles.flexPadding} />
                        <View style={styles.monthHeader}>
                            <Text style={styles.monthHeaderText}>{this.state.month.format('MMMM YYYY')}</Text>
                        </View>
                        <View style={styles.flexPadding} />
                    </View>

                    <View style={styles.week}>
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, k) => {
                            return (
                                <View key={k} style={styles.day}>
                                    <View style={styles.dayBox}>
                                        <Text style={styles.dayText}>{day}</Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>

                    {calendarDays.map((week, k) => (
                        <View key={k} style={styles.week}>
                            {week.map(dayInfo => {
                                let dateIsSelected = this.props.selectedDate.isSame(dayInfo.date, 'day');
                                return (
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        key={dayInfo.dateNumber}
                                        style={styles.day}
                                        onPress={() => this.props.updateCalendar(dayInfo.date)}
                                    >
                                        {today.isSame(dayInfo.date, 'day') && this.renderTodayCircle()}
                                        {dateIsSelected && this.renderSelectedDateCircle()}
                                        <View style={[styles.dayBox]}>
                                            <Text
                                                style={[
                                                    styles.dayText,
                                                    dateIsSelected
                                                        ? {color: '#FB6B67'}
                                                        : dayInfo.outOfMonth
                                                          ? {color: 'rgba(255,255,255,.4)'}
                                                          : {color: 'rgba(255,255,255,1)'}
                                                ]}
                                            >
                                                {dayInfo.day}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    ))}
                    <View style={styles.week} />
                </View>
            </LinearGradient>
        );
    }

    private renderTodayCircle() {
        return (
            <View style={{position: 'absolute', flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
                <View
                    style={{
                        width: 30,
                        height: 30,
                        borderRadius: 15,
                        borderWidth: 2,
                        borderColor: 'rgba(255,255,255,.5)'
                    }}
                />
            </View>
        );
    }

    renderSelectedDateCircle() {
        let size = this.state.selectedAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0.7, 1]
        });
        return (
            <View style={{position: 'absolute', flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
                <Animated.View
                    style={{
                        width: 35,
                        height: 35,
                        transform: [{scale: size}],
                        backgroundColor: '#ffffff',
                        borderRadius: 35 / 2,
                        borderWidth: 3,
                        borderColor: 'rgba(255,255,255,.5)'
                    }}
                />
            </View>
        );
    }
}

let styles = StyleSheet.create({
    calendarBody: {
        marginHorizontal: 20
    },
    week: {
        flexDirection: 'row',
        height: 40
    },
    day: {
        flex: 1,
        justifyContent: 'center',
    },
    dayBox: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 20
    },
    dayText: {
        fontFamily: 'ProximaNovaSoft-Regular',
        fontSize: 15,
        color: '#ffffff'
    },

    calendarHeader: {
        height: 70,
        flexDirection: 'row'
    },
    monthHeader: {
        // borderWidth: StyleSheet.hairlineWidth,
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    monthHeaderText: {
        fontFamily: 'ProximaNovaSoft-Bold',
        fontSize: 22,
        color: '#ffffff'
    },
    calendarHeaderLeft: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    calendarHeaderRight: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    flexPadding: {
        flex: 1
    },
    imageSize: {
        width: 32,
        height: 32
    }
});
