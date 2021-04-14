import React, { useEffect, useState, Fragment } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { readDeck } from "../../utils/api/index";
import Study from "../Study/Study";
import ViewDeckNav from "./ViewDeckNav";
import Deck from "./ManageDeck/Deck";
import Cards from "./ManageCards/Cards";
import EditDeck from "./ManageDeck/EditDeck";
import AddOrEditCard from "./ManageCards/AddOrEditCard";

function ViewDeck({decks, setDecks, error, setError}) {
    const [singleDeck, setSingleDeck] = useState({});
    const abortController = new AbortController();
    const {params: {deckId}, url} = useRouteMatch();

    useEffect(() => {
        readDeck(deckId, abortController.signal)
            .then(setSingleDeck)
            .catch(error);
        
        return () => abortController.abort();
    }, []);

    return (
        <Fragment>
            <Switch>
                <Route path={`${url}/cards/:cardId/edit`}>
                    <AddOrEditCard singleDeck={singleDeck} setSingleDeck={setSingleDeck} error={error} setError={setError} deckId={deckId} deckUrl={url} 
                        edit={true} />
                </Route>
                <Route path={`${url}/cards/new`}>
                    <AddOrEditCard singleDeck={singleDeck} setSingleDeck={setSingleDeck} error={error} setError={setError} deckId={deckId} deckUrl={url} 
                        edit={false} />
                </Route>
                <Route path={`${url}/edit`}>
                    <EditDeck singleDeck={singleDeck} setSingleDeck={setSingleDeck} error={error} setError={setError} deckUrl={url} />
                </Route>
                <Route path={`${url}/study`}>
                    <Study deckId={deckId} singleDeck={singleDeck} setSingleDeck={setSingleDeck} error={error} setError={setError} />
                </Route>
                <Route exact path={url}>
                    <ViewDeckNav singleDeck={singleDeck} />
                    <Deck singleDeck={singleDeck} decks={decks} setDecks={setDecks} error={error} setError={setError} deckId={deckId} />
                    {Object.keys(singleDeck).length > 0 ? (
                        singleDeck.cards.length > 0 ? (
                            <h2>Cards</h2>
                        ) : (
                            <h2>No cards in this deck yet.</h2>
                        )
                    ) : null}
                    <Cards singleDeck={singleDeck} setSingleDeck={setSingleDeck} error={error} setError={setError} url={url} />
                </Route>
            </Switch>
        </Fragment>
    )
}

export default ViewDeck;