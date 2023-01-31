import {ImageLoader, Modal} from '@/components/common';
import { displayActionMessage, displayDate, displayMoney } from '@/helpers/utils';
import PropType from 'prop-types';
import React, {Fragment, useEffect, useRef} from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import {useModal} from "@/hooks";
import UserInfo from "@/views/admin/components/UserInfo";
import {changeStatus} from "@/redux/actions/userActions";

const UserItem = ({user}) => {
    const { isOpenModal, onOpenModal, onCloseModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();
    const userRef = useRef(null);

    const onClickEdit = () => {
        history.push(`${USER}/${user.id}`);
    };

    const onChangeStatus = () => {
        userRef.current.classList.toggle('item-active');
    };

    const onCancelChange = () => {
        userRef.current.classList.remove('item-active');
    };

    const onConfirmChange = () => {
        const newData = user;
        newData.status = newData.status!==undefined? !newData.status : false;
        dispatch(changeStatus(newData));
        userRef.current.classList.remove('item-active');
    };

    return (
        <Fragment>
            <SkeletonTheme
                color="#e1e1e1"
                highlightColor="#f2f2f2"
            >
                <div
                    className={`item item-products ${!user.id && 'item-loading'}`}
                    ref={userRef}
                >
                    <div className="grid grid-count-6">
                        <div className="grid-col item-img-wrapper">
                            {user.avatar ? (
                                <ImageLoader
                                    alt={user.fullname}
                                    className="item-img"
                                    src={user.avatar}
                                />
                            ) : <Skeleton width={50} height={30} />}
                        </div>
                        <div className="grid-col">
                            <span className="text-overflow-ellipsis">{user.fullname || ""}</span>
                        </div>
                        <div className="grid-col">
                            <span>{user.email || ""}</span>
                        </div>
                        <div className="grid-col">
                        <span>
                             {user.dateJoined ? displayDate(user.dateJoined) : ""}
                        </span>
                        </div>
                        <div className="grid-col">
                            <span>{user.role || ""}</span>
                        </div>
                        <div className="grid-col">
                            <span>{user.status===false?"Locked":"Active"}</span>
                        </div>
                    </div>
                    {user.id && (
                        <div className="item-action">
                            <button
                                className="button button-border button-small"
                                onClick={onOpenModal}
                                type="button"
                            >
                                View
                            </button>
                            &nbsp;
                            <button
                                className="button button-border button-small"
                                type="button"
                                onClick={onChangeStatus}
                            >
                                {user.status === false? "Unlock": "Lock"}
                            </button>
                            <div className="item-action-confirm">
                                <h5>Are you sure you want to change this user's status?</h5>
                                <button
                                    className="button button-small button-border"
                                    onClick={onCancelChange}
                                    type="button"
                                >
                                    No
                                </button>
                                &nbsp;
                                <button
                                    className="button button-small button-danger"
                                    onClick={onConfirmChange}
                                    type="button"
                                >
                                    Yes
                                </button>
                            </div>
                        </div>

                    )}
                </div>
            </SkeletonTheme>

            <Modal
                isOpen={isOpenModal} onRequestClose={onCloseModal}
            >
                <UserInfo closeFunc={onCloseModal} user={user}/>
            </Modal>
        </Fragment>

    );
};

UserItem.propTypes = {
    user: PropType.shape({
        id: PropType.string,
        fullname: PropType.string,
        email: PropType.string,
        avatar: PropType.string,
        dateJoined: PropType.string,
        status: PropType.bool,
        role: PropType.string
    }).isRequired
};

export default withRouter(UserItem);
