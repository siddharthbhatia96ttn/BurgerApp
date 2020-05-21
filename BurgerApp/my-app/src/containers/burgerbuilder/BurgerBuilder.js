import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
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

  const {onInitIngredients}=props;

  useEffect(()=>{
    props.onInitIngredients();
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
    if(props.isAuthenticated){
        setPurchasing(true);
    }
    else {
      props.onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  }
const purchaseCancelHandeler=()=>{
    setPurchasing(false);
  }

  const purchaseContinueHandeler=() =>
  {
    props.onInitPurchase();
props.history.push('/checkout');
  }

    const disabledInfo={
      ...props.ings
    };
    for(let key in disabledInfo)
    {
      disabledInfo[key]=disabledInfo[key]<=0
    }
    let orderSummary=null;
    let burger=props.error ? <p>Ingedients can't be loaded</p>:<Spinner/>
    if(props.ings){
      burger=(
          <Aux>
          <Burger ingredent={props.ings}/>
          <BuildControls
          ingredentAdded={props.onIngredentAdded}
          ingredentRemoved={props.onIngredentRemoved}
          disabled={disabledInfo}
          purchasable={updatePurchaseState(props.ings)}
          ordered={purchaseHandeler}
          isAuth={props.isAuthenticated}
          price={props.price}
          />
          </Aux>
        );

        orderSummary=(<OrderSummary ingredent={props.ings}
            price={props.price}
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
}
const mapStateToProps=state=>{
  return {
    ings:state.burgerBuilder.ingredent,
    price:state.burgerBuilder.totalPrice,
    error:state.burgerBuilder.error,
    isAuthenticated:state.auth.token!==null
  };
}
const mapDispatchToProps=dispatch=>{
  return{
    onIngredentAdded:(ingName)=>dispatch(actions.addIngredent(ingName)),
    onIngredentRemoved:(ingName)=>dispatch(actions.removeIngredent(ingName)),
    onInitIngredients:()=>dispatch(actions.initIngredent()),
    onInitPurchase:()=>dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath:(path)=>(actions.setAuthRedirectPath(path))
  };
}
 export default connect (mapStateToProps,mapDispatchToProps)(withErrorHandeler(BurgerBuilder,axios));
