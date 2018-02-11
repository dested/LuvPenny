import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CalendarComponent} from './components/calendar/calendarComponent';
import {MainScrollView} from '../../components/mainScrollView/mainScrollView';
import {Container} from '../../../../components/container';
import {Card} from '../../../../components/card';
import {CommonStyles} from '../../../../utils/commonStyles';

interface State {
    month: number;
    year: number;
}

interface Props {
    refreshing: boolean;
    onRefresh: () => void;
}

export class CalendarScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {month: 11, year: 2017};
    }

    render() {
        return (
            <View style={styles.body}>
                <MainScrollView refreshing={this.props.refreshing} onRefresh={() => this.props.onRefresh()}>
                    <Container>
                        <Card>
                            <CalendarComponent
                                month={this.state.month}
                                year={this.state.year}
                                updateCalendar={(m, y) => this.setState({month: m, year: y})}
                            />
                        </Card>
                    </Container>
                    {[1, 2, 3, 4].map((k, i) => (
                        <Container key={i}>
                            <Card style={styles.card} />
                        </Container>
                    ))}
                </MainScrollView>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'stretch',
        ...CommonStyles.pageBackgroundColor,
        borderRightWidth: StyleSheet.hairlineWidth
    },
    calendar: {
        height: 250,
        margin: 4,
        borderRadius: 15,
        backgroundColor: '#fafac4'
    },
    calendarCard: {
        margin: 10,
        padding: 10
    },
    card: {
        height: 80,
        borderColor: '#e3cfd1'
    }
});
