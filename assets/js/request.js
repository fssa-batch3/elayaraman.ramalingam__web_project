if (!currentUser) {
  alert("There is a problem in your login please login again");
  window.location.href = "./login.html";
}

const currentUser =
  JSON.parse(localStorage.getItem("currentUser")) ||
  JSON.parse(sessionStorage.getItem("tempuser"));
const UserList = JSON.parse(localStorage.getItem("userList"));
const user = UserList.find((userObj) => userObj.userph === currentUser.userph);
const requestList = JSON.parse(localStorage.getItem("requestList")) || [];
const body = document.querySelector(".m-body");

// create req-list

const reqNum = requestList.filter(request => request.receiver === user.userph)
  .map(request => request.sender);

const reqList = UserList.filter(
  (userObj) => reqNum.includes(userObj.userph));

  console.log(reqList);

console.log(reqList)
// function to load requests in request page
function loadRequest() {
  body.innerHTML = "";
  reqList.forEach((request) =>{

    const  sender  = request;

    const profileCard = `
    <div class="profile-card">
    <img src="../assets/images/profile/4.jpg" alt="" height="60px" onclick="window.location.href='./details.html?id=${sender.userph}'">
        <div class="content">
            <p>${sender.username}</p>
            <div class="card-holder">
                <button class="yes" data-num=${sender.userph} onclick="addContact(${sender.userph})">
                    <i class="fi fi-br-check"></i>
                </button>
                <button class="no" data-num=${sender.userph} onclick="removeReq(${sender.userph})">
                    <i class="fi fi-br-cross"></i>
                </button>
            </div>
        </div>
    </div>
`;
body.innerHTML += profileCard;

  });
}

document.querySelectorAll(".yes, .no").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (btn.classList.contains("yes")) {
      addContact(e.target.dataset.num);
    } else if (btn.classList.contains("no")) {
      removeReq(e.target.dataset.num);
    }
  });
});

function addContact(num) {
  parseInt(num,10);
  const sender = UserList.find((req) => req.userph === num);
  const contactObjectForUser = {
    id: num,
    status: true,
  };
  const contactObjectForSender = {
    id: user.userph,
    status: true,
  };
  const { userContacts } = user;
  const senderContacts = sender.userContacts;
  userContacts.push(contactObjectForUser);
  senderContacts.push(contactObjectForSender);
  requestList.splice(
    requestList.findIndex(
      (req) => req.sender === num && req.receiver === parseInt(user.userph,10)
    ),
    1
  );
  localStorage.setItem("requestList", JSON.stringify(requestList));
  localStorage.setItem("userList", JSON.stringify(UserList));
  body.innerHTML = "";
  loadRequest();
}
function removeReq(num) {
  parseInt(num,10);
  console.log(num);
  requestList.splice(
    requestList.findIndex(
      (req) => req.sender === num && req.receiver === parseInt(user.userph,10)
    ),
    1
  );
  localStorage.setItem("requestList", JSON.stringify(requestList));
  body.innerHTML = "";
  console.log("page Refreshed");
  loadRequest();
}
document.querySelectorAll(".yes, .no").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (btn.classList.contains("yes")) {
      addContact(e.target.dataset.num);
    } else if (btn.classList.contains("no")) {
      removeReq(e.target.dataset.num);
    }
  });
});
