import React from 'react';
import {
    Animated,
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
    DatePickerAndroid,
    DatePickerIOS
} from 'react-native';
import {hideHeader, Navigation} from 'src/utils/navigationUtils';
import {Utils} from 'src/utils/utils';
import {Assets} from 'src/assets';
import {HorizontalSelector, HorizontalSelectorItem} from '../../components/horizontalSelector';
import {DownBounceArrow} from './components/downBounceArrow';
import {Penny} from 'src/components/penny';
import FullPan from 'src/components/fullPan';
import {Animator} from 'src/utils/animator';
import {platform} from 'os';
import HorizontalFullPan from '../../components/horizontalFullPan';
import {NavigationActions, TransitionerProps} from 'react-navigation';

interface Survey {
    gender?: string;
    myName?: string;
    myBirthdate?: string;
    significantOtherRelationship?: string;
    significantOtherName?: string;
    significantOtherBirthdate?: string;
}

interface State {
    stars: { translateX: Animated.Animated; translateY: Animated.Animated; scale: Animated.Animated }[];
    canProgress: boolean;
    canReverse: boolean;
    pageIndex: number;
    colors: string[];

    hPageIndex: number;
    hColors: string[];


    survey: Survey;
}

interface Props extends TransitionerProps {
}

@Navigation({
    ...hideHeader
})
export default class IntroPage extends React.Component<Props, State> {
    fullPan: FullPan;

    relationshipItems = [
        {color: 'yellow', icon: Assets.elements.relationship.boyfriend, label: 'Boyfriend', value: 'boyfriend'},
        {color: 'yellow', icon: Assets.elements.relationship.girlfriend, label: 'Girlfriend', value: 'girlfriend'},
        {color: 'yellow', icon: Assets.elements.relationship.husband, label: 'Husband', value: 'husband'},
        {color: 'yellow', icon: Assets.elements.relationship.wife, label: 'Wife', value: 'wife'},
        {color: 'yellow', icon: Assets.elements.relationship.son, label: 'Son', value: 'son'},
        {color: 'yellow', icon: Assets.elements.relationship.daughter, label: 'Daughter', value: 'daughter'},
        {color: 'yellow', icon: Assets.elements.relationship.daughter, label: 'Mother', value: 'mother'},
        {color: 'yellow', icon: Assets.elements.relationship.son, label: 'Father', value: 'father'},
        {color: 'yellow', icon: Assets.elements.relationship.girlfriend, label: 'Best Friend', value: 'bestFriendGirl'},
        {color: 'yellow', icon: Assets.elements.relationship.boyfriend, label: 'Best Friend', value: 'bestFriendBoy'}
    ];

    starPositions = [
        {x: Utils.getWindowWidth() * 0.3, y: Utils.getWindowHeight() * 0.2, size: 0.4},
        {x: Utils.getWindowWidth() * 0.25, y: Utils.getWindowHeight() * 0.1, size: 0.8},
        {x: Utils.getWindowWidth() * 0.12, y: Utils.getWindowHeight() * 0.05, size: 0.3},
        {x: Utils.getWindowWidth() * 0.04, y: Utils.getWindowHeight() * 0.11, size: 0.36},
        {x: Utils.getWindowWidth() * 0.48, y: Utils.getWindowHeight() * 0.1, size: 0.8},
        {x: Utils.getWindowWidth() * 0.83, y: Utils.getWindowHeight() * 0.09, size: 0.4},
        {x: Utils.getWindowWidth() * 0.81, y: Utils.getWindowHeight() * 0.17, size: 0.5},
        {x: Utils.getWindowWidth() * 0.56, y: Utils.getWindowHeight() * 0.04, size: 0.6},
        {x: Utils.getWindowWidth() * 0.75, y: Utils.getWindowHeight() * 0.08, size: 0.4},
        {x: Utils.getWindowWidth() * 0.67, y: Utils.getWindowHeight() * 0.16, size: 0.3},
        {x: Utils.getWindowWidth() * 0.22, y: Utils.getWindowHeight() * 0.18, size: 0.7},
        {x: Utils.getWindowWidth() * 0.75, y: Utils.getWindowHeight() * 0.24, size: 0.6},
        {x: Utils.getWindowWidth() * 0.71, y: Utils.getWindowHeight() * 0.18, size: 0.3},
        {x: Utils.getWindowWidth() * 0.11, y: Utils.getWindowHeight() * 0.18, size: 0.3},
        {x: Utils.getWindowWidth() * 0.02, y: Utils.getWindowHeight() * 0.02, size: 0.6}
    ];

