import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TouchableHighlight } from 'react-native';
import {black, purple, white} from "../utils/colors";
import { Ionicons } from '@expo/vector-icons'
import {Constants} from "expo";
import {connect} from "react-redux";

function FlashCardStatusBar ({backgroundColor, ...props}) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

class ViewCard extends React.Component {

    state = {
        data: null,
    }
    addCard = () => {
        const { header }  = this.props.navigation.state.params;
        const { data } =this.props;
        const questions = data[header].questions;
        this.props.navigation.navigate(
            'AddCard',
            { header, questions, data,  route: 'addCard' }
        )
    }

    onStartQuiz = () => {
        const { header }  = this.props.navigation.state.params;
        this.props.navigation.navigate(
            'Quiz',
            { header }
        )
    };
    render() {
        const { header }  = this.props.navigation.state.params;
        const { data } =this.props;
        return(
            <View style={styles.container}>
                <FlashCardStatusBar backgroundColor={purple} barStyle="light-content" />
                {data && (

                    <View>
                <Text style={styles.cardHeader}> {header}</Text>
                <Text style={styles.cardCount}>
                    {data[header].questions.length} {data[header].questions.length > 1 ? 'cards' : 'card'}
                    </Text>
                <View style={styles.content}>
                <TouchableOpacity
                    style={styles.btn1}
                    onPress={this.addCard}>
                    <Text style={styles.submitBtnText1}>Add Card</Text>
                </TouchableOpacity>
                    {data[header].questions.length > 0 && (
                <TouchableOpacity
                    style={styles.btn2}
                    onPress={this.onStartQuiz}>
                    <Text style={styles.submitBtnText}>Start Quiz</Text>
                </TouchableOpacity>
                    )}
                </View>
                </View>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        paddingTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },

    btn2: {
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
    btn1: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 7,
        borderColor: 'black',
        borderWidth: 1,
        height: 60,
        width: 200,
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 20

    },
    submitBtnText: {
        color: 'white',
        fontSize: 22,
        alignSelf: 'center'
    },
    submitBtnText1: {
        color: 'black',
        fontSize: 22,
        alignSelf: 'center'
    },
    cardHeader: {
        fontSize: 40,
        color: 'black',
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    cardCount: {
        fontSize: 30,
        color: 'gray',
        padding: 5,
        alignSelf: "center"
    },
    viewStyle: {
        padding: 50,
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

export default connect(mapStateToProps)(ViewCard)