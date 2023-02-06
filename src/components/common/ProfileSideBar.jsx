import {USER_ORDER_TAB, USER_PROFILE, USER_RETURN_TAB} from '@/constants/routes';
import React from 'react';
import { NavLink } from 'react-router-dom';

const SideNavigation = () => (
  <aside className="sidenavigation" style={{paddingTop: "7rem"}}>
    <div className="sidenavigation-wrapper">
      <div className="sidenavigation-item">
        <NavLink
          activeClassName="sidenavigation-menu-active"
          className="sidenavigation-menu"
          to={USER_PROFILE}
        >
          Your profile
        </NavLink>
      </div>
      <div className="sidenavigation-item">
        <NavLink
            activeClassName="sidenavigation-menu-active"
            className="sidenavigation-menu"
            to={USER_RETURN_TAB}
        >
          Your Returns
        </NavLink>
      </div>
      <div className="sidenavigation-item">
        <NavLink
            activeClassName="sidenavigation-menu-active"
            className="sidenavigation-menu"
            to={USER_ORDER_TAB}
        >
          Your Orders
        </NavLink>
      </div>
    </div>
  </aside>
);

export default SideNavigation;
