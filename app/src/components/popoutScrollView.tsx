import React, {Component} from 'react';
import {findNodeHandle, NativeScrollPoint, ScrollView, StyleSheet, UIManager} from 'react-native';

interface State {}

interface Props {}

export default class PopOutScrollView extends Component<Props, State> {
    nodeIds: number[];
    private scrollPosition: NativeScrollPoint;

    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        this.nodeIds = [];
        const children = React.Children.map(this.props.children, (child: any, index: number) => {
            return React.cloneElement(child, {
                ref: (r: any) => {
                    this.nodeIds[index] = findNodeHandle(r);
                }
            });
        });
        return (
            <ScrollView onScroll={s => (this.scrollPosition = s.nativeEvent.contentOffset)} style={{flex: 1}}>
                {children}
            </ScrollView>
        );
    }

    getPosition(index: number): Promise<{x: number; y: number; width: number; height: number}> {
        return new Promise(res => {
            UIManager.measureInWindow(this.nodeIds[index], (x: number, y: number, width: number, height: number) => {
                let position = {x: x, y: y, width: width, height: height};
                res(position);
            });
        });
    }
}
