import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../logo/Logo';
import NavigationItems from '../navigationitems/NavigationItems';
import DrawerToggle from '../sidedrawer/drawertoggle/DrawerToggle';

const toolbar=(props) => (
  <header className={classes.Toolbar}>
  <DrawerToggle clicked={props.drawerToggleClicked}/>
  <div className={classes.Logo}>
  <Logo/>
  </div>
  <nav classes={classes.DesktopOnly}>
    <NavigationItems isAuthenticated={props.isAuth}/>
  <NavigationItems/>
  </nav>
  </header>
);

export default toolbar;
