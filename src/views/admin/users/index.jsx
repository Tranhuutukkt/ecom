/* eslint-disable react/jsx-props-no-spreading */
import { Boundary } from '@/components/common';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { UsersNavbar } from '../components';
import UsersTable from "@/views/admin/components/UsersTable";
import {getAllUser} from "@/redux/actions/userActions";

const Users = () => {
    useDocumentTitle('User List | TeiTouShopping Admin');
    useScrollTop();

    const [searchQuery, setSearchQuery] = useState("");
    const [query, setQuery] = useState(undefined);

    const dispatch = useDispatch();

    const store = useSelector((state) => ({
        users: state.users,
        requestStatus: state.app.requestStatus,
        isLoading: state.app.loading
    }));

    useEffect(() => {
        dispatch(getAllUser());
    }, []);

    const handleSearch = query =>{
        setSearchQuery(query);
    }

    const handleStatusChange = query =>{
        setQuery(query);
    }

    const getData = () => {
        let userList = store.users.users;
        if (searchQuery) {
            userList = store.users.users.filter(
                u => u.fullname.toLowerCase().match(searchQuery.toLowerCase()) ||
                    u.email.toLowerCase().match(searchQuery.toLowerCase())
            );
        }
        if (query !== undefined) {
            userList = store.users.users.find(
                u => u.status === query
            );
        }
        return {filteredUsers: userList}
    }

    const {filteredUsers} = getData();

    return (
        <Boundary>
            <div>
                <UsersNavbar
                    totalUsersCount={store.users.total || 0}
                    handleSearch={handleSearch}
                />
                <select
                    className="filters-brand"
                    value={query}
                    onChange={handleStatusChange}
                >
                    <option value="">Status</option>
                    <option value="">All</option>
                    <option value="true">Active</option>
                    <option value="false">Locked</option>
                </select>
                <div className="product-admin-items">
                    <UsersTable filteredUsers={filteredUsers} />
                </div>
            </div>

        </Boundary>
    );
};

export default withRouter(Users);
