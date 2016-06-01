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
      var spy = jasmine.createSpy("done");
      fetchTweets.done(spy);
      setTimeout(function () {
        fetchTweets.resolve(tweets);
        done();
      });
      expect(spy).toHaveBeenCalledWith(tweets);
    });
  });
});


