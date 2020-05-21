import * as actionTypes from './ActionTypes';
import axios from '../../Axios-Orders';
export const addIngredent=(name)=>{
  return{
    type:actionTypes.ADD_INGREDIENT,
    ingredentName:name
  };
};

export const removeIngredent=(name)=>{
  return{
    type:actionTypes.REMOVE_INGREDIENT,
    ingredentName:name
  };
};


export const setIngredent=(ingredent)=>{
  return{
    type:actionTypes.SET_INGREDIENTS,
    ingredent:ingredent
  };
};

export const fetchIngredentsFailed=()=>{
  return {
    type:actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredent=()=>{
  return dispatch=>{
      axios.get('https://react-my-burger-91338.firebaseio.com/ingredients.json')
      .then(response=>{
        dispatch(setIngredent(response.data));
      })
      .catch(error=>{
        dispatch(fetchIngredentsFailed());
      });
  };
};
