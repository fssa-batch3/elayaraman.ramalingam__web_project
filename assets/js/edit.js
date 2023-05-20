const currentUser =
  JSON.parse(sessionStorage.getItem("currentUser"));

if (!currentUser) {
  alert("There is a problem in your login please login again");
  window.location.href = "./login.html";
}

console.log(currentUser);

const UserList = JSON.parse(localStorage.getItem("userList"));

console.log(UserList);

const user = UserList.find((user) => user.userph === currentUser.userph);


const userNameField = document.getElementById("editUserName");
const userphField = document.getElementById("userph");

console.log(userNameField);
console.log(userphField);

userNameField.value = user.username;



function submit() {
  const newUserName = userNameField.value.trim();
  console.log(newUserName);
  if (!newUserName) return alert("Please enter a valid username");

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