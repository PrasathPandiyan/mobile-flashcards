import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import reducer from './reducers'
import { setLocalNotification } from './utils/helpers'
import Container from './components/Container';


export default class App extends React.Component {
    componentDidMount() {
        setLocalNotification()
    }
  render() {
      return (
        <Provider store={createStore(reducer)}>
            <View style={{flex: 1}}>
            <Container/>
            </View>
        </Provider>

    );
  }
}

