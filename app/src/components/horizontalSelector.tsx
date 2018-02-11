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

interface Item {
    color: string;
    icon: ImageRequireSource;
    label: string;
}

interface Props {
    extraItem?: Item;
    items: Item[];
    selectedItem: Item;
    onSelect: (r: Item) => void;
    highlightColor?: string;
}

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
            let position = Math.round(this.scrollPosition / 90);
            this.scrollView.scrollTo({x: position * 90, animated: true});
        }, 300);
    }

    private selectItem(r: Item) {
        this.scrollToIndex(this.props.items.indexOf(r));
        this.props.onSelect(r);
    }

    private selectExtra() {
        this.scrollToIndex(this.props.items.length);
    }

    private scrollToIndex(index: number) {
        this.scrollView.scrollTo({x: index * 90, animated: true});
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

let halfScreen = Dimensions.get('screen').width / 2 - 45;
let styles = StyleSheet.create({
    header: {
        height: 120,
        flexDirection: 'row'
    },
    leftPadding: {
        width: halfScreen
    },
    rightPadding: {
        width: halfScreen - 90
    },
    highlight: {
        marginLeft: halfScreen + 5,
        marginTop: 20,
        width: 80,
        height: 80,
        borderWidth: 3,
        borderRadius: 45,
        top: 0,
        bottom: 0,
        position: 'absolute',
        opacity: 0.7
    }
});

interface ItemProps {
    item: Item;
    index: number;
    scrollPosition: Animated.AnimatedInterpolation;
    onSelect: () => void;
}

let ItemComponent: React.SFC<ItemProps> = props => {
    let imageBodyStyles = {
        marginTop: 20,
        width: 68,
        height: 68,
        borderRadius: 34,
        backgroundColor: props.item.color
    };

    let imageStyles = {
        width: 64,
        height: 64,
        borderRadius: 32
    };

    return (
        <TouchableOpacity style={itemStyles.body} onPress={() => props.onSelect()}>
            <View style={itemStyles.innerBody}>
                <View style={[itemStyles.imageBody, imageBodyStyles]}>
                    <Image source={props.item.icon} style={[itemStyles.image, imageStyles]} />
                </View>
                <Text style={[itemStyles.text, {opacity: 1}]}>{props.item.label}</Text>
            </View>
        </TouchableOpacity>
    );
};

let itemStyles = StyleSheet.create({
    body: {
        height: 120,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerBody: {
        height: 90,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {},
    imageBody: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        paddingTop: 5,
        fontSize: 10,
        ...CommonStyles.thickFont
    }
});
