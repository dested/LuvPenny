import React from 'react';
import moment, {Moment} from 'moment';
import {Animated, PanResponder, PanResponderInstance, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Utils} from '../../../utils/utils';
import CleanRender from '../../../components/cleanRender';

interface Props {
    month: number;
    year: number;
    selectedDate?: Moment;
    selectDate: (date: Moment) => void;
    setMonth: (month: number, year: number) => void;
}

interface CalendarInfo {
    month: Moment;
    weeks: DateInfo[][];
}

interface State {
    wasSelectedDate: Moment | null;

    horizontalPan: Animated.Value;
    selectedAnimation: Animated.Value;
    weekHeightAnimation: Animated.Value[];
    today: Moment;
    calendarInfo: CalendarInfo[];
}

function padZero(m: number) {
    if (m < 10) {
        return '0' + m;
    }
    return m;
}

interface DateInfo {
    outOfMonth: boolean;
    day: number;
    dateNumber: number;
    date: Moment;
}

export class CalendarComponent extends React.Component<Props, State> {
    panResponder: PanResponderInstance;

    constructor(props: Props) {
        super(props);
        this.state = {
            horizontalPan: new Animated.Value(1),
            wasSelectedDate: null,

            selectedAnimation: new Animated.Value(0),
            weekHeightAnimation: [
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1)
            ],

            today: moment(),
            calendarInfo: this.getCalendarInfo(props.year, props.month)
        };
    }

    private weekCount(year: number, monthNumber: number) {
        // month_number is in the range 1..12

        let firstOfMonth = new Date(year, monthNumber - 1, 1);
        let lastOfMonth = new Date(year, monthNumber, 0);
        let used = firstOfMonth.getDay() + lastOfMonth.getDate();
        return Math.ceil(used / 7);
    }

    private getCalendarInfo(year: number, monthNumber: number): CalendarInfo[] {
        let calendarInfo: CalendarInfo[] = [];
        for (let c = -1; c <= 1; c++) {
            let month = moment(year + '-' + padZero(monthNumber) + '-01').add(c, 'months');

            let firstOfTheMonth = month.weekday();
            let daysInMonth = month.daysInMonth();

            let weeks: DateInfo[][] = [];
            let numOfWeeks = this.weekCount(month.get('year'), month.get('month') + 1);
            for (let i = 0; i < numOfWeeks; i++) {
                let week: DateInfo[] = [];
                weeks.push(week);
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
                            .add(day - 1 - firstOfTheMonth, 'day')
                            .get('date'),
                        date: moment(month).add(day - 1 - firstOfTheMonth, 'day'),
                        outOfMonth: outOfMonth
                    });
                }
            }
            calendarInfo.push({
                month,
                weeks
            });
        }

        return calendarInfo;
    }

    componentWillMount(): void {
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, g) => Math.abs(g.dx) > 10,
            onMoveShouldSetPanResponderCapture: (evt, g) => Math.abs(g.dx) > 10,
            onPanResponderGrant: (e, g) => {
                this.state.horizontalPan.setValue(1);
            },
            onPanResponderMove: Animated.event([null, {dx: this.state.horizontalPan}]),
            onPanResponderRelease: (c, g) => {
                if (g.dx < -50) {
                    Animated.spring(this.state.horizontalPan, {
                        toValue: -Utils.getWindowWidth() * 2,
                        useNativeDriver: true
                    }).start(() => {
                        this.props.setMonth(this.props.month + 1, this.props.year);
                    });
                } else if (g.dx > 50) {
                    Animated.spring(this.state.horizontalPan, {
                        toValue: Utils.getWindowWidth() * 2,
                        useNativeDriver: true
                    }).start(() => {
                        this.props.setMonth(this.props.month - 1, this.props.year);
                    });
                } else {
                    Animated.spring(this.state.horizontalPan, {
                        toValue: 0,
                        useNativeDriver: true
                    }).start();
                }
            }
        });
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        let calendarInfos = this.getCalendarInfo(nextProps.year, nextProps.month);
        let calendarInfo = calendarInfos[1];

        if (nextProps.month !== this.props.month) {
            this.state.horizontalPan.setValue(1);
        }

        if (
            nextProps.selectedDate &&
            (!this.props.selectedDate || this.props.selectedDate.get('date') !== nextProps.selectedDate.get('date'))
        ) {
            this.state.selectedAnimation.setValue(0);
            Animated.timing(this.state.selectedAnimation, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }).start();

            let weekIndex = 0;
            for (const week of calendarInfo.weeks) {
                let weekIsSelected = nextProps.selectedDate && nextProps.selectedDate.isSame(week[0].date, 'week');
                Animated.timing(this.state.weekHeightAnimation[weekIndex], {
                    toValue: weekIsSelected ? 1 : 0,
                    duration: 350
                }).start();
                weekIndex++;
            }
        }

        if (!nextProps.selectedDate) {
            for (let weekIndex = 0; weekIndex < calendarInfo.weeks.length; weekIndex++) {
                Animated.timing(this.state.weekHeightAnimation[weekIndex], {
                    toValue: 1,
                    duration: 350
                }).start();
            }
        }

        this.setState(prev => ({
            ...prev,
            month: moment(nextProps.year + '-' + padZero(nextProps.month) + '-01'),
            calendarInfo: calendarInfos,
            wasSelectedDate: this.props.selectedDate
        }));
    }

    render() {
        let hOffset = this.state.horizontalPan.interpolate({
            inputRange: [-Utils.getWindowWidth(), 0, Utils.getWindowWidth()],
            outputRange: [-Utils.getWindowWidth() / 2, 0, Utils.getWindowWidth() / 2]
        });

        return (
            <LinearGradient
                {...this.panResponder.panHandlers}
                style={styles.calendarArea}
                colors={['#FF9D83', '#FB6B67']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
            >
                {this.calendarBody(this.state.calendarInfo[0], false, hOffset)}
                {this.calendarBody(this.state.calendarInfo[1], true, hOffset)}
                {this.calendarBody(this.state.calendarInfo[2], false, hOffset)}
            </LinearGradient>
        );
    }

    private calendarBody(calendarInfo: CalendarInfo, main: boolean, hOffset: Animated.AnimatedInterpolation) {
        let calendarWeeks = calendarInfo.weeks;
        let today = this.state.today;

        let weekHeights = this.state.weekHeightAnimation.map(
            (ani, i) =>
                main
                    ? ani.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 40]
                      })
                    : 40
        );

        let monthFormat = calendarInfo.month.format('MMMM YYYY');
        return (
            <Animated.View
                style={[
                    styles.calendarBody,
                    {
                        transform: [{translateX: Animated.add(hOffset, -Utils.getWindowWidth())}]
                    }
                ]}
            >
                <View style={styles.calendarHeader}>
                    <View style={styles.flexPadding} />
                    <View style={styles.monthHeader}>
                        <Text style={styles.monthHeaderText}>{monthFormat}</Text>
                    </View>
                    <View style={styles.flexPadding} />
                </View>

                <View style={styles.week}>
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, k) => {
                        return (
                            <View key={monthFormat + 'w' + k} style={styles.day}>
                                <View style={styles.dayBox}>
                                    <Text style={styles.dayText}>{day}</Text>
                                </View>
                            </View>
                        );
                    })}
                </View>

                {calendarWeeks.map((week, k) => {
                    return (
                        <Animated.View key={monthFormat + 'w' + k} style={[styles.week, {height: weekHeights[k]}]}>
                            {week.map(dayInfo => {
                                let dateIsSelected =
                                    this.props.selectedDate && this.props.selectedDate.isSame(dayInfo.date, 'day');
                                let dateWasSelected =
                                    this.state.wasSelectedDate &&
                                    this.state.wasSelectedDate.isSame(dayInfo.date, 'day');
                                return (
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        key={monthFormat + 'd' + dayInfo.dateNumber}
                                        style={styles.day}
                                        onPress={() => this.props.selectDate(dayInfo.date)}
                                    >
                                        {today.isSame(dayInfo.date, 'day') && this.renderTodayCircle()}
                                        {dateIsSelected && this.renderSelectedDateCircle()}
                                        {dateWasSelected && this.renderSelectedDateCircle(true)}
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
                                                {dayInfo.dateNumber}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </Animated.View>
                    );
                })}
                <View style={styles.week}>
                    {this.props.selectedDate && (
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}
                            onPress={() => this.props.selectDate(null)}
                        >
                            <Text style={[styles.dayText, {fontSize: 12, color: 'rgba(255,255,255,.4)'}]}>BACK</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </Animated.View>
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

    renderSelectedDateCircle(invert: boolean = false) {
        let size = !invert
            ? this.state.selectedAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1]
              })
            : this.state.selectedAnimation.interpolate({
                  inputRange: [0, 0.2],
                  outputRange: [1, 0.01],
                  extrapolate: 'clamp'
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
    calendarArea: {
        flexDirection: 'row'
    },

    calendarBody: {
        marginHorizontal: 20,
        width: Utils.getWindowWidth() - 20 * 2
    },
    week: {
        flexDirection: 'row',
        height: 40
    },
    day: {
        flex: 1,
        justifyContent: 'center'
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
