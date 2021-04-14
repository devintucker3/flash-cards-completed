import React, { useEffect, useState, Fragment } from "react";
import { useHistory, Link } from "react-router-dom";
import { updateDeck } from "../../../utils/api/index";
import Error from "../../Error/Error";

function EditDeck({ singleDeck, setSingleDeck, error, setError, deckUrl }) {
  const [formData, setFormData] = useState({ ...singleDeck });
  const abortController = new AbortController();
  const history = useHistory();

  useEffect(() => {
    setFormData(() => ({ ...singleDeck }));
  }, [singleDeck]);

  function changeHandler({ target }) {
    setFormData(() => ({ ...formData, [target.name]: target.value }));
    console.log(formData);
  }

  function submitHandler(event) {
    event.preventDefault();
    updateDeck(formData, abortController.signal)
      .then((response) => setSingleDeck(() => ({ ...singleDeck, ...response })))
      .then(history.push(deckUrl))
      .catch((error) => {
        setError(() => error);
        console.log(error);
      });
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
          <li className="breadcrumb-item">
              <Link to={deckUrl}>{singleDeck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h2>Edit Deck: {singleDeck.name}</h2>
      <form name="editDeck" onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="Deck Name">Deck Name</label>
          <input required type="text" className="form-control" id="deckName" placeholder="Deck Name" name="name" value={formData.name} onChange={changeHandler} />
        </div>
        <div className="form-group">
          <label htmlFor="deckDescription">Description</label>
          <textarea required type="text" className="form-control" id="deckDescription" placeholder="DeckDescription" name="description" value={formData.description}
            rows="4" onChange={changeHandler} />
        </div>
        <Link className="btn btn-secondary mr-4" to={`${deckUrl}`}>Cancel</Link>
        <button type="submit" className="btn btn-primary mr-4">Submit</button>
        {error ? (
            <div className="alert alert-danger" role="alert">
                A simple danger alert - check it out!
            </div>
        ) : null}
      </form>
    </Fragment>
  );
}

export default EditDeck;
