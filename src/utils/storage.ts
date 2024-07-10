import AsyncStorage from '@react-native-async-storage/async-storage';

const saveToLocalStorage = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(`${key?.toLowerCase()}`, jsonValue);
  } catch (e) {
    console.log(e, 'error occured while saving');
  }
};
const fetchFromLocalStorage = async (key: string) => {
  try {
    console.log(key, 'data fetching');
    const jsonValue = await AsyncStorage.getItem(key?.toLowerCase());
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e, 'error occured while reading');
  }
};
const getAllKeys = async () => {
  let keys: string[] = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    console.log(e, 'error occured while reading keys');
  }

  console.log(keys, 'keys savedd');
  return keys;
};
export {saveToLocalStorage, fetchFromLocalStorage, getAllKeys};
