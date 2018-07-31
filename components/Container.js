import React from 'react';
import { Button, Text, View } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons'; // Version can be specified in package.json
import { createBottomTabNavigator } from 'react-navigation'; // Version can be specified in package.json
import StackNavigationCard from './StackNavigationCard';
import AddDeck from './AddDeck';

export default createBottomTabNavigator(
    {
        Home: StackNavigationCard,
        AddDeck: AddDeck,
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `ios-home${focused ? '' : '-outline'}`;
                    return <Ionicons name={iconName} size={25} color={tintColor} />;
                } else if (routeName === 'AddDeck') {
                    iconName = `plus-square${focused ? '' : '-o'}`;
                    return <FontAwesome name={iconName} size={25} color={tintColor} />;
                }
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    }
);
