import React from "react";
import "./watchlist.css";

const Watchlist = ({ isWatched, setIsWatched, isToWatch, setIsToWatch, isAuthenticated }) => {
    return (
        <div className="watchlist">
            {isAuthenticated ? ( // Check if user is authenticated
                <>
                    <button
                        onClick={() => setIsToWatch(!isToWatch)}
                        className={`watchlist__button ${isToWatch ? "active" : ""}`}
                    >
                        {isToWatch ? "Remove from To Watch" : "Add to To Watch"}
                    </button>
                    <button
                        onClick={() => setIsWatched(!isWatched)}
                        className={`watchlist__button ${isWatched ? "active" : ""}`}
                    >
                        {isWatched ? "Remove from Watched" : "Mark as Watched"}
                    </button>
                </>
            ) : (
                <p></p> // Message for unauthenticated users
            )}
        </div>
    );
};

export default Watchlist;