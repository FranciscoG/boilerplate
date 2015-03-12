// Production steps of ECMA-262, Edition 5, 15.4.4.14
// Reference: http://es5.github.io/#x15.4.4.14
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(searchElement, fromIndex) {

    var k;

    // 1. Let O be the result of calling ToObject passing
    //    the this value as the argument.
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }

    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get
    //    internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If len is 0, return -1.
    if (len === 0) {
      return -1;
    }

    // 5. If argument fromIndex was passed let n be
    //    ToInteger(fromIndex); else let n be 0.
    var n = +fromIndex || 0;

    if (Math.abs(n) === Infinity) {
      n = 0;
    }

    // 6. If n >= len, return -1.
    if (n >= len) {
      return -1;
    }

    // 7. If n >= 0, then Let k be n.
    // 8. Else, n<0, Let k be len - abs(n).
    //    If k is less than 0, then let k be 0.
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    // 9. Repeat, while k < len
    while (k < len) {
      var kValue;
      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the
      //    HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      //    i.  Let elementK be the result of calling the Get
      //        internal method of O with the argument ToString(k).
      //   ii.  Let same be the result of applying the
      //        Strict Equality Comparison Algorithm to
      //        searchElement and elementK.
      //  iii.  If same is true, return k.
      if (k in O && O[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
}

function Validate(options) {
  if (typeof options !== "object") {
    console.warn('Validator: options not defined');
    return false;
  }

  var defaults = {
    classname: "js-validate",
    debug: false
  };

  options.classname = options.classname || defaults.classname;
  options.success = options.success || null;
  options.error = options.error || null;
  options.complete = options.complete || null;
  options.debug = options.debug || defaults.debug;

  this.options = options;
  this.errors = 0;
  this.index = 0;
  this.resultTable = [];

  // cache the selector
  this.$classname = $("." + options.classname);

  var self = this;

  this.$classname.each(function(i) {
    self.$elem = $(this);

    var tagname = $(this)[0].tagName.toLowerCase();

    self.index += 1; // this will match .length in the end

    if (tagname === "input") {
      self.handleInput($(this));
    } else {
      self.handleTheRest($(this), false);
    }

  });
}

Validate.prototype.handleInput = function($input) {
  // new html5 inputs that default to "text" in older browsers
  var _alsoTextInputs = ['text', 'tel', 'email'];

  if (_alsoTextInputs.indexOf($input[0].type) < 0) {
    this.handleTheRest($input, true);
  } else {
    var valType = $input.attr('data-validate-type');
    var valVal = $input.val();
    var valResult = this.validateText(valType, valVal);
    this.handleResult($input, valResult);
  }

};

Validate.prototype.handleTheRest = function($elem, fromInput) {
  var isValid = false;
  var tag, dataAttr, nameGroup;

  if (fromInput) {
    tag = $elem[0].type;
  } else {
    tag = $elem[0].tagName.toLowerCase();
  }

  switch (tag) {
    case "select":
      var $currentOption = $elem.find(":selected");
      dataAttr = $currentOption[0].getAttribute('data-validate-type');
      isValid = (dataAttr === null) ? true : false;
      break;
    case "checkbox":
      nameGroup = $elem.attr('name');
      var $checked = $("input[name='" + nameGroup + "']:checked");
      dataAttr = $elem[0].getAttribute('data-validate-checkbox');

      if (dataAttr !== null) {
        var total = parseFloat(dataAttr.replace(/[min|max]/g, ''));
        var quantifier = dataAttr.replace(/[0-9]/g, '');

        if (quantifier === "max") {
          isValid = ($checked.length > 0 && $checked.length <= total) ? true : false;
        } else if (quantifier === "min") {
          isValid = ($checked.length >= total) ? true : false;
        } else {
          isValid = ($checked.length === total) ? true : false;
        }

      } else {
        isValid = $elem.is(':checked');
      }

      break;
    case "radio":
      nameGroup = $elem.attr('name');
      isValid = ($("input[name='" + nameGroup + "']").is(":checked")) ? true : false;
      break;
    case "textarea":
      isValid = (!$.trim($elem.val())) ? false : true;
      break;
    case "file":
      isValid = (!$elem.val()) ? false : true;
      break;
    default:
      console.warn('Validator: ' + tag + ' element is not supported');
      break;
  }

  if (!isValid) {
    this.errors += 1;
  }

  this.handleResult($elem, isValid);
};

function valDate(str, isShort) {
  var _short = isShort || false;

  // first we test for XX/XX/XXXX or XX/XX format
  if (!_short && !/\d{2}\/\d{2}\/\d{4}/i.test(str)) {
    return false;
  }
  if (_short && !/\d{2}\/\d{2}/i.test(str)) {
    return false;
  }

  // next we check each part
  var _s = str.split("/");
  var _month = parseInt(_s[0],10);
  var _day = parseInt(_s[1],10);

  if (_month === 0 || _month > 12) {
    return false;
  }
  
  // account for February
  if (_month === 2 && _day > 29) {
    return false;
  }

  if (_day === 0 || _day > 31) {
    return false;
  }
  
  return true;
}

Validate.prototype.validateText = function(type, val) {
  var _type = type || false;
  var _val = val || "";
  var validate_result = false; // true is good, means it passed

  if (!_type) {
    console.warn('Validator.validateText: type is undefined');
    return false;
  }

  if (_val === "") {
    // for blank entries we skip the switch and just set it to false
    validate_result = false;
  } else {

    switch (_type) {
      case "name":
        validate_result = /[a-zA-Z\d''-'\s]+/.test(_val);
        break;
      case "phone":
        validate_result = /(\(\d{3}\))?[\d\-\.\s]{7,}/.test(_val);
        break;
      case "email":
        validate_result = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(_val);
        break;
      case "zip":
        validate_result = /^\d{5}$/.test(_val);
        break;
      case "zip4":
        // source: https://www.owasp.org/index.php/Input_Validation_Cheat_Sheet#White_List_Regular_Expression_Examples
        validate_result = /^\d{5}(-\d{4})?$/.test(_val);
        break;
      case "num":
        validate_result = /^\d+$/.test(_val);
        break;
      case "time":
        // allows:  ##  and ##:##  
        validate_result = /^\d{1,2}(:\d{2})?$/.test(_val);
        break;
      case "req":
        validate_result = /.+/i.test(_val);
        break;
      case "date-full":
        // this only validates numbers in this format MM/DD/YYYY 
        // not a very strict regex because 99/99/9999 validates
        validate_result = valDate(_val);
        break;
      case "date-short":
        // this only validates numbers in this format MM/DD/YYYY 
        // not a very strict regex because 99/99/9999 validates
        validate_result = valDate(_val, true);
        break;
      case "state":
        // source: https://www.owasp.org/index.php/Input_Validation_Cheat_Sheet#White_List_Regular_Expression_Examples
        validate_result = /^(AA|AE|AP|AL|AK|AS|AZ|AR|CA|CO|CT|DE|DC|FM|FL|GA|GU|HI|ID|IL|IN|IA|KS|KY|LA|ME|MH|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|MP|OH|OK|OR|PW|PA|PR|RI|SC|SD|TN|TX|UT|VT|VI|VA|WA|WV|WI|WY)$/.test(val);
        break;
      default:
        console.warn('Validator: the data-validate-type you are using is not supported');
        break;
    }

  }

  if (!validate_result) {
    this.errors += 1;
  }

  return validate_result;
};

Validate.prototype.handleResult = function($elem, result) {

  if (!result && typeof this.options.error === 'function') {
    this.options.error($elem);
  } 

  if (result && typeof this.options.success === 'function') {
    this.options.success($elem);
  } 

  if (this.index === this.$classname.length && typeof this.options.complete === "function") {
    this.options.complete(this.errors);
  }

  // some debugging with nice formating in Chrome
  if (this.options.debug) {
    var currDebug = {
      tag: $elem[0].type || $elem[0].tagName,
      name: $elem.attr('name'),
      value: $elem.val(),
      pass: result
    };

    this.resultTable.push(currDebug);
    if (this.index === this.$classname.length) {
      if (console.table) {
        console.table(this.resultTable);
      }
      console.log(this.errors + " errors found");
    }
  }

};


module.exports = Validate;