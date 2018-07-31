import React from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import { Constants } from 'expo'
import { receiveEntries } from '../actions'
import { purple, white } from '../utils/colors'
import { getAllData } from '../utils/api';

function FlashCardStatusBar ({backgroundColor, ...props}) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

class Home extends React.Component {

    state = {
        data: null,
    }
    componentDidMount () {
        const { dispatch } = this.props

        getAllData()
            .then((entries) => dispatch(receiveEntries(entries)))
            .then(({ entries }) => {
                this.setState({data: entries});
            })
            .then(() => this.setState(() => ({ready: true})))
    }

    render() {
        const { data } = this.props;
        let list = [];
        if (data) {
            list = Object.keys(data);
        }
        return (

            <ScrollView style={styles.container}>
                <FlashCardStatusBar backgroundColor={purple} barStyle="light-content" />

                { !data ? (<ActivityIndicator size="small" color="black" />)
                : (
                    <View>
                        {list.map((key) => (
                            <View key={key} style={styles.viewStyle}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate(
                                        'Details',
                                        { header: key, data }
                                    )}>
                            <Text style={styles.cardHeader}> {data[key].title} </Text>
                            <Text style={styles.cardCount}>
                                {data[key].questions.length} {data[key].questions.length > 1 ? 'cards' : 'card'}
                            </Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                    )}
                {<View key='newKey' style={styles.viewStyle}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate(
                            'AddDeck',
                            { header: 'NewKey', data }
                        )}>
                        <Text style={styles.cardHeader}> Add Deck </Text>
                        <Text style={styles.cardCount}>
                            0 card
                        </Text>
                    </TouchableOpacity>
                </View>}
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
    cardHeader: {
        fontSize: 40,
        color: 'black',
    },
    cardCount: {
        fontSize: 30,
        color: 'gray',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    viewStyle: {
        padding: 30,
        borderColor: 'black',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

function mapStateToProps (data) {
    return {
        data
    }
}

export default connect(
    mapStateToProps,
)(Home)