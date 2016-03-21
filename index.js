/**
 * Created by awang2 on 3/18/16.
 */
var Twitter = require('twitter');
var randomstring = require("randomstring");

var client = new Twitter({
    consumer_key: 'DwyGCOtWUwVBfntKJsRjkbj4r',
    consumer_secret: '53DpySUFRJniqXYGAR7xVvHCQuLlNWdFboPUHsIw2NgtJBLmSl',
    access_token_key: '710974424296529920-eRpX79a0wLJtl2FtBsZC50sK06SF2Xs',
    access_token_secret: 'oqfsWmY1UxnQzhUayKE6vmERYo7B4Hh90UguTi5VXJTJ4'
});
/*
client.get('favorites/list', function(error, tweets, response){
    if(error) throw error;
    console.log(tweets);  // The favorites.
    console.log(response);  // Raw response object.
});*/
//var status = 'my test ' + Math.floor(Date.now() / 1000);
var status = randomstring.generate(139);
var tweetbody;
client.post('statuses/update', {status: status},  function(error, tweet, response){
    if(error) {
        console.log(error);
        throw error;
    }
    tweetbody = tweet;
    console.log('Tweet Body');
    console.log(tweetbody);  // Tweet body. 
    console.log ('response');
    var responseBody = JSON.parse(response.body);
    console.log(responseBody);  // Raw response object. 
});

client.get('search/tweets', {q: status}, function(error, tweets, response){
    console.log ('search for tweet');
    console.log(tweets);
});