import React, {Component} from 'react';
import {
    Button, Image,
    Platform, ScrollView,
    Text,
    View, StyleSheet, TouchableHighlight, Dimensions
} from 'react-native';
import {hideHeader, Navigation} from "../../utils/navigationUtils";
import {MemberDataService} from "../../dataServices/memberDataService";
import {Member} from "../../../../common/http";
import {calendarScreenStyles, homeScreenStyles, homeStyles, plusScreenStyles, relationshipStyles} from './styles'
import LinearGradient from "react-native-linear-gradient";
import {TabNavigator, NavigationTransitionProps, NavigationAction, NavigationState, NavigationScreenProp} from "react-navigation";
import {Assets} from "../../assets";
import {SwiperComponent} from "../../components/swiperComponent";

export interface Relationship {
    name: string;
    icon: string;
    color: string
}

class CalendarScreen extends React.Component<{}> {
    render() {
        return (
            <View style={calendarScreenStyles.body}>
            </View>
        );
    }
}

class HomeScreen extends React.Component<{}> {
    render() {
        return (
            <View style={homeScreenStyles.body}>
            </View>
        );
    }
}

class PlusScreen extends React.Component<{}> {
    render() {
        return (
            <View style={plusScreenStyles.body}>
            </View>
        );
    }
}

let RelationshipHeaderComponent: React.SFC<{ relationship: Relationship }> = (props) => {
    return (
        <View style={[relationshipStyles.body, {backgroundColor: props.relationship.color}]}>

        </View>
    )
};

interface HomePageState {
    relationships: Relationship[],
    bottomLeftIconOpacity: number,
    bottomRightIconOpacity: number
}

@Navigation({
    ...hideHeader
})
export class HomePage extends Component<{}, HomePageState> {
    private tabNavigator: NavigationScreenProp<NavigationState, NavigationAction>;
    private swiper: SwiperComponent;

    private tabChanger(navigator: NavigationScreenProp<NavigationState, NavigationAction>) {
        this.tabNavigator = navigator;
    }

    constructor() {
        super();
        this.state = {
            bottomLeftIconOpacity: 1,
            bottomRightIconOpacity: 1,
            relationships: [{
                name: 'Mike',
                icon: '',
                color: 'yellow'
            }, {
                name: 'Chris',
                icon: '',
                color: 'green'
            }, {
                name: 'Mike',
                icon: '',
                color: 'yellow'
            }, {
                name: 'Chris',
                icon: '',
                color: 'green'
            }, {
                name: 'Mike',
                icon: '',
                color: 'yellow'
            }, {
                name: 'Chris',
                icon: '',
                color: 'green'
            }, {
                name: 'Mike',
                icon: '',
                color: 'yellow'
            }, {
                name: 'Chris',
                icon: '',
                color: 'green'
            }, {
                name: 'Mike',
                icon: '',
                color: 'yellow'
            }, {
                name: 'Chris',
                icon: '',
                color: 'green'
            }, {
                name: 'Mike',
                icon: '',
                color: 'yellow'
            }, {
                name: 'Chris',
                icon: '',
                color: 'green'
            }]
        };
    }

    render() {
        return (
            <View style={homeStyles.body}>
                <View style={homeStyles.personHeader}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {
                            this.state.relationships.map((r, i) => (
                                <RelationshipHeaderComponent
                                    key={i}
                                    relationship={r}
                                />
                            ))
                        }
                    </ScrollView>
                </View>

                <SwiperComponent
                    ref={r => this.swiper = r}
                    index={1}
                    onAnimation={(index) => this.animationIndex(index)}
                >

                    <CalendarScreen></CalendarScreen>

                    <HomeScreen></HomeScreen>

                    <PlusScreen></PlusScreen>

                </SwiperComponent>


                <TouchableHighlight
                    style={[homeStyles.bottomLeftIcon, {opacity: this.state.bottomLeftIconOpacity}]}
                    onPress={() => this.swiper.goToPage(0)}
                >
                    <Image style={{width: 32, height: 32}} source={Assets.icons.calendar}/>
                </TouchableHighlight>
                <TouchableHighlight
                    style={[homeStyles.bottomRightIcon, {opacity: this.state.bottomRightIconOpacity}]}
                    onPress={() => this.swiper.goToPage(2)}
                >
                    <Image style={{width: 32, height: 32}} source={Assets.icons.star}/>
                </TouchableHighlight>
            </View>
        );
    }


    private animationIndex(index: number) {
        if (index < 1) {
            this.setState({bottomLeftIconOpacity: index});
            this.setState({bottomRightIconOpacity: 1});
        }
        if (index > 1) {
            this.setState({bottomRightIconOpacity: 1 - (index - 1)});
            this.setState({bottomLeftIconOpacity: 1});
        }
    }
}
