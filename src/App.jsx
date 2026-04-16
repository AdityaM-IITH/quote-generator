// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  async function fetchNewQuote() {
    setIsLoading(true);

    try {
      const response = await fetch("https://dummyjson.com/quotes/random");
      const data = await response.json();

      setQuote(data.quote);
      setAuthor(data.author);
    } catch (error) {
      console.error("Error fetching quote: ", error);
    } finally {
      setIsLoading(false);
    }
  }
  function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote + " - " + author)}`;
    window.open(twitterUrl, '_blank');
  }
  useEffect(() => {
    fetchNewQuote();
  }, []);
  return (
    <div>
      <h1>Quote of the Day</h1>

      <div className="card">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p style={{ fontSize: "1.5rem", fontStyle: "italic" }}>
              "{quote}"
            </p>
            <p style={{ fontWeight: "bold", marginTop: "10px" }}>
              - {author}
            </p>
          </>
        )}
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <button onClick={fetchNewQuote} disabled={isLoading}>
            {isLoading ? "Fetching..." : "New Quote"}
          </button>
          <button
            onClick={tweetQuote}
            style={{ background: "#1da1f2", color: "white" }}
            disabled={isLoading}>
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;