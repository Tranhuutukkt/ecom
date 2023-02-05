import { Fragment } from "react";

export default function SingleReview(props) {
    const star = [1, 2, 3, 4, 5];
  return (
    <Fragment>
      <div style={{ width: "auto", height: "fit-content", margin: "2rem" }}>
        <div style={{ display: "block" }}>
          <img
            alt=""
            style={{ width: "3rem", aspectRatio: 1, borderRadius: "50%" }}
            src={props.reviewData.avatar}
          />
          <strong
            style={{
              verticalAlign: "50%",
              paddingLeft: "1rem",
            }}
          >
            {props.reviewData.fullname}
          </strong>
            <div style={{float: "right"}}>
                <i className="fa-solid fa-ellipsis-vertical">
                </i>
            </div>
        </div>
          <div style={{paddingLeft: "4rem", display: "block"}}>
              {star.map(s => {
                  if (s <= props.reviewData.rating)
                      return (<span className="fa fa-star fa checked" key={s}></span>);
                  else
                      return (<span className="fa fa-star fa" key={s}></span>);
              })}
          </div>
        <div
          style={{
            wordBreak: "normal",
            fontWeight: "normal",
            padding: "0.5rem 0rem 0.5rem 4rem",
            width: "100%",
          }}
        >
          {props.reviewData.comment}
        </div>
        <div
          style={{
            width: "90%",
            height: "2px",
            position: "relative",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#E1E1E1",
          }}
        />
      </div>
    </Fragment>
  );
}
