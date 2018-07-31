import React from 'react';
import { Button, Text, View } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons'; // Version can be specified in package.json
import { createBottomTabNavigator } from 'react-navigation'; // Version can be specified in package.json
import StackNavigationCard from './StackNavigationCard';
import AddDeck from './AddDeck';

export default createBottomTabNavigator(
    {
        Home: { screen: StackNavigationCard,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: ({ tintColor }) => <Ionicons name='ios-home' size={30} color={tintColor} />
            },},
        AddDeck: { screen: AddDeck,
            navigationOptions: {
                tabBarLabel: 'Add Deck',
                tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
            },
        },
    }, /*{
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                } else if (routeName === 'AddDeck') {
                    iconName = `ios-options${focused ? '' : '-outline'}`;
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={25} color={tintColor}/>;
            },
        })
    },*/
    {
        tabBarOptions: {
            activeTintColor: 'blue',
            style: {
                height: 56,
                backgroundColor: 'white',
                shadowColor: 'rgba(0, 0, 0, 0.24)',
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 6,
                shadowOpacity: 1
            }
        }
    }
);
