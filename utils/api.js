import { AsyncStorage } from 'react-native'
import { setDummyData, MOBILE_FLASHING_CARDS_KEY, setData } from './data'


export function getAllData () {
  return AsyncStorage.getItem(MOBILE_FLASHING_CARDS_KEY)
    .then(setData)
}

export function addDeck (data1) {
    return AsyncStorage.mergeItem(MOBILE_FLASHING_CARDS_KEY, JSON.stringify(data1))
}