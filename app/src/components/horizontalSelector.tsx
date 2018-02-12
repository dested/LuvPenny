import React, {Component, Fragment} from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ImageRequireSource,
    NativeSyntheticEvent,
    ScrollView,
    ScrollViewStatic,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {CommonStyles} from '../utils/commonStyles';

export interface HorizontalSelectorItem {
    color: string;
    value: string;
    icon: ImageRequireSource;
    label: string;
}

interface Props {
    extraItem?: HorizontalSelectorItem;
    items: HorizontalSelectorItem[];
    selectedItem: HorizontalSelectorItem;
    onSelect: (r: HorizontalSelectorItem) => void;
    highlightColor?: string;
}

const circleSize = 96;
const padding = 16;
const circleSizeWithPadding = 96 + padding;

interface State {
    scrollPosition: Animated.Value;
}

export class HorizontalSelector extends Component<Props, State> {
    public static defaultProps: Partial<Props> = {
        highlightColor: '#7df0e2'
    };

    private scrollView: ScrollView;
    private scrollPosition: number;

    constructor(props: Props) {
        super(props);
        this.state = {
            scrollPosition: new Animated.Value(0)
        };
        this.state.scrollPosition.addListener(r => {
            this.scrollPosition = Math.abs(r.value);
        });
    }

    private snapDragPosition() {
        setTimeout(() => {
            let position = Math.round(this.scrollPosition / circleSizeWithPadding);
            this.scrollView.scrollTo({x: position * circleSizeWithPadding, animated: true});
        }, 300);
    }

    private selectItem(r: HorizontalSelectorItem) {
        this.scrollToIndex(this.props.items.indexOf(r));
    }

    private selectExtra() {
        this.scrollToIndex(this.props.items.length);
    }

    private scrollToIndex(index: number) {
        this.scrollView.scrollTo({x: index * circleSizeWithPadding, animated: true});
        this.props.onSelect(this.props.items[index]);
    }

    render() {
        let animatedDivision = Animated.divide(this.state.scrollPosition, new Animated.Value(90));
        return (
            <View style={styles.header}>
                <ScrollView
                    ref={r => (this.scrollView = r as any)}
                    scrollEventThrottle={16}
                    onScroll={Animated.event([
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: this.state.scrollPosition
                                }
                            }
                        }
                    ])}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    onScrollEndDrag={() => this.snapDragPosition()}
                >
                    <View style={styles.leftPadding} />
                    {this.props.items.map((r, i) => (
                        <ItemComponent
                            key={i}
                            index={i + 1}
                            scrollPosition={animatedDivision}
                            item={r}
                            onSelect={() => this.selectItem(r)}
                        />
                    ))}
                    {this.props.extraItem ? (
                        <Fragment>
                            <View style={styles.rightPadding} />
                            <ItemComponent
                                index={this.props.items.length + 1}
                                scrollPosition={animatedDivision}
                                item={this.props.extraItem}
                                onSelect={() => this.selectExtra()}
                            />
                        </Fragment>
                    ) : (
                        <View style={styles.leftPadding} />
                    )}
                </ScrollView>
                <View style={[styles.highlight, {borderColor: this.props.highlightColor}]} pointerEvents={'none'} />
            </View>
        );
    }
}

let halfScreen = Dimensions.get('screen').width / 2 - circleSize / 2;
let styles = StyleSheet.create({
    header: {
        flexDirection: 'row'
    },
    leftPadding: {
        width: halfScreen
    },
    rightPadding: {
        width: halfScreen - circleSizeWithPadding - padding
    },
    highlight: {
        marginLeft: halfScreen,
        marginTop: padding / 2,
        width: circleSize + padding,
        height: circleSize + padding,
        borderWidth: 3,
        borderRadius: circleSizeWithPadding / 2,
        top: 0,
        bottom: 0,
        position: 'absolute',
        opacity: 0.7
    }
});

interface ItemProps {
    item: HorizontalSelectorItem;
    index: number;
    scrollPosition: Animated.AnimatedInterpolation;
    onSelect: () => void;
}

let ItemComponent: React.SFC<ItemProps> = props => {
    return (
        <TouchableOpacity style={itemStyles.body} onPress={() => props.onSelect()}>
            <View style={itemStyles.innerBody}>
                <View style={[itemStyles.imageBody, {backgroundColor: props.item.color}]}>
                    <Image source={props.item.icon} style={itemStyles.image} />
                </View>
                <Text style={[itemStyles.text, {opacity: 1}]}>{props.item.label}</Text>
            </View>
        </TouchableOpacity>
    );
};

let itemStyles = StyleSheet.create({
    body: {
        width: circleSizeWithPadding,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2
    },
    innerBody: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: padding / 2
    },
    imageBody: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: padding / 2,
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2
    },
    text: {
        paddingTop: 8,
        fontSize: 15,
        ...CommonStyles.thickFont
    }
});
