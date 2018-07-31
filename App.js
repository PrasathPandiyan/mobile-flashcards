import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import reducer from './reducers'
import { setLocalNotification } from './utils/helpers'
import StackNavigationCard from './components/StackNavigationCard';


export default class App extends React.Component {
    componentDidMount() {
        setLocalNotification()
    }
  render() {
      return (
        <Provider store={createStore(reducer)}>
            <View style={{flex: 1}}>
            <StackNavigationCard/>
            </View>
        </Provider>

    );
  }
}

