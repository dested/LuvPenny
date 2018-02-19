import React from 'react';
import {
    Animated,
    Platform,
    StyleSheet,
    Text,
    View,
    PanResponderInstance, PanResponder, Image
} from 'react-native';
import {hideHeader, Navigation} from 'src/utils/navigationUtils';
import {Utils} from 'src/utils/utils';
import {DownBounceArrow} from './components/downBounceArrow';
import {Penny} from 'src/components/penny';
import {TransitionerProps} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import {Assets} from '../../assets';
import {AnimatedLinearGradient} from '../../components/animatedLinearGradient';
import {Animator} from 'src/utils/animator';


interface State {
    pageIndex: number;
    indexAnimator: Animated.Value;
    nonNativeIndexAnimator: Animated.Value;
}

interface Props extends TransitionerProps {
}

@Navigation({
    ...hideHeader
})
export default class Intro2Page extends React.Component<Props, State> {
    canPan: boolean = true;
    panResponder: PanResponderInstance;

    constructor(props: Props) {
        super(props);

        this.state = {
            pageIndex: 0,
            indexAnimator: new Animated.Value(0),
            nonNativeIndexAnimator: new Animated.Value(0)
        };
    }


    componentWillMount(): void {
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dy) > 10 || Math.abs(gestureState.dx) > 10,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => Math.abs(gestureState.dy) > 10 || Math.abs(gestureState.dx) > 10,
            onPanResponderMove: (evt, gestureState) => {
                if (this.canPan) {
                    if (gestureState.dy < -15) {
                        if (this.state.pageIndex < 11/*todo*/) {
                            this.progressIndex(+1);
                        }
                    }
                    if (gestureState.dy > 15) {
                        if (this.state.pageIndex > 0) {
                            this.progressIndex(-1);
                        }
                    }
                }
            },
            onPanResponderRelease: () => {
                this.canPan = true;
            }
        });
    }


    public progressIndex(amount: number) {
        this.setState(
            (prev) => {
                Animated.timing(this.state.indexAnimator, {
                    toValue: this.state.pageIndex + amount,
                    duration: 500,
                    useNativeDriver: true
                }).start();
                Animated.timing(this.state.nonNativeIndexAnimator, {
                    toValue: this.state.pageIndex + amount,
                    duration: 500
                }).start();
                return {...prev, canPan: false, pageIndex: this.state.pageIndex + amount};
            }
        );
        this.canPan = false;
    }


    render() {
        let range = Utils.range(12);
        const scrollPosition = this.state.indexAnimator.interpolate({
            inputRange: range,
            outputRange: range.map(a => -a * Utils.getWindowHeight())
        });


        const numberOfPages = 12;
        let animatedDivision = Animated.divide(this.state.nonNativeIndexAnimator, numberOfPages);
        let animatedAddition = Animated.add(animatedDivision, .4);

        let page = 0;
        return (
            <View style={{flex: 1}}>
                <AnimatedLinearGradient
                    style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}
                    colors={['rgba(100,179,244,.95)', 'rgba(194,229,156,.85)', 'rgba(100,179,244,.95)']}
                    location0={0}
                    location1={animatedDivision}
                    location2={animatedAddition}
                />
                <View style={{left: 0, right: 0, top: 0, bottom: 0, position: 'absolute'}} {...this.panResponder.panHandlers}>
                    {this.renderText(page++,
                        <Text style={styles.text}>This is {<Penny/>}</Text>, scrollPosition
                    )}
                    {this.renderText(page++,
                        <Text style={styles.text}>
                            {<Penny/>} is your <Text style={{color: '#d36053'}}>relationship ma1nager</Text>
                        </Text>, scrollPosition
                    )}
                    {this.renderText(page++,
                        <Text style={styles.text}>
                            {<Penny/>} is your <Text style={{color: '#d36053'}}>relationship man2ager</Text>
                        </Text>, scrollPosition
                    )}
                    {this.renderText(page++,
                        <Text style={styles.text}>
                            {<Penny/>} is your <Text style={{color: '#d36053'}}>relationship mana3ger</Text>
                        </Text>, scrollPosition
                    )}
                    {this.renderText(page++,
                        <Text style={styles.text}>
                            {<Penny/>} is your <Text style={{color: '#d36053'}}>relationship mana4ger</Text>
                        </Text>, scrollPosition
                    )}
                    {this.renderText(page++,
                        <Text style={styles.text}>
                            {<Penny/>} is your <Text style={{color: '#d36053'}}>relationship ma5nager</Text>
                        </Text>, scrollPosition
                    )}
                    {this.renderText(page++,
                        <Text style={styles.text}>
                            <Penny she/> will make you a{' '}
                            <Text style={{fontWeight: '500', color: '#7b001a'}}>rocks6tar</Text>
                        </Text>, scrollPosition
                    )}
                    {this.renderText(page++,
                        <Text style={styles.text}>
                            The more information {<Penny/>} knows about{' '}
                            <Text style={{fontWeight: '500', color: '#387b1a'}}>you</Text> and1 your{' '}
                            <Text style={{fontWeight: '500', color: '#387b1a'}}>significant others</Text>
                        </Text>, scrollPosition
                    )}
                    {this.renderText(page++,
                        <Text style={styles.text}>
                            The more help {<Penny/>} can provide{' '}
                            <Text style={{fontWeight: '500', color: '#387b1a'}}>y2ou</Text>
                        </Text>, scrollPosition
                    )}
                </View>

            </View>
        );
    }

    private renderText(page: number, label: React.ReactNode, scrollPosition: Animated.Animated) {
        if (this.state.pageIndex !== page && this.state.pageIndex - 1 !== page) {
            return null;
        }


        return (

            <View
                style={{
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    height: Utils.getWindowHeight(),
                    width: Utils.getWindowWidth()
                }}
            >
                {
                    this.state.pageIndex === page ?
                        <Animator.FadeAndBump in={true} duration={600} distance={15}>
                            <View style={styles.textHolder}>
                                {label}
                            </View>
                        </Animator.FadeAndBump>
                        :
                        <Animator.FadeAndBump in={false} duration={600} distance={-100}>
                            <View style={styles.textHolder}>
                                {label}
                            </View>
                        </Animator.FadeAndBump>
                }
                <DownBounceArrow press={() => this.progressIndex(1)}/>


            </View>
        );
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
        color: '#ffffff',
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
