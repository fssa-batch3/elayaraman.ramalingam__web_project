let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
  currentUser = JSON.parse(sessionStorage.getItem("tempuser"));
}

const UserList = JSON.parse(localStorage.getItem("userList"));

const id = currentUser.userph;

const user = UserList.find((user) => user.userph === id);

function profile() {
  document.getElementById("username").value = user.username;
  document.getElementById("userph").value = user.userph;
}

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

function submit() {
  const username = document.getElementById("username").value.trim();
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
}
