import React from 'react';
import {StyleSheet, View} from 'react-native';
import {MainScrollView} from '../../components/mainScrollView/mainScrollView';
import {CommonStyles} from '../../../../utils/commonStyles';
import {Container} from '../../../../components/container';
import {Card} from '../../../../components/card';

interface Props {
    refreshing: boolean;
    onRefresh: () => void;
}

export class PlusScreen extends React.Component<Props> {
    render() {
        return (
            <View style={styles.body}>
                <MainScrollView refreshing={this.props.refreshing} onRefresh={() => this.props.onRefresh()}>
                    {[1, 2, 3, 4].map((k, i) => (
                        <Container key={i}>
                            <Card style={styles.card} />
                        </Container>
                    ))}
                </MainScrollView>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'stretch',
        ...CommonStyles.pageBackgroundColor,
        borderLeftWidth: StyleSheet.hairlineWidth
    },
    card: {
        height: 160,
        borderColor: '#ACFACA'
    }
});
