/* eslint-disable react/forbid-prop-types */
import PropType from 'prop-types';
import React from 'react';
import OrderItem from "@/views/admin/orders/OrderItem";
import returns from "@/views/admin/returns/index";
import ReturnItem from "@/views/admin/returns/ReturnItem";

const ReturnsTable = ({ filteredReturns}) => {
    return (
        <div>
            {filteredReturns.length > 0 && (
                <div className="grid grid-product grid-count-6">
                    <div className="grid-col"/>
                    <div className="grid-col">
                        <h5>Name</h5>
                    </div>
                    <div className="grid-col">
                        <h5>Order ID</h5>
                    </div>
                    <div className="grid-col">
                        <h5>Date Created</h5>
                    </div>
                    <div className="grid-col">
                        <h5>Reason</h5>
                    </div>
                    <div className="grid-col">
                        <h5>Status</h5>
                    </div>
                </div>
            )}
            {filteredReturns.length === 0 ? new Array(10).fill({}).map((returns, index) => (
                <ReturnItem
                    // eslint-disable-next-line react/no-array-index-key
                    key={`product-skeleton ${index}`}
                    returns={returns}
                />
            )) : filteredReturns.map((returns) => (
                <div key={returns.id}
                >
                    <ReturnItem
                        returns={returns}
                    />
                    <br/>
                </div>
            ))}
        </div>
    );
};

ReturnsTable.propTypes = {
    filteredReturns: PropType.array.isRequired
};

export default ReturnsTable;
