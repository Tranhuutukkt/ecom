import { Basket } from '@/components/basket';
import { Footer, Navigation } from '@/components/common';
import * as ROUTES from '@/constants/routes';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import * as view from '@/views';
import AdminRoute from './AdminRoute';
import ClientRoute from './ClientRoute';
import PublicRoute from './PublicRoute';
import UserInfo from "@/views/admin/components/UserInfo";
import ProfileRoute from "@/routers/ProfileRoute";

// Revert back to history v4.10.0 because
// v5.0 breaks navigation
export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <>
      <Navigation />
      <Basket />
      <Switch>
        <Route
          component={view.Search}
          exact
          path={ROUTES.SEARCH}
        />
        <ClientRoute
          component={view.Home}
          exact
          path={ROUTES.HOME}
        />
        <Route
          component={view.Shop}
          exact
          path={ROUTES.SHOP}
        />
        <Route
          component={view.FeaturedProducts}
          exact
          path={ROUTES.FEATURED_PRODUCTS}
        />
        <Route
          component={view.RecommendedProducts}
          exact
          path={ROUTES.RECOMMENDED_PRODUCTS}
        />
        <Route
          component={view.SuggestedProducts}
          exact
          path={ROUTES.SUGGESTED_PRODUCTS}
        />
        <PublicRoute
          component={view.SignUp}
          path={ROUTES.SIGNUP}
        />
        <PublicRoute
          component={view.SignIn}
          exact
          path={ROUTES.SIGNIN}
        />
        <PublicRoute
          component={view.ForgotPassword}
          path={ROUTES.FORGOT_PASSWORD}
        />
        <Route
          component={view.ViewProduct}
          path={ROUTES.VIEW_PRODUCT}
        />
        <Route
            component={view.ReturnForm}
            exact
            path={ROUTES.RETURN_REQUEST}
        />
        <ProfileRoute
          component={view.UserAccount}
          exact
          path={ROUTES.ACCOUNT}
        />
        <ProfileRoute
            component={view.UserOrder}
            exact
            path={ROUTES.USER_ORDER_TAB}
        />
        <ProfileRoute
            component={view.UserReturn}
            exact
            path={ROUTES.USER_RETURN_TAB}
        />
        <ProfileRoute
            component={view.Profile}
            exact
            path={ROUTES.USER_PROFILE}
        />
        <ProfileRoute
          component={view.EditAccount}
          exact
          path={ROUTES.ACCOUNT_EDIT}
        />
        <ClientRoute
          component={view.CheckOutStep1}
          path={ROUTES.CHECKOUT_STEP_1}
        />
        <ClientRoute
          component={view.CheckOutStep2}
          path={ROUTES.CHECKOUT_STEP_2}
        />
        <ClientRoute
          component={view.CheckOutStep3}
          path={ROUTES.CHECKOUT_STEP_3}
        />
        <AdminRoute
          component={view.Dashboard}
          exact
          path={ROUTES.ADMIN_DASHBOARD}
        />
        <AdminRoute
          component={view.Products}
          path={ROUTES.ADMIN_PRODUCTS}
        />
        <AdminRoute
            component={view.Users}
            path={ROUTES.ADMIN_USERS}
        />
        <AdminRoute
          component={view.AddProduct}
          path={ROUTES.ADD_PRODUCT}
        />
        <AdminRoute
            component={view.Orders}
            path={ROUTES.ADMIN_ORDERS}
        />
        <AdminRoute
            component={view.Returns}
            path={ROUTES.ADMIN_RETURNS}
        />
        <AdminRoute
            component={view.ViewOrder}
            path={`${ROUTES.VIEW_ORDER}/:id`}
        />
        <AdminRoute
            component={view.ViewReturn}
            path={`${ROUTES.VIEW_RETURN}/:id`}
        />
        <AdminRoute
          component={view.EditProduct}
          path={`${ROUTES.EDIT_PRODUCT}/:id`}
        />
        <PublicRoute component={view.PageNotFound} />
      </Switch>
      <Footer />
    </>
  </Router>
);

export default AppRouter;
