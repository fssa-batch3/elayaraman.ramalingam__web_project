let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
  currentUser = JSON.parse(sessionStorage.getItem("tempuser"));
}

console.log(currentUser);

const UserList = JSON.parse(localStorage.getItem("userList"));

const id = currentUser.userph;

const user = UserList.find((userCheck) => userCheck.userph === id);

const { userContacts } = user;
console.log(userContacts);
const userHomeList = [];
// const requestList = JSON.parse(localStorage.getItem("requestList")) || [];

// loop to get list of users without the current user

const contactArray = [];

for (let i = 0; i < userContacts.length; i += 1) {
  contactArray.push(userContacts[i].id);
}

console.log(contactArray);

for (let i = 0; i < UserList.length; i += 1) {
  if (contactArray.includes(UserList[i].userph)) {
    userHomeList.push(UserList[i]);
  }
}
console.log(userHomeList);

function loadUser() {
  if (userContacts.length === 0) {
    const str = document.createElement("p");
    str.textContent = "You have no contacts in your list to chat";
    document.querySelector(".m-body").appendChild(str);
  }
  for (let i = 0; i < userHomeList.length; i += 1) {
    const profileCard = `
            <div class="profile-card">
                <img src="../assets/images/profile/4.jpg" alt="${userHomeList[i].username}" height="50px">
                <div class="content" onclick="window.location.href='./chat.html?id=${userHomeList[i].userph}'">
                    <p>${userHomeList[i].username}</p>
                    <span>${userHomeList[i].userph}</span>
                </div>
            </div>
        `;
    document
      .querySelector(".m-body")
      .insertAdjacentHTML("beforeend", profileCard);
  }
}
window.addEventListener("load", loadUser);
