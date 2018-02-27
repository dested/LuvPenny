import React from 'react';
import moment, {Moment} from 'moment';
import {
    Animated,
    LayoutAnimation,
    PanResponder,
    PanResponderInstance,
    StyleSheet,
    Text,
    TouchableOpacity,
    UIManager,
    View
} from 'react-native';
import {Utils} from 'src/utils/utils';
import {VPadding} from '../../../components/styled/padding';

interface Props {
    view: 'week' | 'month';
    selectedDate?: Moment;
    scrollKeeper: Animated.Value;
    visibleDate?: Moment;
    selectDate: (date: Moment) => void;
    setVisibleDate: (date: Moment) => void;
    updateView: (view: 'week' | 'month') => void;
}

interface WeekInfo {
    days: DateInfo[];
    weekIndex: number;
}

interface MonthInfo {
    month: Moment;
    weeks: WeekInfo[];
}

interface State {
    horizontalPan: Animated.Value;
    today: Moment;
    monthInfo: MonthInfo[];
    weekInfo: WeekInfo[];
}

interface DateInfo {
    outOfMonth: boolean;
    dateNumber: number;
    date: Moment;
}

export class CalendarComponent extends React.Component<Props, State> {
    panResponder: PanResponderInstance;

    constructor(props: Props) {
        super(props);

        const calendarInfo = this.getCalendarInfo(props.selectedDate);
        this.state = {
            horizontalPan: new Animated.Value(1),

            today: moment(),
            monthInfo: calendarInfo.months,
            weekInfo: calendarInfo.weeks
        };
    }

    private weekCount(month: Moment) {
        // month_number is in the range 1..12
        let firstOfMonth = month
            .clone()
            .startOf('month')
            .toDate();
        let lastOfMonth = month
            .clone()
            .endOf('month')
            .toDate();
        let used = firstOfMonth.getDay() + lastOfMonth.getDate();
        return Math.ceil(used / 7);
    }

    private getCalendarInfo(date: Moment): {months: MonthInfo[]; weeks: WeekInfo[]} {
        let months: MonthInfo[] = [];
        let startOfDate = date.clone().startOf('month');
        for (let c = -1; c <= 1; c++) {
            let startOfMonth = startOfDate.clone().add(c, 'months');

            let monthlyWeeks: WeekInfo[] = [];
            let numOfWeeks = this.weekCount(startOfMonth);
            for (let i = 0; i < numOfWeeks; i++) {
                let week: WeekInfo = {days: [], weekIndex: i};
                monthlyWeeks.push(week);

                let startOfWeek = startOfMonth
                    .clone()
                    .add(i, 'weeks')
                    .startOf('week');
                for (let d = 0; d < 7; d++) {
                    let now = startOfWeek.clone().add(d, 'days');
                    const outOfMonth = !now.isSame(startOfMonth, 'month');
                    week.days.push({
                        dateNumber: now.get('date'),
                        date: now,
                        outOfMonth: outOfMonth
                    });
                }
            }
            months.push({
                month: startOfMonth,
                weeks: monthlyWeeks
            });
        }
        let weeks: WeekInfo[] = [];
        for (let c = -1; c <= 1; c++) {
            let startOfWeek = date
                .clone()
                .startOf('week')
                .add(c, 'week');

            let weekInfo: WeekInfo = {days: [], weekIndex: 0};
            weeks.push(weekInfo);

            for (let d = 0; d < 7; d++) {
                let now = startOfWeek.clone().add(d, 'days');
                weekInfo.days.push({
                    dateNumber: now.get('date'),
                    date: now,
                    outOfMonth: false
                });
            }
        }
        return {months, weeks};
    }

