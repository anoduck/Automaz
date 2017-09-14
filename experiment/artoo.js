//const express = require('express');
const artoo = require('artoo-js');
const Nightmare = require('nightmare');
 
const reutersUrl = 'http://www.reuters.com/search/news?blob=bitcoin&sortBy=date&dateRange=all';
const useragent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36';
const nightmareOptions = { show: true, webPreferences: { images: false } };
const paginateLimit = 10;
  
var start = new Date(); 

    const nightmare = new Nightmare(nightmareOptions);
 
    nightmare
        .useragent(useragent)
        .goto(reutersUrl)
        .inject('js','artoo.chrome.js')
        .wait(200)
        .evaluate(function(paginateLimit, evalDone) {  


            artoo.autoExpand({
                limit: paginateLimit,
                elements: ".search-result-content",
                expand: ".search-result-more-txt",
                throttle: 200,
                canExpand: function() {
                    return $(".search-result-no-more").length != 1;
                },
                done: function() {
                    var articles = artoo.scrape(".search-result-content .search-result-title a", {
                        url: function() { 
                            return $(this).prop("href") 
                        },
                        title: "text",
                        date: function() {
                            return $(this).closest(".search-result-content").find(".search-result-timestamp").text();
                        }
                    });

                    evalDone(null, articles);
                }
            });
        }, paginateLimit)
        .end()
        .run(function(err, articles) {
            console.log("artoo done")
            if (err) console.log(err);
            //console.log({time: (new Date() - start) + "ms",  articles: articles });


					var csvString = artoo.writers.csv(articles);
					console.log(csvString);
        });
 