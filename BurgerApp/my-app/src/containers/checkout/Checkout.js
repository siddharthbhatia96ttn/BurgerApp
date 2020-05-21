import React from 'react';
import { Route,Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/order/checkoutsummary/CheckoutSummary';
import ContactData from './contactdata/ContactData';
import { connect } from 'react-redux';
//import * as actions from '../../store/actions/Index';

const Checkout = (props) => {

  const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

  const  checkoutContinuedHandler = () => {
        props.history.replace( '/checkout/contact-data' );
    }

        let summary = <Redirect to="/" />
        if ( props.ings ) {
            const purchasedRedirect = props.purchased ? <Redirect to="/"/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredent={props.ings}
                        checkoutCancelled={checkoutCancelledHandler}
                        checkoutContinued={checkoutContinuedHandler} />
                    <Route
                        path={props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            );
        }
        return summary;
}
    const mapStateToProps =state=>{
      return{
        ings:state.burgerBuilder.ingredent,
        purchased:state.order.purchased
      }
    };

export default connect( mapStateToProps )( Checkout );
