import React,{ useState } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/navigation/toolbar/Toolbar';
import Aux from '../aux/Aux';
import SideDrawer from '../../components/navigation/sidedrawer/SideDrawer';
import { connect } from 'react-redux';

const Layout = props => {
const [sideDrawerIsVisible,setSideDrawerIsVisible]=useState(false);

const sideDrawerClosedHandeler = () => {
  setSideDrawerIsVisible(false);
}

  const sideDrawerToggleHandeler =() =>
  {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  }

    return (
          <Aux>
          <Toolbar
          isAuth={props.isAutheticated}
          drawerToggleClicked={sideDrawerToggleHandeler}/>
          <SideDrawer
          isAuth={props.isAuthenticated}
          open={sideDrawerIsVisible}
          closed={sideDrawerClosedHandeler}/>

          <main className={classes.Content}>
          {props.children}
          </main>
          </Aux>
    );
}

const mapStateToProps=state=>{
return{
isAutheticated:state.auth.token!==null
};
};

export default connect (mapStateToProps)(Layout);
