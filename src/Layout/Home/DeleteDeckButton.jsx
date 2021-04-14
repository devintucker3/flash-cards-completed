//Delete deck button being clicked and bringing up anther window to confirm
import React from "react";
import { useHistory } from "react-router-dom";
import {deleteDeck} from "../../utils/api/index"
import Error from "../Error/Error";

function DeleteDeckButton({decks, setDecks, setError, error, deckId}) {
    const abortController = new AbortController();
    const history = useHistory();

    function deleteHandler(event) {
        event.preventDefault();
        const answer = window.confirm("Delete this deck?")

        if (answer) {
            deleteDeck(deckId, abortController.signal)
                .then(() => {
                    const filteredDecks = decks.filter(selected => selected.id !== deckId);
                    setDecks(() => {
                        return [...filteredDecks];
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
        <button type="button" className="btn btn-danger float-right" onClick={deleteHandler}>
            <span className="oi oi-trash" />
        </button>
    )
}

export default DeleteDeckButton;