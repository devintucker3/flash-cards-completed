import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import DeleteDeckButton from "./DeleteDeckButton";

function DecksDisplay({decks, setDecks, error, setError}) {
    return (
        <Fragment>
            {decks.map(deck => (
                <div className="card mb-1" key={deck.id}>
                    <div class="card-body">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="card-title">{deck.name}</h5>
                            {deck.cards ? <small>{deck.cards.length} cards</small> : null}
                        </div>
                        <p className="card-text">{deck.description}</p>
                        <Link className="btn btn-secondary mr-4" to={`/decks/${deck.id}`}>
                            <span className="oi oi-eye" />View
                        </Link>
                        <Link className="btn btn-primary mr-4" to={`/decks/${deck.id}/study`}>
                            <span className="oi oi-book" />Study
                        </Link>
                        <DeleteDeckButton decks={decks} setDecks={setDecks} error={error} setError={setError} deckId={deck.id} />
                    </div>
                </div>
            ))}
        </Fragment>
    );
}

export default DecksDisplay;