
const RatingView = ({reviews})=> {
    let totalScore = 0;
    const star = [{id:1, score:0}, {id:2, score:0}, {id:3, score:0}, {id:4, score:0}, {id:5, score:0}];
    reviews.map(r => {
        totalScore += r?.rating || 0;
        if (r.rating !== undefined) star[r.rating-1].score +=1;
    });
    totalScore = totalScore/reviews.length || 0;
    return (
        <div>
            <span style={{marginRight: "25px"}}>User Rating: {Math.round(totalScore*100)/100}</span>
            {star.map(s => {
                if (s.id <= totalScore)
                    return (<span className="fa fa-star fa-xl checked" key={s.id}></span>);
                else
                    return (<span className="fa fa-star fa-xl" key={s.id}></span>);
            })}

            <p>{Math.round(totalScore*100)/100} average based on {reviews.length} reviews.</p>
            <hr style={{border: "3px solid #f1f1f1"}}/>
                {star.map(s => (
                    <div key={s.id}>
                        <div className="side">
                            <div>{s.id} <i className="fa fa-star checked"></i></div>
                        </div>
                        <div className="middle">
                            <div className="bar-container">
                                <div className="bar" style={{width: (Math.round(s.score/reviews.length*100)||0)+"%"}}></div>
                            </div>
                        </div>
                        <div className="side right">
                            <div>{s.score}</div>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default RatingView;