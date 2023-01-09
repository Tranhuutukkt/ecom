import * as Yup from "yup";
import {useFileHandler} from "@/hooks";
import {Field, Form, Formik} from "formik";
import {CustomInput, CustomTextarea} from "@/components/formik";
import React, {useState} from "react";
import {CheckOutlined, LoadingOutlined} from "@ant-design/icons";
import PropType from "prop-types";
import {ImageLoader, Modal} from "@/components/common";

const FormSchema = Yup.object().shape({
    orderID: Yup.string()
        .required('ID is required.'),
    productName: Yup.string()
        .required('Product name is required.'),
    reason: Yup.string()
        .required('Reason is required.')
    }
);

const ReturnForm = ({ order, product, onSubmit, isLoading }) => {
    const [open, setOpen] = useState(false);

    const onCloseModal = () => {
        setOpen(false);
    };

    const onOpenModal = () => {
        setOpen(true);
    }

    const initFormikValues = {
        orderID: order.id,
        productName: product.name,
        reason: ''
    }

    const {
        imageFile,
        isFileLoading,
        onFileChange,
        removeImage
    } = useFileHandler({ returnImage: [], productImage: product?.image || {} });

    const onSubmitForm = (form) => {
        if (imageFile.returnImage.file || product.image) {
            onSubmit({
                ...form,
                orderID: order.id,
                productName: product.name,
                dateAdded: new Date().getTime(),
                productImage: product.image,
                returnImage: imageFile.returnImage,
                reason: form.reason
            });
        }
    }

    return (
        <div>
            <button
                className='button button-small button-round'
                disabled={order.status === 5 || order.status < 4? true:false}
                style={{float: "right"}}
                onClick={()=>onOpenModal()}>
                Return
            </button>
            <Modal isOpen={open} onRequestClose={onCloseModal}>
                <div style={{width: "600px"}}>
                    <Formik
                        initialValues={initFormikValues}
                        validateOnChange
                        validationSchema={FormSchema}
                        onSubmit={onSubmitForm}
                    >
                        {({ values, setValues, errors, touched }) => (
                            <Form className="product-form">
                                <div className="product-form-inputs">
                                    <div className="product-form-field">
                                        <Field
                                            name="orderID"
                                            type="text"
                                            label="* OrderID"
                                            disable="true"
                                            style={{ textTransform: 'capitalize' }}
                                            component={CustomInput}
                                        />
                                    </div>
                                    &nbsp;
                                    <div className="product-form-field">
                                        <Field
                                            name="productName"
                                            type="text"
                                            label="* Product Name"
                                            disable="true"
                                            style={{ textTransform: 'capitalize' }}
                                            component={CustomInput}
                                        />
                                    </div>
                                    &nbsp;
                                    <div className="product-form-image-wrapper">
                                        {(imageFile.productImage || product.image) && (
                                            <ImageLoader
                                                alt=""
                                                className="product-form-image-preview"
                                                src={imageFile.image || product.image}
                                            />
                                        )}
                                    </div>
                                    &nbsp;
                                    <div className="product-form-field">
                                        <Field
                                            disabled={isLoading}
                                            name="reason"
                                            type="text"
                                            label="* Reason"
                                            style={{ textTransform: 'capitalize' }}
                                            component={CustomTextarea}
                                        />
                                    </div>
                                    &nbsp;
                                    <div className="product-form-field">
                                        <span className="d-block padding-s">Received Product Image</span>
                                        {!isFileLoading && (
                                            <label htmlFor="product-input-file-collection">
                                                <input
                                                    disabled={isLoading}
                                                    hidden
                                                    id="product-input-file-collection"
                                                    multiple
                                                    onChange={(e) => onFileChange(e, { name: 'returnImage', type: 'multiple' })}
                                                    readOnly={isLoading}
                                                    type="file"
                                                />
                                                Choose Images
                                            </label>
                                        )}
                                    </div>
                                    <div className="product-form-collection">
                                        <>
                                            {imageFile.returnImage.length >= 1 && (
                                                imageFile.returnImage.map((image) => (
                                                    <div
                                                        className="product-form-collection-image"
                                                        key={image.id}
                                                    >
                                                        <ImageLoader
                                                            alt=""
                                                            src={image.url}
                                                        />
                                                        <button
                                                            className="product-form-delete-image"
                                                            onClick={() => removeImage({ id: image.id, name: 'returnImage' })}
                                                            title="Delete Image"
                                                            type="button"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                ))
                                            )}
                                        </>
                                    </div>
                                    <div>
                                        <button
                                            className="button button-small button-round"
                                            disabled={isLoading}
                                            type="submit"
                                        >
                                            {isLoading ? <LoadingOutlined /> : <CheckOutlined />}
                                            &nbsp;
                                            {isLoading ? 'Sending Request' : 'Send Request'}
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            className='button button-small button-round'
                                            onClick={()=>setOpen(false)}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>

                            </Form>
                        )}
                    </Formik>
                </div>

            </Modal>

        </div>
    )
}

ReturnForm.prototype = {
    orderID: PropType.string.isRequired,
    productName: PropType.string.isRequired,
    reason: PropType.string.isRequired,
    onSubmit: PropType.func.isRequired,
    isLoading: PropType.bool.isRequired
}
export default ReturnForm;