    constructor(props: Props) {
        super(props);

        this.state = {
            stars: [],
            canReverse: true,
            canProgress: true,
            pageIndex: 5,
            colors: ['#60b6ff', '#ff8b3c', '#af6fff', '#8fffa3', '#59d9ff'],

            hPageIndex: 0,
            hColors: [
                'rgba(232,31,20,.2)',
                'rgba(2,48,128,.2)',
                'rgba(232,195,58,.2)',
                'rgba(41,85,68,.2)'
            ],

            survey: {}
        };
    }

    setupIndexAnimator(animator: Animated.Value, range: number): void {
        let introRange = Utils.range(range);
        let positions = introRange.map(() => Utils.randomizeArray(this.starPositions));
        let stars = Utils.range(this.starPositions.length).map((_, i) => positions.map(p => p[i]));

        this.setState(prev => ({
            ...prev,
            stars: stars.map(s => {
                return {
                    translateX: animator.interpolate({
                        inputRange: introRange,
                        outputRange: s.map(a => a.x)
                    }),
                    translateY: animator.interpolate({
                        inputRange: introRange,
                        outputRange: s.map(a => a.y)
                    }),
                    scale: animator.interpolate({
                        inputRange: introRange,
                        outputRange: s.map(a => a.size)
                    })
                };
            })
        }));
    }

    updatePageIndex(pageIndex: number): void {
        this.setState(prev => {
            let newState = {...prev, pageIndex: pageIndex, canReverse: true};
            newState.canProgress = this.canProgress(newState);
            return newState;
        });
    }

    private canProgress(state: State) {
        let canProgress: boolean;
        switch (state.pageIndex) {
            case 7:
                canProgress = !!state.survey.gender;
                break;
            case 8:
                canProgress = !!state.survey.myName;
                break;
            case 9:
                canProgress = !!state.survey.myBirthdate;
                break;

            case 10:
                canProgress = !!state.survey.significantOtherRelationship;
                break;
            case 11:
                canProgress = !!state.survey.significantOtherName;
                break;
            case 12:
                canProgress = !!state.survey.significantOtherBirthdate;
                break;
            case 13:
                canProgress = false;
                break;
            default:
                canProgress = true;
        }
        return canProgress;
    }

    updateSurvey(survey: Survey): void {
        this.setState(prev => {
            let newState: State = {...prev, survey: {...prev.survey, ...survey}};
            newState.canProgress = this.canProgress(newState);
            return newState;
        });
    }

