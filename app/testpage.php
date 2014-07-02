<?php 
  $bodyAttributes = array(
    "id" => "testpage",
    "data-route" => "testpage"
  );

  include('inc/head.php'); 

 // this is a throwaway page to test some of the JS modules.  
 // disregard the inline style block, etc ,etc
?>

    <style>
        body { padding: 0 20px; }
        .error { color: red; display: none; }
        p { margin-bottom: 3px; }
        input[type="text"], textarea { width: 80%; }
        label {display: block; margin: 5px 0;  }
        .container { width: 900px; margin: 20px auto;}
    </style>

  <a href="#" class="ga_event" data-ga-category="testCat" data-ga-action="testAction" data-ga-label="testLabel" data-ga-value="testValue">GA Test link 1</a>

  <a href="#" class="ga_event" data-ga-category="testCat2" data-ga-action="testAction2" data-ga-label="testLabel2" data-ga-value="testValue2">GA Test link 2</a>

  <form id="testForm">
      <label>
          <p>Name</p>
          <input type="text" name="name" class="js-validate" data-validate-type="name" /> 
          <span class="error">error!</span>
      </label>
      
      <label>
          <p>Phone</p>
          <input type="text" name="phone" class="js-validate" data-validate-type="phone" /> 
          <span class="error">error!</span>
      </label>
      
      <label>
          <p>email</p>
          <input type="text" name="email" class="js-validate" data-validate-type="email" /> 
          <span class="error">error!</span>
      </label>
      
      <label>
          <p>zip</p>
          <input type="text" name="zip" class="js-validate" data-validate-type="zip" maxlength="5" />
          <span class="error">error!</span>
      </label>
      
      <label>
          <p>zip4</p>
          <input type="text" name="zip4" class="js-validate" data-validate-type="zip4" />
          <span class="error">error!</span>
      </label>
      
      <label>
          <p>state</p>
          <input type="text" name="state" class="js-validate" data-validate-type="state" maxlength="2" />
          <span class="error">error!</span>
      </label>
      
      <label>
          <p>num</p>
          <input type="text" name="numbers" class="js-validate" data-validate-type="num" maxlength="4" />
          <span class="error">error!</span>
      </label>
      
      <label>
          <p>text</p>
          <textarea name="story" class="js-validate"></textarea>
          <span class="error">error!</span>
      </label>
      
      <label>
          <p> pick one </p>
          <input type="radio" name="test1" class="js-validate" />test 1
          <input type="radio" name="test1" class="js-validate" />test 2
          <span class="error">error!</span>
      </label>
      
      <label>
          <p> pick another one</p>
          <input type="radio" name="test2" class="js-validate" />test 3
          <input type="radio" name="test2" class="js-validate" />test 4
          <span class="error">error!</span>
      </label>    
      
      <label>
          <select class="js-validate">
              <option value="none" selected="selected" data-validate-type="ignore">select</option>
              <option value="1">something</option>
              <option value="2">something</option>
          </select>
          <span class="error">error!</span>
      </label>
      
      <label>
          <p>One checkbox</p>
          <input type="checkbox" class="js-validate" name="consent" />I agree
          <span class="error">error!</span>
      </label>
      
      <p>Multiple Checkboxes with the same name</p>
      
      <label>
          <p> where did you hear about this program , please choose at <strong>least</strong> 2</p>
          <input type="checkbox" class="js-validate" data-validate-checkbox="min2" name="sources" /> Online <br />
          <input type="checkbox" name="sources" /> TV <br />
          <input type="checkbox" name="sources" /> Radio <br />
          <input type="checkbox" name="sources" /> Friend <br />
          <input type="checkbox" name="sources" /> Other <br />
          <span class="error">error!</span>
      </label>
      
      <label>
          <p> where did you hear about this program , please choose at <strong>most</strong> 2</p>
          <input type="checkbox" class="js-validate" data-validate-checkbox="max2" name="places" /> Online <br />
          <input type="checkbox" name="places" /> TV <br />
          <input type="checkbox" name="places" /> Radio <br />
          <input type="checkbox" name="places" /> Friend <br />
          <input type="checkbox" name="places" /> Other <br />
          <span class="error">error!</span>
      </label>
      
      <label>
          <p> where did you hear about this program , please choose <strong>exactly</strong> 3</p>
          <input type="checkbox" class="js-validate" data-validate-checkbox="3" name="survey3" /> Online <br />
          <input type="checkbox" name="survey3" /> TV <br />
          <input type="checkbox" name="survey3" /> Radio <br />
          <input type="checkbox" name="survey3" /> Friend <br />
          <input type="checkbox" name="survey3" /> Other <br />
          <span class="error">error!</span>
      </label>
      
      <input type="submit" id="submit" />
      
      <p id="complete" class="error">Please fix your errors and try again</p>
  </form>

<?php include('inc/footer.php'); ?>