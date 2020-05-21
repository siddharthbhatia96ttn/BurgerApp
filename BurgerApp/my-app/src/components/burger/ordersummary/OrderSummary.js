import React from 'react';
import Aux from '../../../hoc/aux/Aux';
import Button from '../../ui/button/Button';

const OrderSummary =props =>{
  const ingredientSummary=Object.keys(props.ingredent)
  .map(igKey => {
    return(
      <li key={igKey}>
      <span style={{textTransform:'capitalize'}}>{igKey}</span>:{props.ingredent[igKey]}
      </li>
    );
  });
  return(    <Aux>
      <h3>Your Order</h3>
      <p>A delecious burger with the following ingredents</p>
      <ul>
      {ingredientSummary}
      </ul>
      <p><strong>Total Price:{props.price}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchasedCanceled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
      </Aux>);
     }

export default OrderSummary;
