import React, { useState,useEffect,useCallback } from 'react';
import { connect,useDispatch,useSelector } from 'react-redux';
import Aux from '../../hoc/aux/Aux';
import Burger from '../../components/burger/Burger';
import BuildControls from '../../components/burger/buildcontrols/BuildControls';
import Modal from '../../components/ui/modal/Modal';
import OrderSummary from  '../../components/burger/ordersummary/OrderSummary';
import Spinner from '../../components/ui/spinner/Spinner';
import withErrorHandeler from '../../hoc/witherrorhandeller/WithErrorHandeller';
import * as actions from '../../store/actions/Index';
import axios from '../../Axios-Orders';

export const BurgerBuilder = (props) =>
{
  const [purchasing,setPurchasing]=useState(false);

//extracting pieces of info from our redux selector managing as 4 individual state
  const ings = useSelector(state=>{
    return state.burgerBuilder.ingredent;
  });

  const price=useSelector(state=>{
    return state.burgerBuilder.totalPrice;
  });

  const error=useSelector(state=>{
    return state.burgerBuilder.error;
  });

  const isAuthenticated=useSelector(state=>{
    return state.auth.token!==null
  })

    const dispatch =useDispatch();
    const onIngredentAdded=ingName=>dispatch(actions.addIngredent(ingName));
    const onIngredentRemoved=ingName=>dispatch(actions.removeIngredent(ingName));
    const onInitIngredients=useCallback(()=>dispatch(actions.initIngredent()),[dispatch]);
    const onInitPurchase=()=>dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath=path=>dispatch(actions.setAuthRedirectPath(path));


  useEffect(()=>{
    onInitIngredients();
  },[onInitIngredients]);

const updatePurchaseState=(ingredent)=>
  {
    const sum=Object.keys(ingredent)
    .map(igKey =>{
      return ingredent[igKey];
    })
    .reduce((sum,el)=>{
      return sum+el;
    },0);
    return sum>0;
  }

const purchaseHandeler = () => {
    if(isAuthenticated){
        setPurchasing(true);
    }
    else {
      onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  }
const purchaseCancelHandeler=()=>{
    setPurchasing(false);
  }

  const purchaseContinueHandeler=() =>
  {
    onInitPurchase();
props.history.push('/checkout');
  }

    const disabledInfo={
      ...ings
    };
    for(let key in disabledInfo)
    {
      disabledInfo[key]=disabledInfo[key]<=0
    }
    let orderSummary=null;
    let burger=error ? <p>Ingedients can't be loaded</p>:<Spinner/>
    if(ings){
      burger=(
          <Aux>
          <Burger ingredent={ings}/>
          <BuildControls
          ingredentAdded={onIngredentAdded}
          ingredentRemoved={onIngredentRemoved}
          disabled={disabledInfo}
          purchasable={updatePurchaseState(ings)}
          ordered={purchaseHandeler}
          isAuth={isAuthenticated}
          price={price}
          />
          </Aux>
        );

        orderSummary=(<OrderSummary ingredent={ings}
            price={price}
            purchasedCanceled={purchaseCancelHandeler}
            purchaseContinued={purchaseContinueHandeler}
            />);
    }

    return(
      <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandeler}>
        {orderSummary}
      </Modal>
      {burger}
      </Aux>
    );
};

export default withErrorHandeler (BurgerBuilder, axios);
