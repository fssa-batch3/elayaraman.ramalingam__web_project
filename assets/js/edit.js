if (!currentUser) {
  alert("There is a problem in your login please login again");
  window.location.href = "./login.html";
}

const currentUser =
  JSON.parse(localStorage.getItem("currentUser")) ||
  JSON.parse(sessionStorage.getItem("tempuser"));

const UserList = JSON.parse(localStorage.getItem("userList"));

const user = UserList.find((user) => user.userph === currentUser.userph);

const username = user.username;

const userNameField = document.getElementById("editUserName");

function submit() {
  const newUserName = userNameField.value.trim();
  console.log(newUserName);
  if(!newUserName) return alert("Please enter a valid username");

  currentUser.username = newUserName;
  user.username = newUserName;

  const passwd = prompt("Enter your password");
  if (passwd === currentUser.passwd) {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    sessionStorage.setItem("tempuser", JSON.stringify(currentUser));
    localStorage.setItem("userList", JSON.stringify(UserList));

    window.location.href = "./profile.html";
  } else {
    alert("Password is incorrect");
  }
}

const byId = (id) => document.getElementById(id);

const back = document.querySelector("#back");

byId("edit").addEventListener("click", submit);

byId("back").addEventListener(
  "click",
  () => window.location.href = "./profile.html"
);