import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {getReturnByUser} from "@/redux/actions/returnAction";
import ReturnContainer from "@/views/account/returnForm/ReturnContainer";

// Just add this feature if you want :P

const UserReturnTab = () => {
    const returns = useSelector((state) => state.returns);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getReturnByUser());
    }, [returns]);

    return (
        <div className="loader" style={{ height: "80vh" }}>
            {returns.total === 0 ? (
                <Fragment>
                    <h3>My Return List</h3>
                    <strong><span className="text-subtle">You don&apos;t have a return list!</span></strong>
                </Fragment>):
                (
                    <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
                        {returns.orders.map((item, index) => (
                            <div key={index}>
                                <ReturnContainer data={item}/>
                                <br/>
                            </div>
                        ))}
                    </div>
                )}
        </div>
    )
};

export default UserReturnTab;
