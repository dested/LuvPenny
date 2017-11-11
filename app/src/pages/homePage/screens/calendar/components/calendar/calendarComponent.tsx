import React from "react";
import moment, {Moment} from "moment";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";

interface Props {
    month: number;
    year: number;
    updateCalendar: (newMonth: number, newYear: number) => void;
}


function padZero(m: number) {
    if (m < 10) {
        return "0" + m;
    }
    return m;
}

function getDayNumber(month: Moment, day: number) {
    let firstOfTheMonth = month.weekday();
    if ((day - 1) - firstOfTheMonth < 0) {
        return "";
    } else if ((day - 1) - firstOfTheMonth >= month.daysInMonth()) {
        return "";
    } else {
        return ((day) - firstOfTheMonth).toString();
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

export let CalendarComponent: React.SFC<Props> = (props) => {
    let month = moment(props.year + '-' + padZero(props.month) + '-01');
    let calendarDays = getCalendarDays(props.year, props.month);
    return (
        <View>
            <View style={styles.calendarHeader}>
                <View style={{flex: 1}}>

                </View>
                <TouchableOpacity onPress={() => props.updateCalendar(props.month === 1 ? 12 : props.month - 1, props.month === 1 ? props.year - 1 : props.year)} style={styles.calendarHeaderLeft}>
                    <Text>&lt;</Text>
                </TouchableOpacity>
                <View style={styles.monthHeader}>
                    <Text style={styles.monthHeaderText}>
                        {month.format('MMMM')} {props.year}
                    </Text>
                </View>
                <TouchableOpacity onPress={() => props.updateCalendar(props.month === 12 ? 1 : props.month + 1, props.month === 12 ? props.year + 1 : props.year)} style={styles.calendarHeaderRight}>
                    <Text>&gt;</Text>
                </TouchableOpacity>
                <View style={{flex: 1}}>

                </View>
            </View>
            <View style={styles.body}>
                {calendarDays.map((week, k) => (
                    <View key={k} style={styles.week}>
                        {week.map(day => {
                            let dayNumber = getDayNumber(month, day);
                            return (
                                <View key={day} style={styles.day}>
                                    <View style={[styles.dayCircle,
                                        dayNumber === '' ? {backgroundColor: 'grey'} : {}]}>
                                        <Text style={styles.dayText}>{dayNumber}</Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                ))}
            </View>
        </View>
    )
};
