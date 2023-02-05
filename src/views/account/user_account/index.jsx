/* eslint-disable react/no-multi-comp */
import { LoadingOutlined } from '@ant-design/icons';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import React, { lazy, Suspense } from 'react';
import UserTab from '../components/UserTab';
import {NavLink} from "react-router-dom";
import {ACCOUNT, USER_ORDER_TAB, USER_PROFILE, USER_RETURN_TAB} from "@/constants/routes";
import UserReturnTab from "@/views/account/components/UserReturnTab";

const UserAccountTab = lazy(() => import('../components/UserAccountTab'));
const UserWishListTab = lazy(() => import('../components/UserReturnTab'));
const UserOrdersTab = lazy(() => import('../user_order/index'));

const Loader = () => (
  <div className="loader" style={{ minHeight: '80vh' }}>
    <LoadingOutlined />
    <h6>Loading ... </h6>
  </div>
);

const UserAccount = () => {
  useScrollTop();
  useDocumentTitle('My Account');

  return (
    <UserTab>
      <div index={0} label="Account">
        <Suspense fallback={<Loader />}>
            <UserAccountTab/>
        </Suspense>
      </div>
      <div index={1} label="Returns">
        <Suspense fallback={<Loader />}>
            <UserReturnTab/>
        </Suspense>
      </div>
      <div index={2} label="My Orders">
        <Suspense fallback={<Loader />}>
           <UserOrdersTab/>
        </Suspense>
      </div>
    </UserTab>
  );
};

export default UserAccount;
