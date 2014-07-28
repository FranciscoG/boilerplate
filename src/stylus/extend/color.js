// Force the use of the 6 digit hex code to override Stylus's automatic Hex shortening
// source: http://stackoverflow.com/questions/9378159/can-i-convert-a-short-form-color-123-into-the-long-form-112233-in-stylus
module.exports = function() {
  var hex = function(n) {
    return n.toString(16)
  };

  return function(style) {
    style.define('longColor', function(color) {
      var hexNum = [color.r, color.g, color.b].map(hex);

      hexNum.forEach(function(el, i, arr) {
        if (el === 0 || el === "" || el === "0") {
          hexNum[i] = "00";
        } else if (el.toString().length === 1) {
          hexNum[i] = "0" + el.toString();
        }
      });

      return hexNum.join("");
    });
  }
};