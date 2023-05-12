const currentUser =
  JSON.parse(localStorage.getItem("currentUser")) ||
  JSON.parse(sessionStorage.getItem("tempuser"));

  console.log(currentUser);

if (!currentUser) {
  alert("There is a problem in your login please login again");
  window.location.href = "./login.html";
}

console.log(currentUser);

const UserList = JSON.parse(localStorage.getItem("userList"));

const user = UserList.find((userObj) => userObj.userph === currentUser.userph);

const { userContacts } = user;

const contactList = user.userContacts.map((contact) => contact.id);

const userHomeList = UserList.filter((x) => contactList.includes(x.userph));

function loadUser() {
  if (userContacts.length === 0) {
    const str = document.createElement("p");
    str.textContent = "You have no contacts in your list to chat";
    document.querySelector(".m-body").appendChild(str);
  }
  userHomeList.forEach((userObj) => {
    const profileCard = `
      <div class="profile-card">
        <img src="../assets/images/profile/4.jpg" alt="${userObj.username}" height="50px">
        <div class="content" onclick="window.location.href='./chat.html?id=${userObj.userph}'">
          <p>${userObj.username}</p>
          <span>${userObj.userph}</span>
        </div>
      </div>
    `;
    document
      .querySelector(".m-body")
      .insertAdjacentHTML("beforeend", profileCard);
  });
}
window.addEventListener("load", loadUser);
