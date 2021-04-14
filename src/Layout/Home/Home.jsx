import React, {Fragment, useEffect} from "react";
import { Link } from "react-router-dom";
import {listDecks} from "../../utils/api/index";
import DecksDisplay from "./DeckDisplay";
import Error from "../Error/Error";


function Home({decks, setDecks, error, setError}) {
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        listDecks(signal)
            .then(setDecks)
            .catch(error => {
                setError(() => error)
                console.log(error)
            });

        return () => abortController.abort();
    }, []);

    if (error) {
        return <Error setError={setError} />
    }
    
    return (
        <Fragment>
            <Link className="btn btn-secondary mb-2" to="/decks/new">
                <span className="oi oi-plus" />Create Deck
            </Link>
            <DecksDisplay decks={decks} setDecks={setDecks} error={error} setError={setError} />
        </Fragment>
    );
}

export default Home;