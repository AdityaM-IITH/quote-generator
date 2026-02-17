// src/App.jsx
import React, { useState, useEffect } from 'react'; // Hint: You need this import
import './App.css';

function App() {
  // TODO: Create a state variable called 'quote' 
  // Initialize it with the string: "Click the button to get a quote!"

  // _______________________________________________________ <--- WRITE CODE HERE
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // async means "This function takes time (waiting for internet)"
  async function fetchNewQuote() {
    setIsLoading(true);

    // 1. The Request (Order the food)
    try {
      const response = await fetch("https://dummyjson.com/quotes/random");

      // 2. The Response (Unpack the JSON food)
      const data = await response.json();

      // 3. Update the State (Serve the food)
      setQuote(data.quote);
      setAuthor(data.author);
    } catch (error) {
      console.error("Error fetching quote: ", error);
    } finally {
      setIsLoading(false);
    }

    // Optional: Log it to see what the API gave us
    // console.log(data);
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
        {/* We use the state variable here */}
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