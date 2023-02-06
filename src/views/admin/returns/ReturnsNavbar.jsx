import { FilterOutlined, PlusOutlined } from '@ant-design/icons';
import PropType from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import UserSearch from "@/views/admin/components/UserSearch";

const ReturnsNavbar = (props) => {
    const { totalReturnsCount, handleSearch, searchQuery} = props;
    const history = useHistory();

    return (
        <div className="product-admin-header">
            <h3 className="product-admin-header-title">
                Return &nbsp;
                (
                {`${totalReturnsCount}`}
                )
            </h3>
            <UserSearch value={searchQuery} onchange={handleSearch}/>
            &nbsp;
        </div>
    );
};

ReturnsNavbar.propTypes = {
    totalReturnsCount: PropType.number.isRequired
};

export default ReturnsNavbar;