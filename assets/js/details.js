let UserList = JSON.parse(localStorage.getItem("userList"));
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let userid = currentUser.userph;

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const user = UserList.find(UserList => UserList.userph === id);

console.log(user);

function profile(){
    document.getElementById("username").value = user.username;
    document.getElementById("userph").value = user.userph;
}