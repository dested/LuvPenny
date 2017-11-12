import React, {Component} from 'react';
import {
    View
} from 'react-native';
import {hideHeader, Navigation} from "../../utils/navigationUtils";
import {SwiperComponent} from "../../components/swiperComponent";
import {CalendarScreen} from "./screens/calendar/calendarScreen";
import {HomeScreen} from "./screens/home/homeScreen";
import {PlusScreen} from "./screens/plus/plusScreen";
import {IconAnimator} from "./components/iconAnimator/iconAnimator";
import {PersonHeader} from "./components/personHeader/personHeader";
import {Relationship} from "../../models/member";
import {styles} from "./styles";


interface State {
    currentPage: number;
    relationships: Relationship[];
    selectedRelationship: Relationship;
    refreshing: boolean;
}

interface Props {

}

@Navigation({
    ...hideHeader
})
export class HomePage extends Component<Props, State> {
    private swiper: SwiperComponent;
    private iconAnimator: IconAnimator;

    constructor() {
        super();
        let relationships = [{
            "id": "d49ab34a-f4a1-4665-b670-4fffec53cda5",
            "name": "Hildegarde",
            "avatar": "https://robohash.org/porrovelut.png?size=50x50&set=set1",
            "color": "#3a702e"
        }, {
            "id": "9775cf57-9991-47d7-ae65-a77e28d8236c",
            "name": "Esme",
            "avatar": "https://robohash.org/temporedoloresmolestiae.png?size=50x50&set=set1",
            "color": "#ea2c89"
        }, {
            "id": "e245d9c7-40e5-48c9-bfbe-379b0881c169",
            "name": "Marylynne",
            "avatar": "https://robohash.org/ametetsequi.png?size=50x50&set=set1",
            "color": "#352d0b"
        }, {
            "id": "3f32c6e2-c77a-462d-bb13-ab094e07f9cf",
            "name": "Jeniffer",
            "avatar": "https://robohash.org/laborumearumvoluptatem.png?size=50x50&set=set1",
            "color": "#b86b3e"
        }, {
            "id": "e97b0d18-49da-4823-81ce-80fc9dd620a7",
            "name": "Jillane",
            "avatar": "https://robohash.org/velnisipraesentium.png?size=50x50&set=set1",
            "color": "#fe102c"
        }, {
            "id": "dbfaa8e6-9f56-443f-9007-d58df8059b1e",
            "name": "Wendel",
            "avatar": "https://robohash.org/utveliteum.png?size=50x50&set=set1",
            "color": "#19ea5b"
        }, {
            "id": "b6c6a8d9-b82b-450e-a59f-603c10a1b2df",
            "name": "Sheryl",
            "avatar": "https://robohash.org/eaqueconsequaturexercitationem.png?size=50x50&set=set1",
            "color": "#48580b"
        }, {
            "id": "5855cd12-108e-417a-a2e2-5a16ebc291af",
            "name": "Mel",
            "avatar": "https://robohash.org/quaseafuga.png?size=50x50&set=set1",
            "color": "#892d96"
        }, {
            "id": "5579adfd-087d-40f7-85f2-6a09058b3905",
            "name": "Pennie",
            "avatar": "https://robohash.org/officiabeataecorporis.png?size=50x50&set=set1",
            "color": "#d7a2e1"
        }, {
            "id": "8bc2dc34-23d7-426f-92b1-47ec96137352",
            "name": "Bonni",
            "avatar": "https://robohash.org/estmodilabore.png?size=50x50&set=set1",
            "color": "#bcde8f"
        }];

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
        }, Math.random() * 5000);
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        if (nextState.currentPage != this.state.currentPage) {
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
                    onSelect={(r) => this.updateRelationship(r)}
                />
                <SwiperComponent
                    ref={r => this.swiper = r}
                    startPage={1}
                    onAnimation={(page) => this.animationIndex(page)}
                    onPageChange={(page) => {
                        this.setState({currentPage: page});
                        this.iconAnimator.setPage(page)
                    }}
                >
                    <CalendarScreen refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)}/>
                    <HomeScreen refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)}/>
                    <PlusScreen refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)}/>
                </SwiperComponent>
                <IconAnimator
                    ref={r => this.iconAnimator = r}
                    gotoPage={(page) => this.swiper.gotoPage(page)}
                />
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
