import React from 'react';
import moment, {Moment} from 'moment';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Assets} from '../../../../../../assets';

interface Props {
    month: number;
    year: number;
    updateCalendar: (newMonth: number, newYear: number) => void;
}

function padZero(m: number) {
    if (m < 10) {
        return '0' + m;
    }
    return m;
}

function getDayNumber(month: Moment, day: number) {
    let firstOfTheMonth = month.weekday();
    if (day - 1 - firstOfTheMonth < 0) {
        return '';
    } else if (day - 1 - firstOfTheMonth >= month.daysInMonth()) {
        return '';
    } else {
        return (day - firstOfTheMonth).toString();
    }
}

function weekCount(year: number, month_number: number) {
    // month_number is in the range 1..12

    let firstOfMonth = new Date(year, month_number - 1, 1);
    let lastOfMonth = new Date(year, month_number, 0);

    let used = firstOfMonth.getDay() + lastOfMonth.getDate();

    return Math.ceil(used / 7);
}

function getCalendarDays(year: number, month: number) {
    let calendarDays: number[][] = [];
    for (let i = 0; i < weekCount(year, month); i++) {
        let week: number[] = [];
        calendarDays.push(week);
        for (let j = 1; j <= 7; j++) {
            week.push(i * 7 + j);
        }
    }
    return calendarDays;
}

export let CalendarComponent: React.SFC<Props> = props => {
    let month = moment(props.year + '-' + padZero(props.month) + '-01');
    let calendarDays = getCalendarDays(props.year, props.month);
    return (
        <View>
            <View style={styles.calendarHeader}>
                <View style={styles.flexPadding} />
                <TouchableOpacity
                    onPress={() =>
                        props.updateCalendar(
                            props.month === 1 ? 12 : props.month - 1,
                            props.month === 1 ? props.year - 1 : props.year
                        )
                    }
                    style={styles.calendarHeaderLeft}
                >
                    <Image style={styles.imageSize} source={Assets.icons.left} />
                </TouchableOpacity>
                <View style={styles.monthHeader}>
                    <Text style={styles.monthHeaderText}>
                        {month.format('MMMM')} {props.year}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() =>
                        props.updateCalendar(
                            props.month === 12 ? 1 : props.month + 1,
                            props.month === 12 ? props.year + 1 : props.year
                        )
                    }
                    style={styles.calendarHeaderRight}
                >
                    <Image style={styles.imageSize} source={Assets.icons.right} />
                </TouchableOpacity>
                <View style={styles.flexPadding} />
            </View>
            <View style={[styles.calendarBody, {height: 50 * calendarDays.length}]}>
                {calendarDays.map((week, k) => (
                    <View key={k} style={styles.week}>
                        {week.map(day => {
                            let dayNumber = getDayNumber(month, day);
                            return (
                                <TouchableOpacity key={day} style={styles.day}>
                                    <View style={[styles.dayCircle, dayNumber === '' ? {backgroundColor: 'grey'} : {}]}>
                                        <Text style={styles.dayText}>{dayNumber}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                ))}
            </View>
        </View>
    );
};

let styles = StyleSheet.create({
    calendarBody: {},
    week: {
        flex: 1,
        flexDirection: 'row'
    },
    day: {
        // borderWidth: StyleSheet.hairlineWidth,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#e5e5e5',
        borderRadius: 5,
        margin: 2
    },
    dayCircle: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: 20,
        height: 20,
        backgroundColor: '#FFFFFF'
    },
    dayText: {
        fontSize: 10
    },

    calendarHeader: {
        height: 30,
        flexDirection: 'row'
    },
    monthHeader: {
        // borderWidth: StyleSheet.hairlineWidth,
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    monthHeaderText: {
        fontSize: 15
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
