import React from "react";
import {useRouteMatch, Link} from "react-router-dom";
import DeckDelete from "./DeckDelete";

function Deck({ singleDeck, decks, setDecks, error, setError, deckId }) {
  const { url } = useRouteMatch();

  if (Object.keys(singleDeck).length > 0) {
    return (
      <div className="card border-0">
        <div className="card-body px-0">
          <h5 className="card-title">{singleDeck.name}</h5>
          <p class="card-text">{singleDeck.description}</p>
          <Link className="btn btn-secondary mr-4" to={`${url}/edit`}>
            <span className="oi oi-pencil" /> Edit
          </Link>
          <Link className="btn btn-primary mr-4" to={`${url}/study`}>
            <span className="oi oi-book" /> Study
          </Link>
          <Link className="btn btn-primary mr-4" to={`${url}/cards/new`}>
            <span className="oi oi-plus" /> Add Card
          </Link>
          <DeckDelete decks={decks} setDecks={setDecks} error={error} setError={setError} deckId={deckId} />
        </div>
      </div>
    )
  } else {
      return null
  }
}

export default Deck;
