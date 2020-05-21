import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredent from './burgeringredent/BurgerIngredent';

const burger=(props) => {
  console.log(props);
  let transformedIngredent=Object.keys(props.ingredent)
  .map(igKey =>{
    return [...Array(props.ingredent[igKey])].map((_,i)=>{
      console.log(i);
      return <BurgerIngredent key={igKey + i} type={igKey} />;//igKey=salad and i =1,2,3//creation of unique key for each ingredent
    });//[,] having array with 2 elements
  })
  .reduce((arr,el)=>{
    return arr.concat(el)
  },[]);
      console.log(transformedIngredent);
  if(transformedIngredent.length === 0)
  {
    transformedIngredent=<p>Please start adding ingredients</p>
  }
  return (
    <div className={classes.Burger}>
    <BurgerIngredent type="bread-top"/>
    {transformedIngredent}
    <BurgerIngredent type="bread-bottom"/>
    </div>
  );
};

export default burger;