    render() {
        let page = 0;

        return (
            <View style={{left: 0, right: 0, top: 0, bottom: 0}}>
                <Animated.View/>

                <FullPan
                    ref={p => (this.fullPan = p)}
                    colors={this.state.colors}
                    pageIndex={this.state.pageIndex}
                    indexAnimator={(animator, range) => this.setupIndexAnimator(animator, range)}
                    canProgress={this.state.canProgress}
                    canReverse={this.state.canReverse}
                    onIndexChange={index => this.updatePageIndex(index)}
                >
                    {this.renderText(
                        page++,
                        <Text style={styles.text}>This is {<Penny/>}</Text>,
                        <Animator.In
                            startPosition={{
                                x: Dimensions.get('screen').width + 20,
                                y: Dimensions.get('screen').height - 200
                            }}
                            finalPosition={{
                                x: Dimensions.get('screen').width / 2,
                                y: Dimensions.get('screen').height - 250
                            }}
                            duration={1000}
                        >
                            <Image style={{width: 128, height: 128}} source={Assets.elements.penny.penny}/>
                        </Animator.In>
                    )}
                    {this.renderText(
                        page++,
                        <Text style={styles.text}>
                            {<Penny/>} is your <Text style={{color: '#d36053'}}>relationship manager</Text>
                        </Text>,
                        <Animator.In
                            startPosition={{
                                x: -150,
                                y: Dimensions.get('screen').height - 200
                            }}
                            finalPosition={{
                                x: Dimensions.get('screen').width / 2 - 198,
                                y: Dimensions.get('screen').height - 250
                            }}
                            duration={1000}
                        >
                            <Image
                                style={{width: 128, height: 128}}
                                source={Assets.elements.penny.relationship_manager}
                            />
                        </Animator.In>
                    )}
                    {this.renderText(
                        page++,
                        <Text style={styles.text}>
                            <Penny she/> will make you a{' '}
                            <Text style={{fontWeight: '500', color: '#7b001a'}}>rockstar</Text>
                        </Text>,
                        <Animator.In
                            startPosition={{
                                x: Dimensions.get('screen').width / 2 - 80,
                                y: Dimensions.get('screen').height + 200
                            }}
                            finalPosition={{
                                x: Dimensions.get('screen').width / 2 - 64,
                                y: Dimensions.get('screen').height - 250
                            }}
                            duration={1000}
                        >
                            <Image style={{width: 128, height: 128}} source={Assets.elements.penny.rockstar}/>
                        </Animator.In>
                    )}
                    {this.renderText(
                        page++,
                        <Text style={styles.text}>
                            The more information {<Penny/>} knows about{' '}
                            <Text style={{fontWeight: '500', color: '#387b1a'}}>you</Text> and your{' '}
                            <Text style={{fontWeight: '500', color: '#387b1a'}}>significant others</Text>
                        </Text>,
                        <Animator.In
                            startPosition={{
                                x: Dimensions.get('screen').width + 100,
                                y: Dimensions.get('screen').height + 200
                            }}
                            finalPosition={{
                                x: Dimensions.get('screen').width / 2 - 128,
                                y: Dimensions.get('screen').height - 250
                            }}
                            duration={1000}
                        >
                            <Image style={{width: 128, height: 128}} source={Assets.elements.penny.information}/>
                        </Animator.In>
                    )}
                    {this.renderText(
                        page++,
                        <Text style={styles.text}>
                            The more help {<Penny/>} can provide{' '}
                            <Text style={{fontWeight: '500', color: '#387b1a'}}>you</Text>
                        </Text>,
                        <Animator.In
                            startPosition={{
                                x: -180,
                                y: Dimensions.get('screen').height + 200
                            }}
                            finalPosition={{
                                x: Dimensions.get('screen').width / 2,
                                y: Dimensions.get('screen').height - 250
                            }}
                            duration={1000}
                        >
                            <Image style={{width: 128, height: 128}} source={Assets.elements.penny.help}/>
                        </Animator.In>
                    )}
                    {page++ && <View style={styles.textHolder}>
                        <HorizontalFullPan
                            colors={this.state.hColors}
                            pageIndex={this.state.hPageIndex}
                            canProgress={true}
                            canReverse={true}
                            onIndexChange={index => {
                                this.setState(prev => ({...prev, hPageIndex: index}));
                            }}
                        >
                            <View style={styles.textHolder}>
                                <Text style={styles.text}>
                                    Keep track of birthday presents months in advance
                                </Text>
                            </View>
                            <View style={styles.textHolder}>
                                <Text style={styles.text}>
                                    Get the chocolates they want, not the ones you want
                                </Text>
                            </View>
                            <View style={styles.textHolder}>
                                <Text style={styles.text}>
                                    Secretly plan a seemingly spontaneous date night
                                </Text>
                            </View>
                            <View style={styles.textHolder}>
                                <Text style={styles.text}>
                                    Keep track of their favorite meal at Chipotle
                                </Text>
                            </View>
                            <View style={styles.textHolder}>
                                <Text style={styles.text}>
                                    Never forget their favorite Disney princess again
                                </Text>
                            </View>
                            <View style={styles.textHolder}>
                                <Text style={styles.text}>
                                    Be notified when their favorite team comes to town
                                </Text>
                            </View>
                            <View style={styles.textHolder}>
                                <Text style={styles.text}>
                                    Never get them the wrong flowers again
                                </Text>
                            </View>
                        </HorizontalFullPan>

                        {this.state.canProgress && <DownBounceArrow press={() => this.fullPan.progressIndex(1)}/>}
                    </View>}

                    {this.renderText(
                        page++,
                        <Text style={styles.text}>
                            Let's get started with a{' '}
                            <Text style={{fontWeight: '500', color: '#dfdd5b'}}>simple questionnaire</Text>
                        </Text>,
                        <Animator.In
                            startPosition={{
                                x: -150,
                                y: Dimensions.get('screen').height - 250
                            }}
                            finalPosition={{
                                x: Dimensions.get('screen').width / 2 - 64,
                                y: Dimensions.get('screen').height - 250
                            }}
                            duration={1000}
                        >
                            <Image style={{width: 128, height: 128}} source={Assets.elements.penny.smiling}/>
                        </Animator.In>
                    )}
                    {this.renderSelect(page++, {
                        upperText: 'Answer this:',
                        label: <Text style={styles.text}>I am a</Text>,
                        items: [
                            {label: 'Boy', color: 'yellow', icon: Assets.elements.relationship.boyfriend, value: 'boy'},
                            {
                                label: 'Girl',
                                color: 'yellow',
                                icon: Assets.elements.relationship.girlfriend,
                                value: 'girl'
                            }
                        ],
                        selectedItem: this.relationshipItems[0],
                        otherItem: {label: 'Something Else', color: 'yellow', icon: Assets.icons.star, value: 'other'},
                        set: item => this.updateSurvey({gender: item.value})
                    })}
                    {this.renderTextInput(page++, {
                        label: <Text style={styles.text}>My name is</Text>,
                        value: this.state.survey.myName,
                        set: text => this.updateSurvey({myName: text})
                    })}
                    {this.renderDateInput(page++, {
                        label: <Text style={styles.text}>My birthday is</Text>,
                        value: this.state.survey.myBirthdate,
                        set: date => this.updateSurvey({myBirthdate: date})
                    })}
                    {this.renderSelect(page++, {
                        label: <Text style={styles.text}>My most significant other is my</Text>,
                        items: this.relationshipItems,
                        selectedItem: this.relationshipItems[0],
                        otherItem: {label: 'Other', color: 'yellow', icon: Assets.icons.star, value: 'other'},
                        set: item => this.updateSurvey({significantOtherRelationship: item.value})
                    })}
                    {this.renderTextInput(page++, {
                        label: <Text style={styles.text}>Their name is</Text>,
                        value: this.state.survey.significantOtherName,
                        set: text => this.updateSurvey({significantOtherName: text})
                    })}
                    {this.renderDateInput(page++, {
                        label: <Text style={styles.text}>Their Birthday is</Text>,
                        value: this.state.survey.significantOtherBirthdate,
                        set: text => this.updateSurvey({significantOtherBirthdate: text})
                    })}

                    <View style={styles.textHolder}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this.props.navigation.dispatch(
                                    NavigationActions.reset({
                                        index: 0,
                                        actions: [NavigationActions.navigate({routeName: 'HomePage'})]
                                    })
                                );
                            }}
                        >
                            <View>
                                <Text
                                    style={{
                                        paddingTop: 20,
                                        fontWeight: '500',
                                        alignSelf: 'center',
                                        fontSize: 22,
                                        color: '#5c6891'
                                    }}
                                >
                                    Meet Penny
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                </FullPan>
                {this.renderStars()}
            </View>
        );
    }

    private renderText(pageIndex: number, label: React.ReactNode, image?: React.ReactNode) {
        if (pageIndex !== this.state.pageIndex && pageIndex !== this.state.pageIndex - 1) {
            return null;
        }

        return (
            <View style={styles.textHolder}>
                {label}
                {image}
                {this.state.canProgress && <DownBounceArrow press={() => this.fullPan.progressIndex(1)}/>}
            </View>
        );
    }

    private renderTextInput(
        pageIndex: number,
        options: {
            label: React.ReactNode;
            value: string;
            set: (value: string) => void;
            upperText?: string;
        }
    ) {
        if (pageIndex !== this.state.pageIndex && pageIndex !== this.state.pageIndex - 1) {
            return null;
        }

        let {label, value, set, upperText} = options;
        return (
            <KeyboardAvoidingView style={styles.textHolder} behavior={'padding'}>
                {upperText && <Text style={[styles.text, {fontSize: 24}]}>{upperText}</Text>}
                {label}
                <TextInput
                    style={styles.textInput}
                    autoCapitalize={'words'}
                    returnKeyType={'next'}
                    onChangeText={text => set(text)}
                    value={value}
                />
                {this.state.canProgress && <DownBounceArrow press={() => this.fullPan.progressIndex(1)}/>}
            </KeyboardAvoidingView>
        );
    }

    private renderDateInput(
        pageIndex: number,
        options: {
            label: React.ReactNode;
            value: string;
            set: (value: string) => void;
            upperText?: string;
        }
    ) {
        if (pageIndex !== this.state.pageIndex && pageIndex !== this.state.pageIndex - 1) {
            return null;
        }

        let {label, value, set, upperText} = options;

        if (Platform.OS === 'android') {
            return (
                <TouchableWithoutFeedback
                    onPress={async () => {
                        const {action, year, month, day} = await DatePickerAndroid.open({
                            date: new Date(2000, 0, 1)
                        });
                        if (action !== DatePickerAndroid.dismissedAction) {
                            set(`${year}-${month + 1}-${day}`);
                        }
                    }}
                    style={styles.textHolder}
                >
                    <View style={styles.textHolder}>
                        {upperText && <Text style={[styles.text, {fontSize: 24}]}>{upperText}</Text>}
                        {label}
                        <Text
                            style={{
                                paddingTop: 20,
                                fontWeight: '500',
                                alignSelf: 'center',
                                fontSize: 22,
                                color: '#5c6891'
                            }}
                        >
                            {value || 'January 1st, 2000'}
                        </Text>
                        {this.state.canProgress && <DownBounceArrow press={() => this.fullPan.progressIndex(1)}/>}
                    </View>
                </TouchableWithoutFeedback>
            );
        } else {
            return (
                <View style={styles.textHolder}>
                    {upperText && <Text style={[styles.text, {fontSize: 24}]}>{upperText}</Text>}
                    {label}

                    <DatePickerIOS mode={'date'} date={new Date(value)} onDateChange={d => set(d.toDateString())}/>

                    {this.state.canProgress && <DownBounceArrow press={() => this.fullPan.progressIndex(1)}/>}
                </View>
            );
        }
    }

    private renderSelect(
        pageIndex: number,
        options: {
            label: React.ReactNode;
            items: HorizontalSelectorItem[];
            selectedItem: HorizontalSelectorItem;
            otherItem: HorizontalSelectorItem;
            set: (value: HorizontalSelectorItem) => void;
            upperText?: string;
        }
    ) {
        if (pageIndex !== this.state.pageIndex && pageIndex !== this.state.pageIndex - 1) {
            return null;
        }

        let {label, items, set, selectedItem, otherItem, upperText} = options;
        return (
            <View style={styles.textHolder}>
                {upperText && <Text style={[styles.text, {fontSize: 24}]}>{upperText}</Text>}
                {label}
                <HorizontalSelector
                    items={items}
                    onSelect={item => {
                        set(item);
                    }}
                    selectedItem={selectedItem}
                    extraItem={otherItem}
                />
                {this.state.canProgress && <DownBounceArrow press={() => this.fullPan.progressIndex(1)}/>}
            </View>
        );
    }

    private renderStars() {
        return this.state.stars.map((star, i) => (
            <Animated.Image
                key={i}
                style={[
                    styles.star,
                    {
                        transform: [
                            {translateX: star.translateX},
                            {translateY: star.translateY},
                            {scaleX: star.scale},
                            {scaleY: star.scale}
                        ]
                    }
                ]}
                source={Assets.elements.star}
            />
        ));
    }
}

let styles = StyleSheet.create({
    star: {
        height: 75,
        width: 75,
        position: 'absolute',
        opacity: 0.9
    },

    textHolder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    text: {
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-light',
        color: '#262926',
        marginHorizontal: 30,
        fontSize: 32,
        textAlign: 'center'
    },
    textInput: {
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-light',
        color: '#262926',
        margin: 20,
        fontSize: 32,
        textAlign: 'center'
    },
    picker: {
        color: '#262926',
        margin: 20
    }
});

// http://www.iconarchive.com/artist/dapino.html
