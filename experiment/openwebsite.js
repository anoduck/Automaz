var Nightmare = require('nightmare');		
var nightmare = Nightmare({ show: true });  

nightmare
  .goto('https://duckduckgo.com')
  .type('#search_form_input_homepage', 'github nightmare')
  .click('#search_button_homepage')
  .screenshot('hello.jpg')
  //.wait('#zero_click_wrapper .c-info__title a')
  .evaluate(function () { 
    return document.querySelector('#zero_click_wrapper .c-info__title a').href;
  })
  .end()
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });