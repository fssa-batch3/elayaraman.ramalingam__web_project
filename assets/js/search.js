// **declarations**

// logged user
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
  currentUser = JSON.parse(sessionStorage.getItem("tempuser"));
}

const UserList = JSON.parse(localStorage.getItem("userList"));
const id = currentUser.userph;
const user = UserList.find((user) => user.userph === id);
const userHomeList = [];
const requestList = JSON.parse(localStorage.getItem("requestList")) || [];

console.log(UserList);

// loop to get list of users without the current user and contacts

const contact_list = [];

for (let i = 0; i < user.userContacts.length; i++) {
  contact_list.push(user.userContacts[i].id);
}

for (let i = 0; i < UserList.length; i++) {
  if (UserList[i].userph.includes(contact_list) && id !== UserList[i].userph) {
    userHomeList.push(UserList[i]);
  }
}

function request(id) {
  const sender = user.userph;
  const req_id = (sender + id).toString();
  const requestObj = {
    req_id,
    sender,
    receiver: id,
    status: false,
    timestamp: Date.now(),
  };
  requestList.push(requestObj);
  localStorage.setItem("requestList", JSON.stringify(requestList));
  document.querySelector(".m-body").innerHTML = "";
  loadList();
}
function can_request(id) {
  requestList.splice(
    requestList.findIndex(
      (req) => req.sender === id && req.receiver === user.userph
    ),
    1
  );
  localStorage.setItem("requestList", JSON.stringify(requestList));
  document.querySelector(".m-body").innerHTML = "";
  loadList();
}

console.log(userHomeList);

// const userSearchList = [];

function loadList() {
  document.querySelector(".m-body").innerHTML = "";
  for (let i = 0; i < userHomeList.length; i++) {
    const contact = userHomeList[i];
    const check = requestList.some(
      (req) => req.sender === contact.userph && req.receiver === user.userph
    );

    const check_status = requestList.some(
      (req) => req.sender === user.userph && req.receiver === contact.userph
    );
    const status = !check_status ? request : can_request;
    const btn_text = !check_status ? "Request" : "Cancel";

    if (!check) {
      const profileCard = `
                        <div class="profile-card">
                        <img src="../assets/images/profile/4.jpg" alt="" height="60px" onclick="window.location.href='./details.html?id=${contact.userph}'">
                        <div class="content">
                            <p>${contact.username}</p>
                            <div class="card-holder">
                            <button class="req" onclick="${status}(${contact.userph})">
                                ${btn_text}
                            </button>
                            </div>
                        </div>
                        </div>
                        `;
      document.querySelector(".m-body").innerHTML += profileCard;
    }
    // if(check) {
    //     const profileCard = `
    //             <div class="profile-card">
    //             <img src="../assets/images/profile/4.jpg" alt="" height="60px">
    //             <div class="content">
    //                 <p>${contact.username}</p>
    //                 <div class="card-holder">
    //                 <button class="req" onclick="can_request(${contact.userph})">
    //                     cancel
    //                 </button>
    //                 </div>
    //             </div>
    //             </div>
    //             `;
    //     document.querySelector(".m-body").innerHTML += profileCard;
    // }
  }
}
