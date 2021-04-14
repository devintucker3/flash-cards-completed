import React, { Fragment, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Error from "../Error/Error";
import { createDeck } from "../../utils/api/index";

function CreateDeck({ decks, setDecks, error, setError }) {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const history = useHistory();
  const newDeck = [...decks];

  function changeHandler({ target }) {
    setFormData(() => ({ ...formData, [target.name]: target.value }));
  }

  function submitHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();

    createDeck(formData, abortController.signal)
      .then((response) => {
        newDeck.push(response);
        setDecks(() => newDeck);
        history.push(`/decks/${response.id}`);
      })
      .catch(setError);

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
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h2>Create Deck</h2>
      <form name="addDeck" onSubmit={submitHandler}>
            <div className="form-group">
                <label htmlFor="DeckName">Deck Name</label>
                <input required type="text" name="name" className="form-control" id="deckName" placeholder="DeckName" value={formData.name} 
                    onChange={changeHandler} />
            </div>
            <div class="form-group">
                <label htmlFor="Description">Description</label>
                <textarea required type="text" name="description" rows="4" className="form-control" id="description" placeholder="Description" 
                    value={formData.description} onChange={changeHandler} />
            </div>
            <Link className="btn btn-secondary mr-4" to="/">Cancel</Link>
            <button type="submit" className="btn btn-primary mr-4">Submit</button>
        </form>
    </Fragment>
  );
}

export default CreateDeck;
