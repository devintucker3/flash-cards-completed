import React from "react";
import {deleteCard} from "../../../utils/api/index";
import Error from "../../Error/Error";

function CardDelete({singleDeck, setSingleDeck, error, setError, cardId}) {
    const abortController = new AbortController();

    function deleteHandler(event) {
        event.preventDefault();
        const answer = window.confirm("Delete Card?");

        if (answer) {
            deleteCard(cardId, abortController.signal)
                .then(() => {
                    const filteredCards = singleDeck.cards.filter(selected => selected.id !== cardId);
                    setSingleDeck(() => {
                        return {...singleDeck, cards: filteredCards}
                    })
                })
                .catch(error => {
                    setError(() => error);
                    console.log(error);
                })
        }

        if (error) {
            return <Error setError={setError} />
        }
    }

    return (
        <button type="button" className="btn btn-danger" onClick={deleteHandler}>
            <span className="oi oi-trash" />
        </button>
    )
}

export default CardDelete;