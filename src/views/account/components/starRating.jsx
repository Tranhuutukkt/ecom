import React, {Fragment, useState} from "react";
import index from "react-select";

const StarRating = ({rating, setRating}) => {
    const [hover, setHover] = useState(0);
    const [score, setScore] = useState('');

    const handleMouEnter = (index) => {
        setHover(index);
        if (index ===1)
            setScore(index  + " Disappointed!");
        else if (index ===2)
            setScore(index + " Don't like so much.");
        else if (index === 3)
            setScore(index + " Not bad!");
        else if (index === 4)
            setScore(index + " Sound great.");
        else
            setScore(index + " I love it!");
    }
    return (
        <Fragment>
            <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                    ++index;
                    return (
                        <button
                            type="button"
                            key={index}
                            className={index <= (hover || rating) ? "on star-button" : "off star-button"}
                            onClick={() => setRating(index)}
                            onMouseEnter={() => handleMouEnter(index)}
                            onMouseLeave={() => setHover(rating)}
                        >
                            <i className="fa-solid fa-star fa-xl" color="gray"></i>
                        </button>
                    );
                })}
            </div>
            <div className='text-center text-subtle' style={{textAlign: "right"}}>{score}</div>
        </Fragment>
    );
};

export default StarRating;