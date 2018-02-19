import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MainScrollView} from '../../components/mainScrollView/mainScrollView';
import {CommonStyles} from 'src/utils/commonStyles';
import {Container} from 'src/components/container';
import {Card} from 'src/components/card';

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
                    <Container>
                        <Card style={styles.topCard}>
                            <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
                                <Text style={{alignSelf: 'center'}}>hi</Text>
                                <Text style={{alignSelf: 'center'}}>hi</Text>
                                <Text style={{alignSelf: 'center'}}>hi</Text>
                            </View>
                        </Card>
                    </Container>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((k, i) => (
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
        ...CommonStyles.pageBackgroundColor
    },
    card: {
        height: 140,
        borderColor: '#dde27c'
    },
    topCard: {
        height: 340,
        borderColor: '#9ce243'
    }
});
