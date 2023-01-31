import { FilterOutlined, PlusOutlined } from '@ant-design/icons';
import PropType from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import UserSearch from "@/views/admin/components/UserSearch";

const OrdersNavbar = (props) => {
    const { totalOrdersCount, handleSearch, searchQuery} = props;
    const history = useHistory();

    return (
        <div className="product-admin-header">
            <h3 className="product-admin-header-title">
                Orders &nbsp;
                (
                {`${totalOrdersCount}`}
                )
            </h3>
            <UserSearch value={searchQuery} onchange={handleSearch}/>
            &nbsp;
        </div>
    );
};

OrdersNavbar.propTypes = {
    totalOrdersCount: PropType.number.isRequired
};

export default OrdersNavbar;