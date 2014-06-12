(function(window,document){

  function Validator (options){
    // the constructor
    if (typeof options !== "object") {
      console.warn('Validator: options not defined');
      return false;
    }
    options.classname = options.classname || "js-valdiate";
    this.options = options;
    this.errors = 0;
    this.init();
  }

  Validator.prototype.init = function(){
    var self = this;

    $("." + self.options.classname).each(function(i){
      // if text, send to validateText
      // if select, make sure an option with a value is chosen
      // if checkbox, make sure it's selected
    });

  };

  Validator.prototype.validateText = function(type, val) {
    var type = type || null;
    var val = val || null;

    if (!type || !val) { 
      console.warn('Validator: type or val is undefined');
      return false;
    }

    var validate_result = false; // true is good, means it passed

    switch(type) {
      case "name":
        validate_result = /[a-zA-Z\d''-'\s]+/.test(val);
        break
      case "phone":
        validate_result = /\(?\d{3}\)?-? *\d{3}-? *-?\d{4}/.test(val);
        break;
      case "email":
        validate_result = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val);
        break;
      case "zip":
        validate_result = /^\d{5}$/.test(val);
        break;
      case "zip4":
        // source: https://www.owasp.org/index.php/Input_Validation_Cheat_Sheet#White_List_Regular_Expression_Examples
        validate_result = /^\d{5}(-\d{4})?$/.test(val);
        break;
      case "num":
        validate_result = /^\d+$/.test(val);
        break;
      case "state":
        // source: https://www.owasp.org/index.php/Input_Validation_Cheat_Sheet#White_List_Regular_Expression_Examples
        validate_result = /^(AA|AE|AP|AL|AK|AS|AZ|AR|CA|CO|CT|DE|DC|FM|FL|GA|GU|HI|ID|IL|IN|IA|KS|KY|LA|ME|MH|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|MP|OH|OK|OR|PW|PA|PR|RI|SC|SD|TN|TX|UT|VT|VI|VA|WA|WV|WI|WY)$/.test(val);
        break;
      default:
        // default to the "name regex"
        validate_result = /[a-zA-Z\d''-'\s]+/.test(val);
        break;
    }

    if (!validate_result) {
      this.errors += 1;
    }

    return validate_result;
  };

  return Validator;

})(window,document);