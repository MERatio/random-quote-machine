// dom selectors
const body = document.querySelector('body');
const textDiv = document.getElementById('text-div');
const text = document.getElementById('text');
const authorDiv = document.getElementById('author-div');
const hyphen = document.querySelector('.hyphen');
const author = document.getElementById('author');
const buttons = document.getElementById('buttons');
const newQuote = document.getElementById('new-quote');
const tweetQuote = document.getElementById('tweet-quote');

let quotesJSON;
let quoteText;
let quoteAuthor;
let colors = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#f1c40f', '#e67e22', '#e74c3c'];
let prevQuoteText;
let prevColor;

function getQuotesJSON(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => quotesJSON = data)
    .catch((error) => console.log(error));
}

// get random element of an array
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getQuote() {
  // if the JSON is ready
  if (quotesJSON) {
    // get random element for quotes and colors
    let randomQuoteData = getRandomElement(quotesJSON.quotes);
    let randomColor = getRandomElement(colors);

    // get the quote and the author
    quoteText = randomQuoteData.quote;
    quoteAuthor = randomQuoteData.author;

    // while the current quote and colors is the same in previous quote and color
    while (quoteText === prevQuoteText || randomColor === prevColor) {
      randomQuoteData = getRandomElement(quotesJSON.quotes);
      randomColor = getRandomElement(colors);
    }

    // set the current quote data and color to the previous one
    prevQuoteText = quoteText;
    prevColor = randomColor;
    
    // replace the textContent with quote and quote author
    text.textContent = `"${quoteText}"`;
    hyphen.textContent = '-';
    author.textContent = quoteAuthor;

    // update the color and background color of the root variables
    document.documentElement.style.setProperty('--color', randomColor);
    document.documentElement.style.setProperty('--backgroundColor', randomColor);

    // add classes for animation
    textDiv.classList.add('animated', 'fadeIn');
    authorDiv.classList.add('animated', 'fadeIn');
    buttons.classList.add('animated', 'fadeIn');

    // remove class to add classes again for animation
    setTimeout(() => textDiv.classList.remove('animated', 'fadeIn'), 1000);
    setTimeout(() => authorDiv.classList.remove('animated', 'fadeIn'), 1000);
    setTimeout(() => buttons.classList.remove('animated', 'fadeIn'), 1000);

    tweetQuote.setAttribute('href', `https://twitter.com/intent/tweet?text="${quoteText}"%20-${quoteAuthor}&hashtags=quotes`);

  } else {
    setTimeout(getQuote, 100);
  }
}

// when the dom is loaded
window.addEventListener('DOMContentLoaded', (e) => {
  getQuotesJSON('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json');
  getQuote();
  newQuote.addEventListener('click', getQuote);
});