import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Animated } from 'react-native';
import {purple, white} from "../utils/colors";
import {Constants} from "expo";
import { setLocalNotification, clearLocalNotification } from '../utils/helpers'
import {connect} from "react-redux";

function FlashCardStatusBar ({backgroundColor, ...props}) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

class QuesSection extends React.Component {

    state = {
        isAnswer: true,
    }
    componentWillMount() {
        const { flipValue = 0 } = this.props;
        this.animatedValue = new Animated.Value(0);
        this.value = flipValue;
        this.animatedValue.addListener(({ value }) => {
            this.value = value;
        })
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        })
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })
    }

    flipContent() {
        if (this.value >= 90) {
            Animated.spring(this.animatedValue,{
                toValue: 0,
                friction: 8,
                tension: 10
            }).start();
            this.setState({isAnswer: true});

        } else {
            Animated.spring(this.animatedValue,{
                toValue: 180,
                friction: 8,
                tension: 10
            }).start();
            this.setState({isAnswer: false});
        }
    }

    showAnswer = () => {

    };

    render() {
        const frontAnimation = {
            transform: [
                { rotateY: this.frontInterpolate}
            ]
        }
        const backAnimation = {
            transform: [
                { rotateY: this.backInterpolate }
            ]
        }

        const { question, answer } = this.props;
        return(
            <View>
                <View style={styles.innerContainer}>
                    <Animated.View style={[styles.flipCard, frontAnimation]}>
                        <Text style={styles.cardSet}>
                            {question}
                        </Text>
                    </Animated.View>
                    <Animated.View style={[backAnimation, styles.flipCard, styles.flipCardBack]}>
                        <Text style={styles.cardSet}>
                            {answer.toString()}
                        </Text>
                    </Animated.View>
                    <Text >
                        <TouchableOpacity onPress={() => this.flipContent()}>
                            <Text style={styles.answerText}>{this.state.isAnswer ? 'View Answer' :  'Question'}</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </View>
        )
    }
}

class QuesCard extends React.Component {
    state = {
        quesNo: 1,
        correctAnswer: 0,
        wrongAnswer: 0,
        showAnswer: false,
        flipValue: 0,
    }

    onPress = (val) => {
        const { data } = this.props;
        const { header }  = this.props.navigation.state.params;
        const questions  = data[header].questions;
        const { correctAnswer, wrongAnswer, quesNo } = this.state;
        let ans = correctAnswer;
        let wrong = wrongAnswer;
        this.setState({flipValue: 0});
        console.log('val', val);
        if (val) {
            ans = ans + 1;
            this.setState({correctAnswer: correctAnswer + 1});
        } else {
            wrong = wrong + 1;
            this.setState({wrongAnswer: wrongAnswer + 1});
        }
        if (questions.length == (ans + wrong)) {
            const percentage = ((ans - wrong)/questions.length * 100);
            clearLocalNotification()
                .then(setLocalNotification);
            this.props.navigation.navigate(
                'ThankYou',
                { percentage, header }
            );
        } else {
            this.setState({quesNo: quesNo + 1})
        }
    };
    render() {
        const { data } = this.props;
        const { header }  = this.props.navigation.state.params;
        const questions  = data[header].questions;
        const { quesNo } = this.state;

        return(
            <View style={styles.container}>
                <FlashCardStatusBar backgroundColor={purple} barStyle="light-content" />
                <Text style={styles.cardQuestion}> {quesNo} / {questions.length}</Text>
                <QuesSection question={questions[quesNo-1].question} flipValue={this.state.flipValue} answer={questions[quesNo-1].answer} />
                <View style={[styles.innerContainer, styles.content]}>
                    <TouchableOpacity
                        style={styles.btn1}
                        onPress={() => this.onPress(true)}>
                        <Text style={styles.submitBtnText}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn2}
                        onPress={() => this.onPress(false)}>
                        <Text style={styles.submitBtnText}>InCorrect</Text>
                    </TouchableOpacity>
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
    cardQuestion: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 30
    },
    cardSet: {
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
    answerText: {
        paddingTop: 30,
        color: 'red',
        fontSize: 22,
        alignSelf: 'stretch',
    },
    cardHeader: {
        fontSize: 40,
        color: 'black',
    },
    cardCount: {
        fontSize: 30,
        color: 'gray',
        padding: 5,
    },
    viewStyle: {
        padding: 50,
        borderColor: 'black',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flipCard: {
        alignItems: 'center',
        justifyContent: 'center',
        backfaceVisibility: 'hidden',
    },
    flipCardBack: {
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        position: 'absolute',
        backfaceVisibility: 'hidden',
    },
    flipText: {
        width: 90,
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    }
});

function mapStateToProps (data) {
    return {
        data
    }
}

export default connect(
    mapStateToProps,
)(QuesCard)