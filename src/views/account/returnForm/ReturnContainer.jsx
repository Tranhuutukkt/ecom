import {ImageLoader} from "@/components/common";
import React from "react";
import {displayDate} from "@/helpers/utils";
import ReturnDetail from "@/views/account/returnForm/ReturnDetail";

export default function ReturnContainer({ data }) {
    return (
        <div
            style={{
                width: "1000px",
                height: "250px",
                backgroundColor: "white",
                border: "1px solid #E1E1E1",
                marginBottom: "1rem",
                padding: "1rem",
            }}
        >
            <strong style={{ float: "left", color: "#737373" }}>
                Request ID:{" "}
                <i style={{ fontWeight: "normal" }}>
                    {data.id}
                </i>
            </strong>
            <i
                style={{
                    float: "right",
                    fontWeight: "lighter",
                    color: "#737373",
                    fontSize: "1.5rem",
                }}
            >
                <u>{displayDate(data.returns.dateAdded)}</u>
            </i>
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    height: "12rem",
                    flexDirection: "row",
                    overflow: "auto",
                }}
            >
                <ImageLoader
                    alt=""
                    className="product-form-image-preview"
                    src={data.returns.productImage}
                />
            </div>
            <ReturnDetail data={data}/>
        </div>
    );
}
