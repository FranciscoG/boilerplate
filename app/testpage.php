<?php 
  $bodyAttributes = array(
    "id" => "testpage",
    "data-route" => "testpage"
  );

  include('inc/head.php'); 

 // this is a throwaway page to test some of the JS modules.  
 // disregard the inline style block, etc ,etc
?>

  <a href="#" class="ga_event" data-ga-category="testCat" data-ga-action="testAction" data-ga-label="testLabel" data-ga-value="testValue">GA Test link 1</a>

  <a href="#" class="ga_event" data-ga-category="testCat2" data-ga-action="testAction2" data-ga-label="testLabel2" data-ga-value="testValue2">GA Test link 2</a>

  <form id="testForm">
      <div class="input-box">
          <label for="name">Name</label>
          <input type="text" name="name" class="js-validate" data-validate-type="name" /> 
          <span class="error">error!</span>
      </div>
      
      <div class="input-box">
          <label for="phone">Phone</label>
          <input type="text" name="phone" class="js-validate" data-validate-type="phone" /> 
          <span class="error">error!</span>
      </div>
      
      <div class="input-box">
          <label for="email">email</label>
          <input type="text" name="email" class="js-validate" data-validate-type="email" /> 
          <span class="error">error!</span>
      </div>
      
      <div class="input-box">
          <label for="zip">zip</label>
          <input type="text" name="zip" class="js-validate" data-validate-type="zip" maxlength="5" />
          <span class="error">error!</span>
      </div>
      
      <div class="input-box">
          <label for="zip4">zip4</label>
          <input type="text" name="zip4" class="js-validate" data-validate-type="zip4" />
          <span class="error">error!</span>
      </div>
      
      <div class="input-box">
      <label>
          <p>state</p>
          <input type="text" name="state" class="js-validate" data-validate-type="state" maxlength="2" />
          <span class="error">error!</span>
      </label>
      </div>
      
      <div class="input-box">
          <label for="numbers">num</label>
          <input type="text" name="numbers" class="js-validate" data-validate-type="num" maxlength="4" />
          <span class="error">error!</span>
      </div>
      
      <div class="textarea-box">
          <label for="story">text</label>
          <textarea name="story" class="js-validate"></textarea>
          <span class="error">error!</span>
      </div>
      
      <div class="radio-box">
        <p> pick one </p>
        <label>
            <input type="radio" name="test1" class="js-validate" /> test 1
        </label>
        <label>
            <input type="radio" name="test1" class="js-validate" /> test 2
        </label>
        <span class="error">error!</span>
      </div>
      
      <div class="radio-box">
        <p> pick another one</p>
        <label>
            <input type="radio" name="test2" class="js-validate" />test 3
        </label>
        <label>
            <input type="radio" name="test2" class="js-validate" />test 4
        </label>
        <span class="error">error!</span>
      </div>
      
      <div class="select-box">
        <select class="js-validate">
            <option value="none" selected="selected" data-validate-type="ignore">select</option>
            <option value="1">something</option>
            <option value="2">something</option>
        </select>
        <span class="error">error!</span>
      </div>
      
      <div class="check-box">
          <label for="consent">One checkbox</label>
          <input type="checkbox" class="js-validate" name="consent" />I agree
          <span class="error">error!</span>
      </div>
      
      <p>Multiple Checkboxes with the same name</p>
      
      <div class="check-box">
        <p> where did you hear about this program , please choose at <strong>least</strong> 2</p>
        <label>
            <input type="checkbox" class="js-validate" data-validate-checkbox="min2" name="sources" /> Online 
        </label>
        <label>
            <input type="checkbox" name="sources" /> TV
        </label>
        <label>
            <input type="checkbox" name="sources" /> Radio
        </label>
        <label>
            <input type="checkbox" name="sources" /> Friend
        </label>
        <label>
            <input type="checkbox" name="sources" /> Other
        </label>
        <span class="error">error!</span>
      </div>

      <div class="check-box">
        <p> where did you hear about this program , please choose at <strong>most</strong> 2</p>
        <label>
            <input type="checkbox" class="js-validate" data-validate-checkbox="max2" name="places" /> Online
        </label>
        <label>
            <input type="checkbox" name="places" /> TV
        </label>
        <label>
            <input type="checkbox" name="places" /> Radio
        </label>
        <label>
            <input type="checkbox" name="places" /> Friend
        </label>
        <label> 
            <input type="checkbox" name="places" /> Other
        </label>
        <span class="error">error!</span>
      </div>
      
      <div class="check-box">
        <p> where did you hear about this program , please choose <strong>exactly</strong> 3</p>
        <label>
          <input type="checkbox" class="js-validate" data-validate-checkbox="3" name="survey3" /> Online 
        </label>
        <label>
          <input type="checkbox" name="survey3" /> TV 
        </label>
        <label>
          <input type="checkbox" name="survey3" /> Radio 
        </label>
        <label>
          <input type="checkbox" name="survey3" /> Friend
        </label>
        <label>
          <input type="checkbox" name="survey3" /> Other
        </label>
        <span class="error">error!</span>
      </div>
      
      <input type="submit" id="submit" />
      
      <p id="complete" class="error">Please fix your errors and try again</p>
  </form>

<?php include('inc/footer.php'); ?>