import * as actionTypes from './actionTypes';
import Axios from 'axios';

export const addIngredient = (ing, price) => {
  return {
    type: actionTypes.ADD_INGREDIENT, 
    ingredient: ing, 
    ingPrice: price
  }
}; 

export const removeIngredient = (ing, price) => {
  return {
    type: actionTypes.SUBTRACT_INGREDIENT, 
    ingredient: ing, 
    ingPrice: price
  }
}; 

export const initIngredients = (ingredients) => {
  return {
    type: actionTypes.INIT_INGREDIENTS,
    ingredients: ingredients
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}
export const setIngredients = () => {
  return dispatch => {
    Axios.get( 'https://react-my-burger-67bd7.firebaseio.com/ingredients.json' )
    .then( response => {
        dispatch( initIngredients(response.data) );
    } )
    .catch( error => {
       dispatch(fetchIngredientsFailed())
    } );
  }
}