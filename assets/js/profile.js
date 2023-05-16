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


const userNameField = document.getElementById("username") ;
const userphField = document.getElementById("userph") ;

console.log(userNameField);
console.log(userphField);

userNameField.value = user.username;
userphField.value = user.userph;

function logout() {
  sessionStorage.clear();
  localStorage.removeItem("currentUser");
  window.location.href = "./login.html";
}

function deleteUser() {
  UserList.splice(index, 1);
  localStorage.setItem("userList", JSON.stringify(UserList));

  sessionStorage.clear();
  localStorage.removeItem("currentUser");

  window.location.href = "../index.html";
}

// js for edit page

function submit() {
  console.log(username);
  if (!username) return alert("Enter valid username");
  currentUser.username = username;
  UserList[index].username = username;

  const passwd = prompt("Enter your password");
  if (passwd === currentUser.passwd) {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    sessionStorage.setItem("tempuser", JSON.stringify(currentUser));
    localStorage.setItem("userList", JSON.stringify(UserList));

    window.location.href = "/profile.html";
  } else {
    alert("Password is incorrect");
  }
};

document.getElementById("edit").addEventListener("click", () =>{
  window.location.href = "./edit.html";
});
document.getElementById("back").addEventListener("click", () =>{
  window.location.href = "./home.html";
});
document.getElementById("logout").addEventListener("click", () =>{
  window.location.href = "./login.html";
});