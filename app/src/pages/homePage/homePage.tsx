import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {hideHeader, Navigation} from '../../utils/navigationUtils';
import {CalendarScreen} from './screens/calendar/calendarScreen';
import {HomeScreen} from './screens/home/homeScreen';
import {PlusScreen} from './screens/plus/plusScreen';
import {IconAnimator} from './components/iconAnimator/iconAnimator';
import {PersonHeader} from './components/personHeader/personHeader';
import {Relationship} from 'src/models/member';
import {Swiper} from 'src/components/swiper';

interface State {
    currentPage: number;
    relationships: Relationship[];
    selectedRelationship: Relationship;
    refreshing: boolean;
}

interface Props {}

@Navigation({
    ...hideHeader
})
export class HomePage extends Component<Props, State> {
    private swiper: Swiper;
    private iconAnimator: IconAnimator;

    constructor(props: Props) {
        super(props);
        let relationships = [
            {
                id: 'd49ab34a-f4a1-4665-b670-4fffec53cda5',
                name: 'Hildegarde',
                avatar: 'https://tinyfac.es/data/avatars/BA0CB1F2-8C79-4376-B13B-DD5FB8772537-500w.jpeg',
                color: '#3a702e'
            },
            {
                id: '9775cf57-9991-47d7-ae65-a77e28d8236c',
                name: 'Esme',
                avatar: 'https://tinyfac.es/data/avatars/5F8C5D50-DDB6-4F06-AA15-ACB30D8D910D-500w.jpeg',
                color: '#ea2c89'
            },
            {
                id: 'e245d9c7-40e5-48c9-bfbe-379b0881c169',
                name: 'Marylynne',
                avatar: 'https://tinyfac.es/data/avatars/26CFEFB3-21C8-49FC-8C19-8E6A62B6D2E0-500w.jpeg',
                color: '#352d0b'
            },
            {
                id: '3f32c6e2-c77a-462d-bb13-ab094e07f9cf',
                name: 'Jeniffer',
                avatar: 'https://tinyfac.es/data/avatars/03F55412-DE8A-4F83-AAA6-D67EE5CE48DA-500w.jpeg',
                color: '#b86b3e'
            },
            {
                id: 'e97b0d18-49da-4823-81ce-80fc9dd620a7',
                name: 'Jillane',
                avatar: 'https://tinyfac.es/data/avatars/344CFC24-61FB-426C-B3D1-CAD5BCBD3209-500w.jpeg',
                color: '#fe102c'
            },
            {
                id: 'dbfaa8e6-9f56-443f-9007-d58df8059b1e',
                name: 'Wendel',
                avatar: 'https://tinyfac.es/data/avatars/AEF44435-B547-4B84-A2AE-887DFAEE6DDF-500w.jpeg',
                color: '#19ea5b'
            },
            {
                id: 'b6c6a8d9-b82b-450e-a59f-603c10a1b2df',
                name: 'Sheryl',
                avatar: 'https://tinyfac.es/data/avatars/7E570445-25F0-4276-8E8F-084ABA2C8FB8-500w.jpeg',
                color: '#48580b'
            },
            {
                id: '5855cd12-108e-417a-a2e2-5a16ebc291af',
                name: 'Mel',
                avatar: 'https://tinyfac.es/data/avatars/282A12CA-E0D7-4011-8BDD-1FAFAAB035F7-500w.jpeg',
                color: '#892d96'
            },
            {
                id: '5579adfd-087d-40f7-85f2-6a09058b3905',
                name: 'Pennie',
                avatar: 'https://tinyfac.es/data/avatars/FBEBF655-4886-455A-A4A4-D62B77DD419B-500w.jpeg',
                color: '#d7a2e1'
            },
            {
                id: '8bc2dc34-23d7-426f-92b1-47ec96137352',
                name: 'Bonni',
                avatar: 'https://tinyfac.es/data/avatars/B3CF5288-34B0-4A5E-9877-5965522529D6-500w.jpeg',
                color: '#bcde8f'
            }
        ];

        this.state = {
            currentPage: 1,
            relationships: relationships,
            selectedRelationship: relationships[0],
            refreshing: false
        };
    }

    private onRefresh() {
        this.setState({refreshing: true});
        setTimeout(() => {
            this.setState({refreshing: false});
        }, Math.random() * 3000);
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        if (nextState.currentPage !== this.state.currentPage) {
            return false;
        }
        return true;
    }

    render() {
        return (
            <View style={styles.body}>
                <PersonHeader
                    relationships={this.state.relationships}
                    selectedRelationship={this.state.selectedRelationship}
                    onSelect={r => this.updateRelationship(r)}
                />
                <Swiper
                    ref={r => (this.swiper = r)}
                    startPage={1}
                    onAnimation={page => this.animationIndex(page)}
                    onPageChange={page => {
                        this.setState({currentPage: page});
                        this.iconAnimator.setPage(page);
                    }}
                >
                    <CalendarScreen refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />
                    <HomeScreen refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />
                    <PlusScreen refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />
                </Swiper>
                <IconAnimator ref={r => (this.iconAnimator = r)} gotoPage={page => this.swiper.gotoPage(page)} />
            </View>
        );
    }

    private animationIndex(index: number) {
        this.iconAnimator.animationIndex(index);
    }

    private updateRelationship(relationship: Relationship) {
        this.setState({selectedRelationship: relationship});
    }
}

let styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF'
    },
    homeBody: {
        flex: 1
    }
});
