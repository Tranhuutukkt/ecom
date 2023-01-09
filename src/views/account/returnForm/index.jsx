import React, {lazy, Suspense} from "react";
import {useDocumentTitle, useProduct, useScrollTop} from "@/hooks";
import {useDispatch} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {LoadingOutlined} from "@ant-design/icons";

const ReturnForm = lazy(() => import('./returnForm'));

const ReturnRequest = ({match}) => {
    useDocumentTitle("Return Request | TeiTouShopping");
    useScrollTop();
    const { product, error, isLoading } = useProduct(match.params.id);
    const dispatch = useDispatch();

    console.log(match);

    const onsubmitForm = () =>{

    }

    return (
        <div className="product-form-container">
            {error && <Redirect to="/account" />}
            <h2>Return Request</h2>
            {product && (
                <Suspense fallback={(
                    <div className="loader" style={{ minHeight: '80vh' }}>
                        <h6>Loading ... </h6>
                        <br />
                        <LoadingOutlined />
                    </div>
                )}
                >
                    <ReturnForm
                        isLoading={isLoading}
                        onSubmit={onSubmitForm}
                        product={product}
                        order={product}
                    />
                </Suspense>
            )}
        </div>
    );
}

export default withRouter(ReturnRequest);