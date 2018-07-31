import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Platform, TextInput } from 'react-native';
import { connect } from 'react-redux'
import { Constants } from 'expo'
import { receiveEntries } from '../actions'
import { purple, white } from '../utils/colors'
import {getAllData, addDeck} from '../utils/api';

function FlashCardStatusBar ({backgroundColor, ...props}) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}


function SubmitBtn ({ onPress }) {
    return (
        <TouchableOpacity
            style={styles.btn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    )
}

class AddDeck extends React.Component {

    state = {
        text: '',
    };

    submit = () => {
        const { dispatch } = this.props;
        var that = this;
        const key = this.state.text;
        if(!key) { return alert("Please enter Deck Title")}
        const { data } = this.props.navigation.state.params;
        let data1 = data;
        data1[key] = {title: key, questions: []};
        addDeck(data1).then((val) =>  getAllData()
            .then((entries) => dispatch(receiveEntries(entries)))
            .then(({ entries }) => {
                that.props.navigation.navigate(
                    'Details',
                    { header: key }
                )}
            ));
    }

    render() {
        return (
            <View style={styles.container}>
                <FlashCardStatusBar backgroundColor={purple} barStyle="light-content" />
                <View style={styles.content}>
                <Text style={styles.textStyle}>What is the title of the Deck</Text>
                <TextInput
                    style={styles.inputText}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />

                <SubmitBtn onPress={this.submit} />
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        paddingTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    inputText: {
        height: 50,
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        margin: 'auto',
        alignSelf: 'stretch',
        textAlign: 'center',
        borderRadius: 7
    },
    textStyle: {
        color: 'black',
        fontSize: 40,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 50
    },
    btn: {
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 7,
        borderColor: 'white',
        borderWidth: 1,
        height: 60,
        width: 200,
        marginLeft: 40,
        marginRight: 40,
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    }
});

function mapStateToProps (entries) {
    return {
        entries
    }
}

export default connect(
    mapStateToProps,
)(AddDeck)