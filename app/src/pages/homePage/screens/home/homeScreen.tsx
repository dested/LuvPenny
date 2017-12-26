import React from 'react';
import {styles} from './styles';
import {BottomScrollViewPadding} from '../../components/bottomScrollViewPadding';
import {RefreshControl, ScrollView, View} from 'react-native';
import {ScrollViewFader} from '../../components/scrollViewFader';
import {MainScrollView} from '../../components/mainScrollView/mainScrollView';

interface Props {
    refreshing: boolean;
    onRefresh: () => void;
}

interface State {}

export class HomeScreen extends React.Component<Props, State> {
    constructor(props: Props, context: any) {
        super(props, context);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.body}>
                <MainScrollView refreshing={this.props.refreshing} onRefresh={() => this.props.onRefresh()}>
                    <View style={styles.topCard} />
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((k, i) => <View key={i} style={styles.card} />)}
                </MainScrollView>
            </View>
        );
    }
}
