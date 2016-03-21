/**
 * Created by awang2 on 3/19/16.
 */

describe('testStatusUpdate', function () {
    var Twitter = require('twitter');
    var assert = require("assert");
    var randomstring = require("randomstring");

    var client = new Twitter({
        consumer_key: 'DwyGCOtWUwVBfntKJsRjkbj4r',
        consumer_secret: '53DpySUFRJniqXYGAR7xVvHCQuLlNWdFboPUHsIw2NgtJBLmSl',
        access_token_key: '710974424296529920-eRpX79a0wLJtl2FtBsZC50sK06SF2Xs',
        access_token_secret: 'oqfsWmY1UxnQzhUayKE6vmERYo7B4Hh90UguTi5VXJTJ4'
    });

    var status = null;
    var tweetbody = null;
    var responsebody;

    //set suite time out to 5s
    this.timeout(5000);

    beforeEach (function (){
        //status = 'my test ' + Math.floor(Date.now() / 1000);
        status = 'my test ' + randomstring.generate(10) + ' ' + randomstring.generate(10);
    });

    it ('tweet body has the correct message', function(done) {
        setTimeout(done, 500);
        var mymessage = status;
        client.post('statuses/update', {status: mymessage},  function(error, tweet, response) {
            if (error) throw error;
            assert.equal(tweet.text, mymessage, 'tweet body has incorrect status: ' + mymessage);
            assert.equal(tweet.user.screen_name, 'alexwangTest', 'screen name is the test user');
            assert.equal(tweet.user.name, 'MyTest', 'name should be MyTest');
        })
    });

    it ('tweet response has the correct message as request', function(done) {
        setTimeout(done, 500);
        client.post('statuses/update', {status: status },  function(error, tweet, response) {
            if (error) throw error;
            var responseBody = JSON.parse(response.body);
            assert.equal(tweet.id, responseBody.id, 'response id is not same as the request' + tweet.text.id + ' ' + responseBody.id);
            assert.equal(tweet.text, responseBody.text, 'response text is not same as the request');
            assert.equal(tweet.screen_name, responseBody.screen_name, 'response screen name is not same as the request');
          })
    });

    it ('tweet longer than 140 will error', function (done) {
        setTimeout(done, 500);
        status = randomstring.generate(141)
        client.post('statuses/update', {status: status },  function(error, tweet, response) {
            errorbody = JSON.parse(JSON.stringify(error).replace('[', '').replace(']', ''));
            assert.equal (errorbody.code, '186', 'unexpected error code 186');
            assert.equal (errorbody.message, 'Status is over 140 characters.', 'unexpected error message');
        })
    });
})