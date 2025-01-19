

const displayQuote = document.getElementById("quote");
const displayAuthor = document.getElementById("author");
const button = document.getElementById("newQuote");
const shareButton = document.getElementById("shareButton");
const apiKey = "https://dummyjson.com/quotes/random";
const twitterLink = "https://twitter.com/intent/tweet?text=";

button.addEventListener('click', getData);
shareButton.addEventListener('click', shareInTwitter)


async function getData(url) {
    url = apiKey;
    const response = await fetch(url);
    let data = await response.json();

    const {author, quote} = data;
    displayQuote.innerHTML = quote;
    displayAuthor.innerHTML = author;
}
getData();

function shareInTwitter(shareUrl){
    shareUrl = twitterLink;
    window.open(twitterLink + quote.innerHTML + '---- by' + displayAuthor.innerHTML, "Tweet Window", "width=600, height=300");
}