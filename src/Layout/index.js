import React, { Fragment, useState } from "react";
import {Route, Switch} from "react-router-dom";
import Header from "./Header";
import NotFound from "./Error/NotFound";
import Home from "./Home/Home";
import ViewDeck from "./ViewDeck/ViewDeck";
import CreateDeck from "./Home/CreateDeck";

function Layout() {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);

  return (
    <Fragment>
      <Header />
      <main className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route path="/decks/new">
            <CreateDeck decks={decks} setDecks={setDecks} error={error} setError={setError} />
          </Route>
          <Route path="/decks/:deckId">
            <ViewDeck decks={decks} setDecks={setDecks} error={error} setError={setError} />
          </Route>
          <Route exact path="/">
            <Home decks={decks} setDecks={setDecks} error={error} setError={setError} />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </main>
    </Fragment>
  );
}

export default Layout;