    componentWillMount(): void {
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, g) => Math.abs(g.dx) > 10,
            onMoveShouldSetPanResponderCapture: (evt, g) => Math.abs(g.dx) > 10,
            onPanResponderGrant: (e, g) => {
                this.state.horizontalPan.setValue(0);
            },
            onPanResponderMove: Animated.event([null, {dx: this.state.horizontalPan}]),
            onPanResponderRelease: (c, g) => {
                if (g.dx < -50) {
                    Animated.timing(this.state.horizontalPan, {
                        toValue: -Utils.getWindowWidth() * 2,
                        useNativeDriver: true,
                        duration: 200
                    }).start(() => {
                        this.swingRight();
                    });
                } else if (g.dx > 50) {
                    Animated.timing(this.state.horizontalPan, {
                        toValue: Utils.getWindowWidth() * 2,
                        useNativeDriver: true,
                        duration: 200
                    }).start(() => {
                        this.swingLeft();
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
        if (!this.props.visibleDate.isSame(nextProps.visibleDate)) {
            this.state.horizontalPan.setValue(0);
            const calendarInfo = this.getCalendarInfo(nextProps.visibleDate);
            this.setState(prev => ({
                ...prev,
                monthInfo: calendarInfo.months,
                weekInfo: calendarInfo.weeks
            }));
        }
        if (this.props.view !== nextProps.view || !this.props.selectedDate.isSame(nextProps.selectedDate)) {
            LayoutAnimation.configureNext({
                duration: 150,
                create: {
                    type: LayoutAnimation.Types.linear,
                    property: LayoutAnimation.Properties.scaleXY
                },
                update: {
                    type: LayoutAnimation.Types.linear,
                    property: LayoutAnimation.Properties.scaleXY
                },
                delete: {
                    type: LayoutAnimation.Types.linear,
                    property: LayoutAnimation.Properties.scaleXY
                }
            });
        }
    }

    render() {
        let horizontal = this.state.horizontalPan.interpolate({
            inputRange: [-Utils.getWindowWidth(), 0, Utils.getWindowWidth()],
            outputRange: [-Utils.getWindowWidth() / 2, 0, Utils.getWindowWidth() / 2]
        });

        return (
            <View {...this.panResponder.panHandlers}>
                {this.renderMonthHeader()}
                <View style={styles.calendarBody}>{this.renderDayHeader()}</View>

                <Animated.View
                    style={[
                        styles.calendarArea,
                        {
                            /*{transform: [{translateY: pinPosition}]}*/
                        }
                    ]}
                >
                    {this.calendarBody(0, horizontal)}
                    {this.calendarBody(1, horizontal)}
                    {this.calendarBody(2, horizontal)}
                </Animated.View>
            </View>
        );
    }

    private calendarBody(positionIndex: number, hOffset: Animated.AnimatedInterpolation) {
        let monthInfo = this.state.monthInfo[positionIndex];
        let weekInfo = this.state.weekInfo[positionIndex];
        return (
            <Animated.View
                style={[
                    styles.calendarBody,
                    {
                        transform: [{translateX: Animated.add(hOffset, -Utils.getWindowWidth())}]
                    }
                ]}
            >
                {this.props.view === 'month'
                    ? monthInfo.weeks.map(week => this.renderWeek(week))
                    : this.renderWeek(weekInfo)}
                {this.props.view === 'month' && monthInfo.weeks.length < 6 && <View style={styles.week} />}
                <VPadding size={20} />
            </Animated.View>
        );
    }

    private getMonthLabel(monthInfo: MonthInfo, weekInfo: WeekInfo) {
        const monthFormat = 'MMMM YYYY';
        let monthLabel: string;
        if (this.props.view === 'month') {
            monthLabel = monthInfo.month.format(monthFormat);
        } else {
            if (
                weekInfo.days[0].date.isSameOrBefore(this.props.selectedDate) &&
                weekInfo.days[6].date.isSameOrAfter(this.props.selectedDate)
            ) {
                monthLabel = this.props.selectedDate.format(monthFormat);
            } else {
                if (weekInfo.days[6].date.isBefore(this.props.selectedDate)) {
                    monthLabel = weekInfo.days[6].date.format(monthFormat);
                } else if (weekInfo.days[0].date.isAfter(this.props.selectedDate)) {
                    monthLabel = weekInfo.days[0].date.format(monthFormat);
                } else {
                    monthLabel = weekInfo.days[0].date.format(monthFormat);
                }
            }
        }
        return monthLabel;
    }

    private renderMonthHeader() {
        let renderMonthLabel = (monthFormat: string) => (
            <Animated.View
                style={[
                    styles.calendarHeader,
                    {
                        marginHorizontal: 20,
                        width: Utils.getWindowWidth() - 20 * 2,
                        transform: [{translateX: horizontalResult}]
                    }
                ]}
            >
                <TouchableOpacity activeOpacity={0.7} style={{flex: 1}} onPress={() => this.props.updateView('month')}>
                    <View style={styles.flexPadding} />
                    <View style={styles.monthHeader}>
                        <Text style={styles.monthHeaderText}>{monthFormat}</Text>
                    </View>
                    <View style={styles.flexPadding} />
                </TouchableOpacity>
            </Animated.View>
        );

        let monthLabelLeft = this.getMonthLabel(this.state.monthInfo[0], this.state.weekInfo[0]);
        let monthLabelCenter = this.getMonthLabel(this.state.monthInfo[1], this.state.weekInfo[1]);
        let monthLabelRight = this.getMonthLabel(this.state.monthInfo[2], this.state.weekInfo[2]);

        let horizontalResult: Animated.AnimatedInterpolation;

        if (this.props.view === 'week') {
            if (monthLabelCenter === monthLabelLeft && monthLabelCenter === monthLabelRight) {
                horizontalResult = this.state.horizontalPan.interpolate({
                    inputRange: [-Utils.getWindowWidth(), 0, Utils.getWindowWidth()],
                    outputRange: [-Utils.getWindowWidth(), -Utils.getWindowWidth(), -Utils.getWindowWidth()]
                });
            } else if (monthLabelCenter !== monthLabelLeft) {
                horizontalResult = this.state.horizontalPan.interpolate({
                    inputRange: [-Utils.getWindowWidth(), 0, Utils.getWindowWidth()],
                    outputRange: [-Utils.getWindowWidth(), -Utils.getWindowWidth(), -Utils.getWindowWidth() / 2]
                });
            } else if (monthLabelCenter !== monthLabelRight) {
                horizontalResult = this.state.horizontalPan.interpolate({
                    inputRange: [-Utils.getWindowWidth(), 0, Utils.getWindowWidth()],
                    outputRange: [-Utils.getWindowWidth() * 1.5, -Utils.getWindowWidth(), -Utils.getWindowWidth()]
                });
            }
        } else {
            horizontalResult = this.state.horizontalPan.interpolate({
                inputRange: [-Utils.getWindowWidth(), 0, Utils.getWindowWidth()],
                outputRange: [-Utils.getWindowWidth() * 1.5, -Utils.getWindowWidth(), -Utils.getWindowWidth() / 2]
            });
        }

        return (
            <View style={{flexDirection: 'row'}}>
                {renderMonthLabel(monthLabelLeft)}
                {renderMonthLabel(monthLabelCenter)}
                {renderMonthLabel(monthLabelRight)}
            </View>
        );
    }

    private renderDayHeader() {
        return (
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
        );
    }

    private renderWeek(week: WeekInfo) {
        return (
            <View key={week.weekIndex} style={styles.week}>
                {week.days.map(dayInfo => {
                    return this.renderDay(dayInfo);
                })}
            </View>
        );
    }

    private renderDay(dayInfo: DateInfo) {
        let dateIsSelected = this.props.selectedDate && this.props.selectedDate.isSame(dayInfo.date, 'day');

        return (
            <TouchableOpacity
                activeOpacity={1}
                key={+dayInfo.date.toDate()}
                style={styles.day}
                onPress={() => !dateIsSelected && this.props.selectDate(dayInfo.date)}
            >
                {this.state.today.isSame(dayInfo.date, 'day') && this.renderTodayCircle()}
                {dateIsSelected && this.renderSelectedDateCircle()}
                <View style={[styles.dayBox]}>
                    <Text
                        style={[
                            styles.dayText,
                            dateIsSelected
                                ? {color: '#FB6B67'}
                                : dayInfo.outOfMonth ? {color: 'rgba(255,255,255,.4)'} : {color: 'rgba(255,255,255,1)'}
                        ]}
                    >
                        {dayInfo.dateNumber}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        width: '100%',
                        position: 'absolute',
                        bottom: 0
                    }}
                >
                    <View
                        style={{
                            width: 4,
                            height: 4,
                            backgroundColor: 'rgba(255,255,255,.7)',
                            marginHorizontal: 3,
                            borderRadius: 4 / 2
                        }}
                    />
                    <View
                        style={{
                            width: 4,
                            height: 4,
                            backgroundColor: 'rgba(255,255,255,.7)',
                            marginHorizontal: 3,
                            borderRadius: 4 / 2
                        }}
                    />
                    <View
                        style={{
                            width: 4,
                            height: 4,
                            backgroundColor: 'rgba(255,255,255,.7)',
                            marginHorizontal: 3,
                            borderRadius: 4 / 2
                        }}
                    />
                </View>
            </TouchableOpacity>
        );
    }

    private renderTodayCircle() {
        return (
            <View style={styles.todayOuter}>
                <View style={styles.today} />
            </View>
        );
    }

    private renderSelectedDateCircle() {
        return (
            <View style={styles.selectedDateOuter}>
                <View style={styles.selectedDate} />
            </View>
        );
    }

    private swingLeft() {
        if (this.props.view === 'week') {
            this.props.setVisibleDate(this.props.visibleDate.clone().add(-1, 'week'));
        } else {
            this.props.setVisibleDate(this.props.visibleDate.clone().add(-1, 'month'));
        }
    }

    private swingRight() {
        if (this.props.view === 'week') {
            this.props.setVisibleDate(this.props.visibleDate.clone().add(1, 'week'));
        } else {
            this.props.setVisibleDate(this.props.visibleDate.clone().add(1, 'month'));
        }
    }
}

let styles = StyleSheet.create({
    calendarArea: {
        flexDirection: 'row',
        zIndex: 2
    },
    today: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,.5)'
    },
    todayOuter: {
        position: 'absolute',
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    calendarBody: {
        backgroundColor: 'transparent',
        marginHorizontal: 20,
        width: Utils.getWindowWidth() - 20 * 2
    },
    week: {
        flexDirection: 'row',
        height: 40
    },
    selectedDateOuter: {
        position: 'absolute',
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    selectedDate: {
        width: 30,
        height: 30,
        backgroundColor: '#ffffff',
        borderRadius: 30 / 2,
        borderWidth: 3,
        borderColor: 'rgba(255,255,255,.5)'
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
        paddingTop: 10,
        height: 50,
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
