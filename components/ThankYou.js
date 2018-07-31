import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import {purple, white} from "../utils/colors";
import {Constants} from "expo";

function FlashCardStatusBar ({backgroundColor, ...props}) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

export default class ThankYou extends React.Component {

    backToDeck = () => {
        const { header }  = this.props.navigation.state.params;
        this.props.navigation.navigate(
            'Details',
            { header }
        );
    };

    restartQuiz = () => {
        const { header }  = this.props.navigation.state.params;
        this.props.navigation.navigate(
            'Quiz',
            { header }
        )
    }
    render() {
        const { percentage }  = this.props.navigation.state.params;
        return(
            <View style={styles.container}>
                <FlashCardStatusBar backgroundColor={purple} barStyle="light-content" />
                <View style={styles.innerContainer}>
                <Text style={styles.percentage}> Your Percentage is {percentage < 0 ? 0 : Math.round(percentage)} </Text>
                <View style={styles.content}>
                    <TouchableOpacity
                        style={styles.btn1}
                        onPress={this.restartQuiz}>
                        <Text style={styles.submitBtnText}>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn2}
                        onPress={this.backToDeck}>
                        <Text style={styles.submitBtnText}>Back To Deck</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    innerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding:10,

    },
    content: {
        paddingTop: 20,
    },
    percentage: {
        paddingTop: 20,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 30
    },
    btn2: {
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 7,
        borderColor: 'black',
        borderWidth: 1,
        height: 60,
        width: 200,
        marginLeft: 40,
        marginRight: 40,
    },
    btn1: {
        backgroundColor: 'green',
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
        textAlign: 'center',
    },
    viewStyle: {
        padding: 50,
        borderColor: 'black',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});