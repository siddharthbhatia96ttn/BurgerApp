import React from 'react';
import classes from './Order.module.css';

const order=(props)=>{
  const ingredent=[];
  for(let ingredentName in props.ingredent){
    ingredent.push({name:ingredentName,amount:props.ingredent[ingredentName]
    }
  );
  }
  const ingredentOutput=ingredent.map(ig=>{
    return <span
    style={{
      textTransform:'capitalize',
      display:'inline-block',
      margin:'0 8px',
      border:'1px solid #ccc',
      padding:'5px'
    }}
    key={ig.name}>{ig.name}({ig.amount})</span>;
  });
  return(
    <div className={classes.Order}>
    <p>Ingredients:{ingredentOutput}</p>
    <p>Price<strong>INR {props.price}</strong></p>
    </div>

  );

};

export default order;
