import React from "react";
import { Link } from "react-router-dom";

function StudyNav({singleDeck, deckId}) {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">
                        <span className="oi oi-home" /> Home
                    </Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{singleDeck.name}</Link>
                </li>
                <li className="breadcrumb-item active">Study</li>
            </ol>
        </nav>
    )
}

export default StudyNav;