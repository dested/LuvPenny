import React from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import {styles} from './styles';
import {BottomScrollViewPadding} from '../../components/bottomScrollViewPadding';
import {ScrollViewFader} from '../../components/scrollViewFader';
import {MainScrollView} from '../../components/mainScrollView/mainScrollView';

interface Props {
    refreshing: boolean;
    onRefresh: () => void;
}

export class PlusScreen extends React.Component<Props> {
    render() {
        return (
            <View style={styles.body}>
                <MainScrollView refreshing={this.props.refreshing} onRefresh={() => this.props.onRefresh()}>
                    {[1, 2, 3, 4].map((k, i) => <View key={i} style={styles.card} />)}
                </MainScrollView>
            </View>
        );
    }
}
