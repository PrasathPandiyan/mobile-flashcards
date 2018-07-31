import React from 'react';
import { TouchableHighlight } from 'react-native';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import { black } from '../utils/colors'
import { Ionicons } from '@expo/vector-icons'
import Home from './Home';
import ViewCard from './ViewCard';
import QuesCard from './QuesCard';
import AddDeck from './AddDeck';
import AddCardDeck from './AddCardDeck';
import ThankYou from './ThankYou';

const Left = ({ onPress }) => (
    <TouchableHighlight>
        <Ionicons name='md-arrow-back' size={30} color='black' onPress={onPress}/>
    </TouchableHighlight>
);

export default createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: () => ({
            headerLeft: null
        }),
    },
    Details: {
        screen: ViewCard,
        navigationOptions: ({navigation}) => {
            const header = navigation.state.params.header;
            return {
            title: header,
            headerLeft:(
                <Left onPress={ () => {navigation.goBack() }} />
            ),
        }},
    },
    Quiz: {
        screen: QuesCard,
        navigationOptions: ({navigation}) => {
            return {
                title: 'Quiz',
                headerLeft:(
                    <Left onPress={ () => {navigation.goBack() }} />
                ),
            }},
    },
    AddCard: {
        screen: AddCardDeck,
        navigationOptions: ({navigation}) => {
            return {
                title: 'Add Card',
                /*headerStyle: {
                    backgroundColor: 'black',
                },*/
                headerLeft:(
                    <Left onPress={ () => {navigation.goBack() }} />
                ),
            }},
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: ({navigation}) => {
            return {
                title: 'Add Deck',
                headerLeft:(
                    <Left onPress={ () => {navigation.goBack() }} />
                ),
            }},
    },
    ThankYou: {
        screen: ThankYou,
        navigationOptions: () => ({
            headerLeft: null
        }),
    },
},
    {
        initialRouteName: 'Home',
    });