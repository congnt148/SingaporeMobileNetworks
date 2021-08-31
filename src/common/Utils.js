import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appConfig} from './Config';

async function getApi(strUrl, nbody) {
  const config = {
    method: 'GET',
    url: appConfig.domain + strUrl,
    timeout: 60000,
    data: nbody,
    headers: {
      Accept: 'application/json',
      'Accept-Encoding': 'gzip',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axios(config);
    if (response.ExceptionMessage !== undefined) {
      //Error Handling
      return 500;
    }
    return response.data;
  } catch (error) {
    //Error Handling
    return 404;
  }
}
async function nsetStore(keys, value) {
  if (typeof value !== 'string') value = JSON.stringify(value);
  await AsyncStorage.setItem(keys, value);
}
async function ngetStore(keys, defaultValue = null) {
  let temp = await AsyncStorage.getItem(keys);
  if (temp == null) return defaultValue;
  try {
    let tempValue = JSON.parse(temp);
    return tempValue;
  } catch (error) {
    return temp;
  }
}
export default {getApi, nsetStore, ngetStore};
