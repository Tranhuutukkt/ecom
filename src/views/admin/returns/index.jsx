/* eslint-disable react/jsx-props-no-spreading */
import { Boundary } from '@/components/common';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReturnsNavbar from "@/views/admin/returns/ReturnsNavbar";
import ReturnsTable from "@/views/admin/returns/ReturnsTable";
import {getAllReturn} from "@/redux/actions/returnAction";

const Returns = () => {
    useDocumentTitle('Return List | TeiTouShopping Admin');
    useScrollTop();

    const [searchQuery, setSearchQuery] = useState("");

    const dispatch = useDispatch();

    const store = useSelector((state) => ({
        returns: state.returns,
        requestStatus: state.app.requestStatus,
        isLoading: state.app.loading
    }));

    useEffect(() => {
        dispatch(getAllReturn());
    }, []);

    const handleSearch = query =>{
        setSearchQuery(query);
    }

    const getData = () => {
        let returnList = store.returns.returns;
        if (searchQuery) {
            returnList = store.returns.returns.filter(
                r => r.fullname.toLowerCase().match(searchQuery.toLowerCase()) ||
                    r.email.toLowerCase().match(searchQuery.toLowerCase())
            );
        }
        return {filteredReturns: returnList}
    }

    const {filteredReturns} = getData();
    console.log(filteredReturns);

    return (
        <Boundary>
            <div>
                <ReturnsNavbar
                    totalReturnsCount={store.returns.total || 0}
                    handleSearch={handleSearch}
                />
                <div className="product-admin-items">
                    <ReturnsTable filteredReturns={filteredReturns}/>
                </div>
            </div>
        </Boundary>
    );
};

export default withRouter(Returns);
