import * as actionTypes from '../actions/actionTypes';

const initialState = {
 ingredients: null,
 price: 4,
 error: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: 
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] + 1
        },
        price: state.price + action.ingPrice
      } 
    case actionTypes.SUBTRACT_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] - 1
        },
        price: state.price - action.ingPrice
      };
    case actionTypes.INIT_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat
        },
        error: false
      }
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      };
    }

    
    
  return state;
}

export default reducer;