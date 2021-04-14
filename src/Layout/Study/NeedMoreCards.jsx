import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function NeedMoreCards({singleDeck}) {
    return (
        <Fragment>
            <div className="card border-0">
                <div className="card-body px-0">
                    <h5 className="card-title">Not Enough Cards</h5>
                    <p class="card-text">
                        You need at least 3 cards to study. There
                        {singleDeck.cards.length === 1 ? " is 1 card " : ` are ${singleDeck.cards.length} cards `}
                        in this deck.
                    </p>
                    <Link className="btn btn-primary" to={`/decks/${singleDeck.id}/cards/new`}>
                        <span className="oi oi-plus" /> Add Cards
                    </Link>
                </div>
            </div>
        </Fragment>
    )
}

export default NeedMoreCards;