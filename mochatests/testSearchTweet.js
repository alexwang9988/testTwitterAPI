/**
 * Created by awang2 on 3/19/16.
 */
describe('testSearchTweet', function () {
    var Twitter = require('twitter');
    var chai = require('chai');
    var randomstring = require("randomstring");
    var sleep = require('sleep');

    var client = new Twitter({
        consumer_key: 'DwyGCOtWUwVBfntKJsRjkbj4r',
        consumer_secret: '53DpySUFRJniqXYGAR7xVvHCQuLlNWdFboPUHsIw2NgtJBLmSl',
        access_token_key: '710974424296529920-eRpX79a0wLJtl2FtBsZC50sK06SF2Xs',
        access_token_secret: 'oqfsWmY1UxnQzhUayKE6vmERYo7B4Hh90UguTi5VXJTJ4'
    });
    var assert = chai.assert;
    //set suite time out to 5s
    this.timeout(5000);
    
    it ('search for tweet relate to test', function (done) {

        setTimeout(done, 1000);
        client.get('search/tweets', {q: 'test'}, function (error, tweets, response) {
          //  console.log('search for tweet');
          //  console.log(tweets.statuses);
            var alltweets = tweets.statuses
            for(var i = 0; i < alltweets.length; i++) {
                var tweet = alltweets[i];

                assert.include (tweet.text.toLowerCase(), 'test', 'a tweet not include the search term');
            }
        });

    });
    
    it ('user lookup return good json', function (done) {
        setTimeout(done, 1000);
        client.get('users/lookup', {screen_name: 'alexwang'}, function(error, tweets, response){
            if(error) throw error;
            console.log ('tweet:');
            console.log(tweets);  // The favorites.
            assert.isDefined(tweets.screen_name, 'good json should has screen_name defined');
            assert.equal (tweets.screen_name, 'alexwang', 'screen name is not the requested');
        });
    });

})
