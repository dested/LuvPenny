import React from 'react';
import {Animated, NativeSyntheticEvent, RefreshControl, ScrollView} from 'react-native';
import {BottomScrollViewPadding} from '../bottomScrollViewPadding';
import {ScrollViewFader} from '../scrollViewFader';

interface State {
    scrollPosition: Animated.Value;
}

interface Props {
    children: any;
    onRefresh: () => void;
    refreshing: boolean;
}

const Aux = (props: any) => props.children;

export class MainScrollView extends React.Component<Props, State> {
    constructor(props: Props, context: any) {
        super(props, context);
        this.state = {
            scrollPosition: new Animated.Value(0)
        };
    }

    render() {
        return (
            <Aux>
                <ScrollView
                    scrollEventThrottle={16}
                    onScroll={Animated.event([
                        {
                            nativeEvent: {
                                contentOffset: {
                                    y: this.state.scrollPosition
                                }
                            }
                        }
                    ])}
                    refreshControl={(
                        <RefreshControl refreshing={this.props.refreshing} onRefresh={() => this.props.onRefresh()}/>
                    )}
                >
                    {this.props.children}
                    <BottomScrollViewPadding/>
                </ScrollView>
                <ScrollViewFader scrollPosition={this.state.scrollPosition}/>
            </Aux>
        );
    }
}
