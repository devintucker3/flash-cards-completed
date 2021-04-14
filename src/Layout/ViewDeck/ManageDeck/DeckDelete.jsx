import React from "react";
import { useHistory } from "react-router-dom";
import {deleteDeck} from "../../../utils/api/index"
import Error from "../../Error/Error";

function DeckDelete({decks, setDecks, error, setError, deckId}) {
    const abortController = new AbortController();
    const history = useHistory();

    function deleteHandler(event) {
        event.preventDefault();
        const answer = window.confirm("Delete Deck?");

        if (answer) {
            deleteDeck(deckId, abortController.signal)
                .then(() => {
                    const filteredDecks = decks.filter(selected => selected.id !== deckId);
                    setDecks(() => {
                        return [...filteredDecks]
                    });
                })
                .then(history.push("/"))
                .catch(error => {
                    setError(() => error);
                    console.log(error);
                })
        }
    }

    if (error) {
        return <Error setError={setError} />
    }

    return (
        <button type="button" className="btn btn-danger" onClick={deleteHandler}>
            <span className="oi oi-trash" />
        </button>
    )
}

export default DeckDelete;