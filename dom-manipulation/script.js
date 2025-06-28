// Array of quote objects
let quotes = [
    { text: "The only limit is your mind.", category: "Motivation" },
    { text: "Knowledge is power.", category: "Wisdom" },
    { text: "Life is a journey.", category: "Life" }
  ];
  
  // Function to display a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
  
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `
      <p><strong>Quote:</strong> "${quote.text}"</p>
      <p><em>Category:</em> ${quote.category}</p>
    `;
  }
  
  // Function to add a new quote dynamically
  function addQuote() {
    const textInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");
  
    const newText = textInput.value.trim();
    const newCategory = categoryInput.value.trim();
  
    if (newText === "" || newCategory === "") {
      alert("Please fill in both fields.");
      return;
    }
  
    // Create new quote object
    const newQuote = {
      text: newText,
      category: newCategory
    };
  
    // Add to quotes array
    quotes.push(newQuote);
  
    // Optionally show it immediately
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `
      <p><strong>Quote:</strong> "${newQuote.text}"</p>
      <p><em>Category:</em> ${newQuote.category}</p>
    `;
  
    // Clear input fields
    textInput.value = "";
    categoryInput.value = "";

    ["createAddQuoteForm"]
  }
  