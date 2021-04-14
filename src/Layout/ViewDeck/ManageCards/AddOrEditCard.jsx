import React, { useEffect, useState, Fragment } from "react";
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import { createCard, readCard, updateCard } from "../../../utils/api/index";
import Error from "../../Error/Error";

function AddOrEditCard({singleDeck, setSingleDeck, error, setError, deckId, deckUrl, edit}) {
  const [formData, setFormData] = useState({});
  const [card, setCard] = useState({});
  const abortController = new AbortController();
  const history = useHistory();
  const {params: { cardId }} = useRouteMatch();
  const newDeck = { ...singleDeck };

  useEffect(() => {
    if (edit) {
      readCard(cardId, abortController.signal)
        .then((response) => {
          setCard(() => ({ ...card, ...response }));
        })
        .catch(setError);
    } else {
      setCard(() => ({ ...card, front: "", back: "" }));
    }

    return () => abortController.abort();
  }, []);

  useEffect(() => {
    setFormData(() => ({ ...formData, ...card }));
  }, [card]);

  function changeHandler({ target }) {
    setFormData(() => ({ ...formData, [target.name]: target.value }));
  }

  function submitHandler(event) {
    event.preventDefault();
    if (edit) {
      updateCard(formData, abortController.signal)
        .then((response) => {
          const index = singleDeck.cards.findIndex(selected => selected.id === card.id);
          newDeck.cards[index] = response;
          setSingleDeck(() => ({ ...newDeck }));
        })
        .then(history.push(deckUrl))
        .catch((error) => {
          setError(() => error);
          console.log(error);
        });
    } else {
      createCard(deckId, formData, abortController.signal)
        .then((response) => {
          newDeck.cards.push(response);
          setSingleDeck(() => ({ ...newDeck }));
        })
        .then(() => setFormData(() => ({ ...formData, front: "", back: "" })))
        .catch((error) => {
          setError(() => error);
          console.log(error);
        });
    }

    return () => abortController.abort();
  }

  if (error) {
    return <Error setError={setError} />;
  }

  return (
    <Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home" /> Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={deckUrl}>{singleDeck.name}</Link>
          </li>
          {edit ? (
            <li className="breadcrumb-item active" aria-current="page">
                Edit Card {cardId}
            </li>
          ) : (
            <li className="breadcrumb-item active" aria-current="page">
                Add Card
            </li>
          )}
        </ol>
      </nav>

      {edit ? <h2>Edit Card</h2> : <h2>{singleDeck.name}: Add Card</h2>}
      <form name="addOrEditCard" onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="cardFront">Front of Card</label>
          <textarea required name="front" value={formData.front} rows="4" onChange={changeHandler} type="text" className="form-control" id="cardFront" 
            placeholder="Front of card" />
        </div>
        <div className="form-group">
          <label htmlFor="cardBack">Back of Card</label>
          <textarea required name="back" value={formData.back} rows="4" onChange={changeHandler} type="text" className="form-control" id="cardBack" 
            placeholder="Back of card" />
        </div>
        <Link className="btn btn-secondary mr-4" to={deckUrl}>Cancel</Link>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </Fragment>
  );
}

export default AddOrEditCard;
