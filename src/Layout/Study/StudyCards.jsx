import React from "react";
import {useHistory} from "react-router-dom";

function Cards({singleDeck, frontView, setFrontView, index, setIndex}) {
    const history = useHistory();

    const flipHandler = () => {
        setFrontView(() => !frontView);
    }

    const nextHandler = () => {
        if (index + 1 === singleDeck.cards.length) {
            const answer = window.confirm("Restart cards?");
            answer ? setIndex(() => 0) : history.push("/")
        } else {
            setIndex(() => index++);
        }
        setFrontView(() => true)
    };

    //card text with the flip and next buttons
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Card {index + 1} of {singleDeck.cards.length}</h5>
                <p className="card-text">
                    {Object.keys(singleDeck).length !== 0 ? (
                        frontView ? singleDeck.cards[index].front : singleDeck.cards[index].back
                    ) : null}
                </p>
                <button className="btn btn-secondary ml-4" onClick={flipHandler}>Flip</button>
                {!frontView ? (
                    <button className="btn btn-primary" onClick={nextHandler}>Next</button>
                ) : null}
            </div>
        </div>
    )
}

export default Cards;