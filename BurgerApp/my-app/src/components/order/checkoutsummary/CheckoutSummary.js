import React from 'react';
import Burger from '../../burger/Burger';
import Button from '../../ui/button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary=(props)=>{
  return (
<div className={classes.CheckoutSummary}>
<h1>WE HOPE IT TASTES WELL</h1>
<div style={{width:'100%',margin:'auto'}}>
<Burger ingredent={props.ingredent}/>
</div>
<Button
btnType="Danger"
clicked={props.checkoutCancelled}>CANCEL</Button>
<Button
btnType="Success"
clicked={props.checkoutContinued}>CONTINUE</Button>
    </div>
  );
}

export default checkoutSummary;
