import React from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {hideHeader, Navigation} from '../../utils/navigationUtils';
import {Assets} from '../../assets';
import FullPanComponent from '../../components/fullPanComponent';
import {Utils} from '../../utils/utils';

interface State {
    stars: {animationX: Animated.Animated; animationY: Animated.Animated}[];
}

interface Props {}

@Navigation({
    ...hideHeader
})
export default class IntroPage extends React.Component<Props, State> {
    intro: {text: string; color: string}[];

    constructor(props: Props) {
        super(props);
        this.intro = [
            {text: 'This is Penny', color: '#548eca'},
            {text: 'Penny is your relationship manager', color: '#ffacaa'},
            {text: 'She will make you a rockstar', color: '#8e5ace'},
            {text: 'The more information Penny knows about your significant others', color: '#4f8e5a'},
            {text: 'The more help Penny can provide you', color: '#48acca'}
        ];
        this.state = {stars: []};
    }

    setupIndexAnimator(animator: Animated.Value): void {
        let introRange = Utils.range(this.intro.length);

        this.setState(prev => ({
            ...prev,
            stars: Utils.range(6).map(() => ({
                animationX: animator.interpolate({
                    inputRange: introRange,
                    outputRange: introRange.map(() => Math.random() * Utils.getWindowWidth())
                }),
                animationY: animator.interpolate({
                    inputRange: introRange,
                    outputRange: introRange.map(() =>
                        Utils.randomFlip(
                            () => Math.random() * (Utils.getWindowHeight() * 0.35),
                            () => Utils.getWindowHeight() - Math.random() * (Utils.getWindowHeight() * 0.35)
                        )
                    )
                })
            }))
        }));
    }

    render() {
        return (
            <View style={{left: 0, right: 0, top: 0, bottom: 0}}>
                <FullPanComponent
                    items={this.intro.map(c => ({
                        color: c.color,
                        component: (
                            <View style={styles.textHolder}>
                                <Text style={styles.text}>{c.text}</Text>
                            </View>
                        )
                    }))}
                    introIndexAnimator={animator => this.setupIndexAnimator(animator)}
                />
                {this.state.stars.map((star, i) => (
                    <Animated.Image
                        key={i}
                        style={[
                            styles.star,
                            {transform: [{translateX: star.animationX}, {translateY: star.animationY}]}
                        ]}
                        source={Assets.elements.star}
                    />
                ))}
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
        alignItems: 'center'
    },
    text: {
        fontSize: 32,
        textAlign: 'center'
    }
});
