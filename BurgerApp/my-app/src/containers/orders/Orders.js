import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import axios from '../../Axios-Orders';
import Order from '../../components/order/Order';
import withErrorHandler from '../../hoc/witherrorhandeller/WithErrorHandeller';
import * as actions from '../../store/actions/Index';
import Spinner from '../../components/ui/spinner/Spinner';

const Orders = (props) =>{
  const { onFetchOrders }=props;
    useEffect(()=>{
      onFetchOrders(props.token, props.userId);
    },[onFetchOrders]);

        let orders = <Spinner />;
        if ( !props.loading ) {
            orders = props.orders.map( order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ) )
        }
        return (
            <div>
                {orders}
            </div>
        );
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch( actions.fetchOrders(token, userId) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Orders, axios ) );
