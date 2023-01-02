/* eslint-disable indent */
import { ImageLoader } from '@/components/common';
import { displayDate } from '@/helpers/utils';
import PropType from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

const UserInfo = ({user}) => {
    return (
        <div className="user-profile" style={{width: "400px"}}>
            <div className="user-profile-block">
                <div className="user-profile-banner">
                    <div className="user-profile-banner-wrapper">
                        <ImageLoader
                            alt="Banner"
                            className="user-profile-banner-img"
                            src={user.banner}
                        />
                    </div>
                    <div className="user-profile-avatar-wrapper">
                        <ImageLoader
                            alt="Avatar"
                            className="user-profile-img"
                            src={user.avatar}
                        />
                    </div>
                </div>
                <div className="user-profile-details">
                    <h2 className="user-profile-name">{user.fullname}</h2>
                    <span>Email</span>
                    <br />
                    <h5>{user.email}</h5>
                    <span>Address</span>
                    <br />
                    {user.address ? (
                        <h5>{user.address}</h5>
                    ) : (
                        <h5 className="text-subtle text-italic">Address not set</h5>
                    )}
                    <span>Mobile</span>
                    <br />
                    {user.mobile ? (
                        <h5>{user.mobile.value}</h5>
                    ) : (
                        <h5 className="text-subtle text-italic">Mobile not set</h5>
                    )}
                    <span>Date Joined</span>
                    <br />
                    {user.dateJoined ? (
                        <h5>{displayDate(user.dateJoined)}</h5>
                    ) : (
                        <h5 className="text-subtle text-italic">Not available</h5>
                    )}
                    <br/>
                </div>
            </div>
        </div>
    );
};

UserInfo.propTypes = {
    history: PropType.shape({
        push: PropType.func
    }).isRequired
};

export default withRouter(UserInfo);
