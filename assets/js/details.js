const currentUser =
  JSON.parse(sessionStorage.getItem("currentUser"));

console.log(currentUser);

if (!currentUser) {
  alert("There is a problem in your login please login again");
  window.location.href = "./login.html";
}
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

const deleteContact = document.querySelector(".delete-contact");

const UserList = JSON.parse(localStorage.getItem("userList"));

const convoList = JSON.parse(localStorage.getItem("convoList")) || [];

const user = UserList.find((userObj) => userObj.userph === currentUser.userph);

const contact = UserList.find((contactObj) => contactObj.userph === id);

const { userContacts } = user;

const contactContacts = contact.userContacts;

const profileObj = UserList.find((obj) => obj.userph === id);

const contactArr = userContacts.map(x => { return x.id });

const checkContact = contactArr.some(x => x === profileObj.userph);

const editdiv = document.querySelector('.edit');

if (checkContact) {
  editdiv.classList.remove("d-none");
  document.querySelector(".btn-holder").style.flexDirection = "row";
}
if (checkContact) {
  document.querySelector(".delete-btn").classList.remove("d-none");
}
document.getElementById("username").value = profileObj.username;
document.getElementById("userph").value = profileObj.userph;

document.getElementById("edit").addEventListener("click", () => window.location.href = `./chat.html?id=${profileObj.userph}`);

const index1 = userContacts.findIndex(contactObj => contactObj.id == id);
console.log(userContacts)
console.log(id)
console.log(index1)

const index2 = contactContacts.findIndex(contactObj => contactObj.id == user.userph);
console.log(contactContacts)
console.log(user.userph)
console.log(index2);

const testId1 = "" + id + user.userph;
console.log(testId1);
const testId2 = "" + user.userph + id;
console.log(testId2);
const convo = convoList.find(convo => convo.id == testId1 || convo.id == testId2);
console.log(convo);
const convoIndex = convoList.findIndex(convoObj => convoObj == convo);
console.log(convoIndex)

const contactIndex = convoList.findIndex(contactObj => {

})

deleteContact.addEventListener("click", () => {
  const result = confirm("Deleting this contact will require requesting the message again. Are you okay with that?");

      if (result) {
        userContacts.splice(index1, 1);
        contactContacts.splice(index2,1);
        convoList.splice(convoIndex, 1);
        alert("contact deleted click OK to go to home page");
        localStorage.setItem("convoList", JSON.stringify(convoList));
        localStorage.setItem("userList", JSON.stringify(UserList));
        window.location.href="./home.html";
      } else {
        alert("you can continue messaging")}
});
