
## Simple Javascript Form Validation

### requires jQuery

A simple library to run form field validation to check if user has correctly filled out a form.  

1. It <b>does not protect against XSS</b>, that should be handled on the server
2. It does not handle UI, you take care of that in the error/success options

####in your JS:

```javascript
var validate = new Validator({
  classname: "js-validate",        - this is optional, it will default to "js-validate" if not set
  error: function(e,i){},          - run this function on error, handle your UI here.
  success: function(e,i){}         - run this function on success, handle your UI here
});
```

####in your HTML:

Adding the classname to an input, select, or textarea makes that field a required field and validates it.  Continue reading for more details on each supported type of form element.

#####Text inputs:
You must add a data attribute that specifies what type of validation to perform on this input
```
<input type="text" class="js-validate" name="first_name" data-validate-type="name" />
```

here are the different text validation types
  data-validate-type="name"  
  data-validate-type="phone"  
  data-validate-type="email"  
  data-validate-type="zip"  
  data-validate-type="zip4"   - allows the optional 4 digits
  
  data-validate-type="num"    - for fields that should only have numbers
  
  data-validate-type="state"  - in case you decide to use a text input instead of a select for US states

#####Textareas and Checkboxes

Adding the classname to a textarea only checks if it is empty or not. 

```
<textarea class="js-validate"></textarea>
```

#####Selects
This one is slightly more tricky.  If you require that a user choose an option other than the default selected option, then you put this data attribute on that default selected option:  

data-validate-type="select"

```
<select class="js-validate">
  <option value="none" selected="selected" data-validate-type="select">select</option>
  <option value="1">something<option>
  <option value="2">something<option>
</select>
```

#####Checkbox
adding the classname will just check if checked or not
```
<input type="checkbox" class="js-validate" name="consent" />
```

#####Radios
adding the classname will just check if checked or not
```
<input type="radio" class="js-validate" name="consent" />
```


4. There are 4 areas where you can put custom functions on completeion, the are run in this order. 
  - run on each item that has an error
  - run just once on error
  - run on each item that was correct
  - run just once on success
