import { FilterOutlined, PlusOutlined } from '@ant-design/icons';
import PropType from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import UserSearch from "@/views/admin/components/UserSearch";

const UsersNavbar = (props) => {
    const { totalUsersCount, handleSearch, searchQuery} = props;
    const history = useHistory();

    return (
        <div className="product-admin-header">
            <h3 className="product-admin-header-title">
                Users &nbsp;
                (
                {`${totalUsersCount}`}
                )
            </h3>
            <UserSearch value={searchQuery} onchange={handleSearch}/>
            &nbsp;
        </div>
    );
};

UsersNavbar.propTypes = {
    totalUsersCount: PropType.number.isRequired
};

export default UsersNavbar;