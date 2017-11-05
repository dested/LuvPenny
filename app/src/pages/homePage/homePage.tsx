import React, {Component} from 'react';
import {
    Button, Image,
    Platform, ScrollView,
    Text,
    View, StyleSheet, TouchableWithoutFeedback, Dimensions, Animated
} from 'react-native';
import {hideHeader, Navigation} from "../../utils/navigationUtils";
import {MemberDataService} from "../../dataServices/memberDataService";
import {Member} from "../../../../common/http";
import {calendarScreenStyles, homeScreenStyles, homeStyles, plusScreenStyles, relationshipStyles} from './styles'
import LinearGradient from "react-native-linear-gradient";
import {TabNavigator, NavigationTransitionProps, NavigationAction, NavigationState, NavigationScreenProp} from "react-navigation";
import {Assets} from "../../assets";
import {SwiperComponent} from "../../components/swiperComponent";
import {DebounceUtils} from "../../utils/debounceUtils";

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
    currentPage: number,
    relationships: Relationship[],
    bottomLeftIconOpacity: Animated.Value,
    bottomRightIconOpacity: Animated.Value

    bottomLeftIconPosition: Animated.Value
    bottomRightIconPosition: Animated.Value
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
            currentPage: 1,
            bottomLeftIconPosition: new Animated.Value(0),
            bottomRightIconPosition: new Animated.Value(1),

            bottomLeftIconOpacity: new Animated.Value(1),
            bottomRightIconOpacity: new Animated.Value(1),
            relationships: [
                {name: 'Mike', icon: '', color: 'yellow'},
                {name: 'Chris', icon: '', color: 'green'},
                {name: 'Mike', icon: '', color: 'yellow'},
                {name: 'Chris', icon: '', color: 'green'},
                {name: 'Mike', icon: '', color: 'yellow'},
                {name: 'Chris', icon: '', color: 'green'},
                {name: 'Mike', icon: '', color: 'yellow'},
                {name: 'Chris', icon: '', color: 'green'},
                {name: 'Mike', icon: '', color: 'yellow'},
                {name: 'Chris', icon: '', color: 'green'},
            ]
        };
    }

    render() {


        const bottomLeftIconPosition = this.state.bottomLeftIconPosition.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [-32 - 10, 10, Dimensions.get("screen").width - 32 - 10],
        });

        const bottomRightIconPosition = this.state.bottomRightIconPosition.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [10, Dimensions.get("screen").width - 32 - 10, Dimensions.get("screen").width],
        });

        const bottomLeftIconOpacity = this.state.bottomRightIconOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        });

        const bottomRightIconOpacity = this.state.bottomLeftIconOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        });


        const bottomLeftIconOpacityInverted = this.state.bottomRightIconOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
        });

        const bottomRightIconOpacityInverted = this.state.bottomLeftIconOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
        });

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
                    onPageChange={(index) => this.setState({currentPage: index})}
                >

                    <CalendarScreen></CalendarScreen>

                    <HomeScreen></HomeScreen>

                    <PlusScreen></PlusScreen>

                </SwiperComponent>


                <Animated.View
                    style={
                        [
                            homeStyles.bottomLeftIcon,
                            {
                                opacity: bottomLeftIconOpacity,
                                transform: [{
                                    translateX: bottomLeftIconPosition
                                }]
                            }
                        ]
                    }
                >
                    <TouchableWithoutFeedback onPress={() => this.leftIconTap()}>
                        <Image style={{width: 32, height: 32}} source={Assets.icons.calendar}/>
                    </TouchableWithoutFeedback>
                </Animated.View>

                <Animated.View
                    style={
                        [
                            homeStyles.bottomLeftIcon,
                            {
                                opacity: bottomLeftIconOpacityInverted,
                                transform: [{
                                    translateX: bottomLeftIconPosition
                                }]
                            }
                        ]
                    }
                >
                    <TouchableWithoutFeedback onPress={() => this.leftIconTap()}>
                        <Image style={{width: 32, height: 32}} source={Assets.icons.home}/>
                    </TouchableWithoutFeedback>
                </Animated.View>


                <Animated.View
                    style={
                        [
                            homeStyles.bottomRightIcon,
                            {
                                opacity: bottomRightIconOpacity,
                                transform: [{
                                    translateX: bottomRightIconPosition
                                }]
                            }
                        ]
                    }
                >
                    <TouchableWithoutFeedback onPress={() => this.rightIconTap()}>
                        <Image style={{width: 32, height: 32}} source={Assets.icons.star}/>
                    </TouchableWithoutFeedback>
                </Animated.View>


                <Animated.View
                    style={
                        [
                            homeStyles.bottomRightIcon,
                            {
                                opacity: bottomRightIconOpacityInverted,
                                transform: [{
                                    translateX: bottomRightIconPosition
                                }]
                            }
                        ]
                    }
                >
                    <TouchableWithoutFeedback onPress={() => this.rightIconTap()}>
                        <Image style={{width: 32, height: 32}} source={Assets.icons.home}/>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </View>
        );
    }


    private animationIndex(index: number) {
        if (index < 1) {
            this.state.bottomLeftIconPosition.setValue(1 - index);
            this.state.bottomRightIconPosition.setValue(1 + (1 - index));


            this.state.bottomRightIconOpacity.setValue(index);
            this.state.bottomLeftIconOpacity.setValue(1);
        }
        if (index > 1) {
            this.state.bottomLeftIconPosition.setValue(1 - index);
            this.state.bottomRightIconPosition.setValue(1 - (index - 1));

            this.state.bottomLeftIconOpacity.setValue(1 - (index - 1));
            this.state.bottomRightIconOpacity.setValue(1);
        }
    }

    private leftIconTap() {
        switch (this.state.currentPage) {
            case 0:
                this.swiper.goToPage(1);
                break;
            case 1:
                this.swiper.goToPage(0);
                break;
        }
    }

    private rightIconTap() {
        switch (this.state.currentPage) {
            case 1:
                this.swiper.goToPage(2);
                break;
            case 2:
                this.swiper.goToPage(1);
                break;
        }
    }
}
