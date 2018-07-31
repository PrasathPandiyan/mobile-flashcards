// Utilities for backfilling the calendar.

import { AsyncStorage } from 'react-native'

export const MOBILE_FLASHING_CARDS_KEY = 'Udacity:flashingCards'

export function setData (results) {
    return results === null
        ? setDummyData()
        : JSON.parse(results);
};

export function setDummyData () {
    const dummyData = {
        React: {
            title: 'React',
            questions: [
                {
                    question: 'Is React A library for managing user interfaces?',
                    answer: true
                },
                {
                    question: 'We cannot make Ajax requests componentDidMount lifecycle event in React?',
                    answer: false
                }
            ]
        },
        JavaScript: {
            title: 'JavaScript',
            questions: [
                {
                    question: 'Is combination of a function and the lexical environment within which that function was declared is called a closure?',
                    answer: true
                }
            ]
        }
    };

    AsyncStorage.setItem(MOBILE_FLASHING_CARDS_KEY, JSON.stringify(dummyData))

    return dummyData
}
