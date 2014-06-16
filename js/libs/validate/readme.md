
## Simple Javascript Form Validation

### requires jQuery

A simple library to run form field validation to check if user has correctly filled out a form.  

1. It <b>does not protect against XSS</b>, that should be handled on the server
2. It does not handle UI, you take care of that in the error/success options

####in your JS:

```javascript
var validate = new Validator({
  classname: "js-validate",         // this is optional, it will default to "js-validate" if not set
  error: function($elem){},         // run this function on error, handle your UI here.
  success: function($elem){},       // run this function on success, handle your UI here
  debug: true or false              // adds more detailed info to console.log 
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

#####Textareas

Adding the classname to a textarea only checks if it is empty or not. 

```
<textarea class="js-validate"></textarea>
```

#####Selects
This one is slightly different. If you require that a user must select an option then you put the data attribute on the default option that shows on page load.  If they leave it on that option it will show an error.

data-validate-type="ignore"  
actually that text can be anything, the code just looks for the existence of the data attribute

```
<select class="js-validate">
  <option value="none" selected="selected" data-validate-type="ignore">select</option>
  <option value="1">something<option>
  <option value="2">something<option>
</select>
```

#####Checkbox
just add the classname and it will make that checkbox required  
tbd: multiple checkboxes with the same name
```
<input type="checkbox" class="js-validate" name="consent" /> I agree
```

#####Radios
When you added the classname it'll just make sure that one of the radios with the same name has been selected  
```
<input type="radio" class="js-validate" name="options" /> Red
<input type="radio" class="js-validate" name="options" /> Blue
<input type="radio" class="js-validate" name="options" /> Green
```

