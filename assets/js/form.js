
const userList = JSON.parse(localStorage.getItem("userList")) || [];
console.log(userList);

// use uuidv4() to generate UUID

function reg(e) {
  e.preventDefault();
  console.log("Hello world!");

  const [username, passwd, userpasswd] = [
    "username",
    "passwd",
    "userpasswd",
  ].map((id) => document.getElementById(id).value.trim());

  const userph = parseInt(document.getElementById("userph").value.trim(), 10);

  const regcheck = document.getElementById("regcheck").checked;

  if (!username || !passwd || !userpasswd || !userph)
    return alert("Please fill out all the fields");

  if (!/^[a-zA-Z0-9_-\s]{5,12}$/.test(username))
    return alert("Enter valid username");

  if (!/^\d{10}$/.test(userph)) return alert("Enter valid Phone number");

  if (passwd !== userpasswd) return alert("both passwords should match");

  if (userList.some((user) => user.userph === userph))
    return alert("This Phone number is already registered!");

  if (regcheck) {
    const user = {
      id: uuidv4(),
      username,
      userph,
      passwd: userpasswd,
      userContacts: [],
    };
    localStorage.setItem("userList", JSON.stringify([...userList, user]));
    document.querySelector("input").value = "";
    window.location.href = "./pages/login.html";
  } else {
    alert("Please Agree to our policies!");
  }
}

const regform = document.getElementById("reg");
if (regform) {
  regform.addEventListener("submit", reg);
}


// code for login form

function login(e) {
  e.preventDefault();

  const userph = parseInt(document.getElementById("userph").value.trim(), 10);

  const userpasswd = document.getElementById("userpasswd").value.trim();

  console.log(userph);
  console.log(userpasswd);

  // const userList = JSON.parse(localStorage.getItem("userList")) || [];
  const user = userList.find(
    (X) => X.userph === userph && X.passwd === userpasswd
  );

  if (!user) {
    alert("Invalid phone number or password!");
    return;
  }
  sessionStorage.removeItem("currentUser");
  sessionStorage.setItem("currentUser", JSON.stringify(user));
  alert(`Welcome! ${user.username} 😊`);
  window.location.href = "./home.html";
}

const loginForm = document.getElementById("login");
if (loginForm) {
  loginForm.addEventListener("submit", login);
}