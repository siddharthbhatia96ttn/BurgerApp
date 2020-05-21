import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './buildcontrol/BuildControl';

const controls=[
  {label:'Salad',type:'salad'},
  {label:'Bacon',type:'bacon'},
  {label:'Cheese',type:'cheese'},
  {label:'Meat',type:'meat'},
];

const buildControls= (props) => (
  <div className={classes.BuildControls}>
  <p>Current Price:<strong>{props.price}</strong></p>
  {controls.map(ctrl =>(
    <BuildControl key={ctrl.label}
    label={ctrl.label}
    added={()=>props.ingredentAdded(ctrl.type)}
    removed={()=>props.ingredentRemoved(ctrl.type)}
    disabled={props.disabled[ctrl.type]}
    />
  ))}
  <button className={classes.OrderButton}
  disabled={!props.purchasable}
  onClick={props.ordered}
  >{props.isAuth ? '' : 'SignUp to '}Order Now </button>
  </div>
);

export default buildControls;
