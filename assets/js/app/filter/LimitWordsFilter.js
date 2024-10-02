/**
 * Created by webind on 25/05/2017.
 */

myApp.filter('limitWords', function () {
  return function (input, wordCount) {
    return (input !== undefined && input.split(/\s/g).length < wordCount)
      ? input
      : input.substring(0, wordCount * 5) + "";
  }
});

