/* eslint-disable react/forbid-prop-types */
import PropType from 'prop-types';
import React from 'react';
import { UserItem } from '.';
import {NavLink} from "react-router-dom";
import {useModal} from "@/hooks";
import {ADMIN_USERS, VIEW_USER} from "@/constants/routes";
import UserInfo from "@/views/admin/components/UserInfo";

const UsersTable = ({ filteredUsers }) => {
    const {isOpenModal, onOpenModal, onCloseModal} = useModal();
    return (
        <div>
            {filteredUsers.length > 0 && (
                <div className="grid grid-product grid-count-6">
                    <div className="grid-col"/>
                    <div className="grid-col">
                        <h5>Name</h5>
                    </div>
                    <div className="grid-col">
                        <h5>Email</h5>
                    </div>
                    <div className="grid-col">
                        <h5>Date Joined</h5>
                    </div>
                    <div className="grid-col">
                        <h5>Role</h5>
                    </div>
                    <div className="grid-col">
                        <h5>Status</h5>
                    </div>
                </div>
            )}
            {filteredUsers.length === 0 ? new Array(10).fill({}).map((user, index) => (
                <UserItem
                    // eslint-disable-next-line react/no-array-index-key
                    key={`product-skeleton ${index}`}
                    user={user}
                />
            )) : filteredUsers.map((user) => (
                <div onClick={() => <UserInfo user={user}/>} key={user.id}
                >
                    <UserItem
                        user={user}
                    />
                    <br/>
                </div>


            ))}
        </div>
    );
};

UsersTable.propTypes = {
    filteredUsers: PropType.array.isRequired
};

export default UsersTable;
