const currentUser =
  JSON.parse(sessionStorage.getItem("currentUser"));

console.log(currentUser);

if (!currentUser) {
  alert("There is a problem in your login please login again");
  window.location.href = "./login.html";
}

const UserList = JSON.parse(localStorage.getItem("userList"));

const user = UserList.find((userObj) => userObj.userph === currentUser.userph);

const { userContacts } = user;

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));


const profileObj = UserList.find((obj) => obj.userph === id);
console.log(profileObj);

const contactArr = userContacts.map(x => { return x.id });
console.log(contactArr);

const checkContact = contactArr.some(x => x === profileObj.userph);

const editdiv = document.querySelector('.edit');

console.log(editdiv);

console.log(checkContact);

if (checkContact) {
  editdiv.classList.remove("d-none");
  document.querySelector(".btn-holder").style.flexDirection = "row";


}

document.getElementById("username").value = profileObj.username;
document.getElementById("userph").value = profileObj.userph;

document.getElementById("edit").addEventListener("click", () => window.location.href = `./chat.html?id=${profileObj.userph}`)
