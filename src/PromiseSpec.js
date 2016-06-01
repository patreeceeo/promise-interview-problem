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
      fetchTweets.done(spy1).done(spy2);
      setTimeout(function () {
        fetchTweets.resolve(tweets);
        done();
      });
      expect(spy1).toHaveBeenCalledWith(tweets);
      expect(spy2).toHaveBeenCalledWith(tweets);
    });
  });
});


