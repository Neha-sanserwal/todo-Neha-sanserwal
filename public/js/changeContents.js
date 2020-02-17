const loadSignUpPage = function() {
  const todoPage = document.querySelector('.todoPage');
  todoPage.innerHTML = ` <div class="loginPage">
        <h1> Sign Up </h1>
        <div class="loginContainer">
          <input type="text" onfocusout ='checkUserAvailability(this.value)' placeholder="username" name="username"/>
          <input type="password" placeholder="password" name="password"/>
          <input type="password" onkeyup= "showPassNotMatchError(this)" placeholder="re-enter password" name ='confirmPass'/>
          <div class = 'errorMsg'></div>
          <button onclick="sendAuthDetails('/signup')" id='signUpBtn' disabled>SIGN UP</button>
          <div>Already have an account <a href="" onclick="loadLoginPage()">Sign In</a> here</div>
        </div>
      </div>`;
};

const loadLoginPage = function() {
  const todoPage = document.querySelector('.todoPage');
  todoPage.innerHTML = `<div class="loginPage">
        <h1>Log In</h1>
        <div class="loginContainer">
          <input type="text" onfocus="setMsg('')" placeholder="username" name="username"/>
          <input type="password" onfocus="setMsg('')" placeholder="password" name="password" />
          <div class = 'errorMsg'></div>
          <button onclick="sendAuthDetails('/login')" id="loginBtn">SIGN IN</button>
          <div>
            Don't have account
            <a href="#" onclick="loadSignUpPage()">Sign Up</a> here
          </div>
        </div>
      </div>`;
};

const loadTodoNav = function() {
  const nav = document.querySelector('.headers');
  nav.innerHTML = `<div class="heading">
        <h1>POST IT</h1>
      </div>
      <div class="searchBar">
        <input
          required
          type="text"
          value=""
          onkeyup="sendSearchRequest(event)"
          placeholder="&#xF002; Search"
        />
        <div class="toggle">
          <input type="checkbox" id="check" />
          <label for="check" onclick="changeSearchBy()">
            <div class="searchBy" data-searchby="Title"></div>
          </label>
        </div>
        <button onclick="sendLogoutRequest()">logout</button>
      </div>`;
};

const changeMainPageContent = function(status, responseText, contentClass) {
  const Ok = 200;
  if (status === Ok) {
    document.getElementsByClassName(contentClass)[0].innerHTML = responseText;
  }
};
const changeSearchBy = function() {
  const searchBy = document.querySelector('.searchBy');
  const option = searchBy.dataset.searchby;
  if (option === 'Title') {
    searchBy.setAttribute('data-searchby', 'Task');
    return;
  }
  searchBy.setAttribute('data-searchby', 'Title');
};
const showNewTaskForm = function(event) {
  const bucketId = event.target.id;
  const taskInput = document.querySelector(`#newTask${bucketId}`);
  if (taskInput.style.display === 'flex') {
    taskInput.style.display = 'none';
    return;
  }
  taskInput.style.display = 'flex';
};

const setMsg = function(msg, color) {
  const errorBox = document.querySelector('.errorMsg');
  errorBox.innerHTML = msg;
  errorBox.style.color = color;
};
const showPassNotMatchError = function(confirmPass) {
  const password = document.querySelector('input[name="password"]').value;
  const signup = document.querySelector('#signUpBtn');
  if (password !== confirmPass.value) {
    setMsg(
      'The password you entered did not matched. Please re-enter your password.',
      'red'
    );
    return signup.setAttribute('disabled', true);
  }
  setMsg('password matched', 'green');
  signup.removeAttribute('disabled');
};

const calledAfterAuth = function(status, responseText) {
  if (status === 403 && responseText === 'invalidUserNameOrPassword') {
    return setMsg('invalid userName or Password', 'red');
  }
  return serveTodo();
};

const calledAfterUserAvail = function(status, responseText) {
  const signup = document.querySelector('#signUpBtn');
  if (responseText === 'userAlreadyExists' && status === 422) {
    return setMsg('username already exists', 'red');
  }
  setMsg('username available', 'green');
  signup.removeAttribute('disabled');
};
