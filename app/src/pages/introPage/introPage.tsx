import React from 'react';
import {Animated, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import {hideHeader, Navigation} from 'src/utils/navigationUtils';
import FullPanComponent from 'src/components/fullPanComponent';
import {Utils} from 'src/utils/utils';
import {Assets} from 'src/assets';
import {HorizontalSelector, HorizontalSelectorItem} from '../../components/horizontalSelector';
import {DownBounceArrow} from './components/downBounceArrow';

interface Survey {
    gender?: string;
    significantOtherRelationship?: string;
    significantOtherName?: string;
}

interface State {
    stars: {translateX: Animated.Animated; translateY: Animated.Animated; scale: Animated.Animated}[];
    canProgress: boolean;
    canReverse: boolean;
    pageIndex: number;
    colors: string[];
    survey: Survey;
}

interface Props {}

@Navigation({
    ...hideHeader
})
export default class IntroPage extends React.Component<Props, State> {
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

    constructor(props: Props) {
        super(props);

        this.state = {
            stars: [],
            canReverse: true,
            canProgress: true,
            pageIndex: 0,
            colors: ['#60b6ff', '#ffabaa', '#af6fff', '#8fffa3', '#59d9ff'],
            survey: {}
        };
    }

    setupIndexAnimator(animator: Animated.Value, range: number): void {
        let introRange = Utils.range(range);

        this.setState(prev => ({
            ...prev,
            stars: Utils.range(6).map(() => ({
                translateX: animator.interpolate({
                    inputRange: introRange,
                    outputRange: introRange.map(() => Math.random() * Utils.getWindowWidth())
                }),
                translateY: animator.interpolate({
                    inputRange: introRange,
                    outputRange: introRange.map(() =>
                        Utils.randomFlip(
                            () => Math.random() * (Utils.getWindowHeight() * 0.25),
                            () => Utils.getWindowHeight() - Math.random() * (Utils.getWindowHeight() * 0.25)
                        )
                    )
                }),
                scale: animator.interpolate({
                    inputRange: introRange,
                    outputRange: introRange.map(() => Math.random() * 0.5 + 0.5)
                })
            }))
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
            case 6:
                canProgress = !!state.survey.gender;
                break;
            case 7:
                canProgress = !!state.survey.significantOtherRelationship;
                break;
            case 8:
                canProgress = !!state.survey.significantOtherName;
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
        return (
            <View style={{left: 0, right: 0, top: 0, bottom: 0}}>
                <FullPanComponent
                    colors={this.state.colors}
                    pageIndex={this.state.pageIndex}
                    indexAnimator={(animator, range) => this.setupIndexAnimator(animator, range)}
                    canProgress={this.state.canProgress}
                    canReverse={this.state.canReverse}
                    onIndexChange={index => this.updatePageIndex(index)}
                >
                    {this.renderText('This is Penny')}
                    {this.renderText('Penny is your relationship manager')}
                    {this.renderText('She will make you a rockstar')}
                    {this.renderText('The more information Penny knows about your significant others')}
                    {this.renderText('The more help Penny can provide you')}
                    {this.renderText(`Let's get started with a simple questionnaire`)}
                    {this.renderSelect({
                        upperText: 'Answer this:',
                        label: 'I am a',
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
                    {this.renderSelect({
                        label: 'My most significant other is my',
                        items: this.relationshipItems,
                        selectedItem: this.relationshipItems[0],
                        otherItem: {label: 'Other', color: 'yellow', icon: Assets.icons.star, value: 'other'},
                        set: item => this.updateSurvey({significantOtherRelationship: item.value})
                    })}
                    {this.renderTextInput({
                        label: 'Their name is',
                        value: this.state.survey.significantOtherName,
                        set: text => this.updateSurvey({significantOtherName: text})
                    })}
                </FullPanComponent>
                {this.renderStars()}
            </View>
        );
    }

    private renderText(label: string) {
        return (
            <View style={styles.textHolder}>
                <Text style={styles.text}>{label}</Text>
                <DownBounceArrow />
            </View>
        );
    }

    private renderTextInput(options: {label: string; value: string; set: (value: string) => void; upperText?: string}) {
        let {label, value, set, upperText} = options;
        return (
            <KeyboardAvoidingView style={styles.textHolder} behavior={'padding'}>
                {upperText && <Text style={[styles.text, {fontSize: 24}]}>{upperText}</Text>}
                <Text style={styles.text}>{label}</Text>
                <TextInput
                    style={styles.textInput}
                    autoCapitalize={'words'}
                    returnKeyType={'next'}
                    onChangeText={text => set(text)}
                    value={value}
                />
                {this.state.canProgress && <DownBounceArrow />}
            </KeyboardAvoidingView>
        );
    }

    private renderSelect(options: {
        label: string;
        items: HorizontalSelectorItem[];
        selectedItem: HorizontalSelectorItem;
        otherItem: HorizontalSelectorItem;
        set: (value: HorizontalSelectorItem) => void;
        upperText?: string;
    }) {
        let {label, items, set, selectedItem, otherItem, upperText} = options;
        return (
            <View style={styles.textHolder}>
                {upperText && <Text style={[styles.text, {fontSize: 24}]}>{upperText}</Text>}
                <Text style={styles.text}>{label}</Text>
                <HorizontalSelector
                    items={items}
                    onSelect={item => {
                        set(item);
                    }}
                    selectedItem={selectedItem}
                    extraItem={otherItem}
                />
                {this.state.canProgress && <DownBounceArrow />}
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
        margin: 20,
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
