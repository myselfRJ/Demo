import {HttpStatus, fetchAPI} from './fetchApi';
import {URLS} from './urls';

const queryRecipeByName = async (recipe: string) => {
  try {
    const {data, status} = await fetchAPI({
      endpoint: URLS.queryRecipe(recipe),
      method: 'GET',
    });
    console.log('api call');
    if (status === HttpStatus.OK) {
      console.log('recipe information list==>', data);
      return {data, status};
    } else {
      console.log('recipe information error', status, data);
    }
  } catch (error) {
    console.log('Error fetching recipe list==>', error);
  }
};
const getRecipeById = async (id: string) => {
  try {
    const {data, status} = await fetchAPI({
      endpoint: URLS.getRecipeById(id),
      method: 'GET',
    });

    if (status === HttpStatus.OK) {
      console.log('recipe information info==>', data);
      return {data, status};
    } else {
      console.log('recipe information info error', status, data);
    }
  } catch (error) {
    console.log('Error fetching recipe info==>', error);
  }
};
export {queryRecipeByName, getRecipeById};
