/** inIframe function intended to identify if a webpage 
  * is being loaded inside an iframe or directly 
  * nto the browser window
  */
function inIframe () { try { return window.self !== window.top; } catch (e) { return true; } }
// Array with colors to set background.
var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

var currentQuote = '', currentAuthor = '';
// Creates a new browser window and loads tweet with quote into it.
function openURL(url){
  window.open(url, 'Share', 'width=600, height=600, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}
// Send an AJAX request to a Andruxnet-random-famous-quotes server to take new quote.
function getQuote() {
  $.ajax({
    headers: {
      "X-Mashape-Key": "4Q5xjoxkF6mshBiYdVS5vs3ox5kqp1HkYisjsni2RR0Y2MzBSk",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
    success: function(r) {
      if (typeof r === 'string') {
       r = JSON.parse(r); 
      }
      currentQuote = r.quote;
      currentAuthor = r.author;
      if(inIframe())
      {
        /** Generate link for twitter button to have a possibility 
          * to tweet a quote in future (string encoded as a URI).
          */
        $('.tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
      }
      /** Create a smooth transition for new quote and
        * put quote into "quote-text" div element.
        */
      $(".quote-text").animate({
          opacity: 0
        }, 250,
        function() {
          $(this).animate({
            opacity: 1
          }, 250);
          $('#text').text(r.quote);
        });
      /** Create a smooth transition for author name of the quote and
        * put his name into "quote-author" div element. 
        */
      $(".quote-author").animate({
          opacity: 0
        }, 250,
        function() {
          $(this).animate({
            opacity: 1
          }, 250);
          $('#author-name').html("-- " + r.author + " --");
        });
      /** Variable that contain random color generator. 
        *
        * When 'Get another random quote' button is pressed, the background
        * color and text color will be changed.
        */
      var color = Math.floor(Math.random() * colors.length);
      $("body").animate({
        backgroundColor: colors[color],
        color: colors[color]
      }, 1000);
       $("#text").animate({
        borderLeftColor:  colors[color],
        borderRightColor: colors[color]
      }, 1000);
    }
  });
}

// This function load new quote when document is already loaded in browser.
$(document).ready(function() {
  getQuote();
  $('.quote-button').on('click', getQuote);
  $('.tweet-quote').on('click', function() {
     /** When inIframe function is not supported in browser, this statement 
       * help to do tweet in new window.
       */
     if(!inIframe()) {
      openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
    }
  });
});


////maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js