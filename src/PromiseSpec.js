/* eslint-env jasmine */

describe("Promise", function () {
  "use strict";

  describe("#resolve", function () {
    var fetchTweets, tweets;

    beforeEach(function () {
      fetchTweets = new Promise();
      tweets = { fake: "data" };
    });

    it("calls all done callbacks with the resolved value", function (done) {
      var spy1 = jasmine.createSpy("done 1");
      var spy2 = jasmine.createSpy("done 2");
      var lateSpy = jasmine.createSpy("done later");
      fetchTweets.done(spy1).done(spy2);
      setTimeout(function () {
        fetchTweets.done(lateSpy);
        done();
      }, 2);
      setTimeout(function () {
        fetchTweets.resolve(tweets);
      });
      expect(spy1).toHaveBeenCalledWith(tweets);
      expect(spy2).toHaveBeenCalledWith(tweets);
      expect(lateSpy).toHaveBeenCalledWith(tweets);
    });
  });

  describe("#all", function () {
    var fetchTweets, fetchTweetsAgain, tweets, moreTweets;

    beforeEach(function () {
      fetchTweets = new Promise();
      fetchTweetsAgain = new Promise();
      tweets = { fake: "data" };
      moreTweets = { data: "fake" };
    });

    it("creates a new promise that resolves when all the argued promises have resolved", function (done) {
      var spy = jasmine.createSpy("done");
      Promise.all(fetchTweets, fetchTweetsAgain).done(spy);
      setTimeout(function () {
        fetchTweets.resolve(tweets);
      });
      setTimeout(function () {
        fetchTweetsAgain.resolve(moreTweets);
        done();
      }, 2);
      expect(spy).toHaveBeenCalledWith(tweets, moreTweets);
    });
  });
});


