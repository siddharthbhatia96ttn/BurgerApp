import * as actionTypes from '../actions/ActionTypes';
import { updateObject } from '../../shared/Utility';

const initialState={
  ingredent:null,
  totalPrice:40,
  error:false,
  building:false
};

const ingredentPrice={
  salad:5,
  cheese:4,
  meat:10,
  bacon:7
};
const addIngredent=(state,action)=>{
  const updatedIngredent={[action.ingredentName]:state.ingredent[action.ingredentName]+1}
  const updatedIngredents=updateObject(state.ingredent,updatedIngredent);
  const updatedState={
    ingredent:updatedIngredents,
    totalPrice:state.totalPrice+ingredentPrice[action.ingredentName],
    building:true
  }
  return updateObject(state,updatedState);
};

const removeIngredent=(state,action)=>{
  const updatedIng={[action.ingredentName]:state.ingredent[action.ingredentName]-1}
  const updatedIngs=updateObject(state.ingredent,updatedIng);
  const updatedSt={
    ingredent:updatedIngs,
    totalPrice:state.totalPrice-ingredentPrice[action.ingredentName],
    building:true
  }
  return updateObject(state,updatedSt);
};

const setIngredent=(state,action)=>{
  return updateObject(state,{
    ingredent:{
      salad:action.ingredent.salad,
      bacon:action.ingredent.bacon,
      cheese:action.ingredent.cheese,
      meat:action.ingredent.meat
      /*setting up order for ingredent*/
    },
    totalPrice:40,
    error:false,
    building:false
  });
}

const fetchIngre=(state,action)=>{
  return updateObject(state,{error:true});
};

const reducer=(state=initialState,action)=>{
  switch( action.type ){
    case actionTypes.ADD_INGREDIENT:return addIngredent(state,action);

    case actionTypes.REMOVE_INGREDIENT:return removeIngredent(state,action);

    case actionTypes.SET_INGREDIENTS:return setIngredent(state,action);

     case actionTypes.FETCH_INGREDIENTS_FAILED:return fetchIngre(state,action);

    default:return state;
  }
};

export default reducer;
