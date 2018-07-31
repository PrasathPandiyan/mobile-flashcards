import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Platform, TextInput } from 'react-native';
import { connect } from 'react-redux'
import { Constants } from 'expo'
import { receiveEntries } from '../actions'
import { purple, white } from '../utils/colors'
import { getAllData,  addDeck } from '../utils/api';

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

class AddCardDeck extends React.Component {

    state = {
        question: '',
        answer: '',
    };
    toHome = (key) => {
        this.props.navigation.navigate(
            'Details',
            { header: key }
        );
    }
    submit = () => {
        const { dispatch } = this.props;
        var that = this;
        const { header, data } = this.props.navigation.state.params;
        const {question, answer } = this.state;
        if(!question && !answer) { return alert("Please fill all the inputs")}
        let data1 = data;
        data1[header].questions.push({question,  answer});
        addDeck(data1).then((val) =>  getAllData()
            .then((entries) => dispatch(receiveEntries(entries)))
            .then(({ entries }) => {
                that.toHome(header);
            }) );


    }

    render() {
        return (
            <View style={styles.container}>
                <FlashCardStatusBar backgroundColor={purple} barStyle="light-content" />
                <View style={styles.content}>
                <TextInput
                    style={styles.inputText}
                    onChangeText={(question) => this.setState({question})}
                    value={this.state.question}
                />

                <TextInput
                    style={styles.inputText}
                    onChangeText={(answer) => this.setState({answer})}
                    value={this.state.answer}
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
        marginBottom: 30,
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
)(AddCardDeck)