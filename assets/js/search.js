
// logged user
const currentUser =
  JSON.parse(sessionStorage.getItem("currentUser"));

  if (!currentUser) {
    body.innerHTML = "";
    alert("There is a problem in your login please login again");
    window.location.href = "./login.html";
  }
  

const UserList = JSON.parse(localStorage.getItem("userList"));
const user = UserList.find((userObj) => userObj.userph === currentUser.userph);

const requestList = JSON.parse(localStorage.getItem("requestList")) || [];

console.log(UserList)

// loop to get list of users without the current user and contacts

const contact_list = user.userContacts.map((contact) => contact.id);

const userHomeList = UserList.filter(
  (x) => !contact_list.includes(x.userph) && x.userph !== user.userph
);

console.log(userHomeList);
function loadList() {
  const body = document.querySelector(".m-body");
  body.innerHTML = "";
  userHomeList.forEach((contact) =>{
    const requestFromOthers = requestList.some(
      (req) => req.sender === contact.userph && req.receiver === user.userph
    );
    const requestByUser = requestList.some(
      (req) => req.sender === user.userph && req.receiver === contact.userph
    );

    if (!requestFromOthers) {
      const button = requestByUser
        ? `<button class="req" id="btnCan" data-phone="${contact.userph}" type="button">Cancel</button>`
        : `<button class="req" id="btnReq" data-phone="${contact.userph}" type="button">Request</button>`;

      const profileCard = `
      <div class="profile-card">
      <img src="../assets/images/profile/4.jpg" alt="" height="60px" onclick="window.location.href='./details.html?id=${contact.userph}'">
      <div class="content">
          <p>${contact.username}</p>
          <div class="card-holder">
          ${button}
          </div>
      </div>
      </div>
      `;
      body.innerHTML += profileCard;
    }
  })
  };


loadList();
function request(requestId) {
  const sender = user.userph;
  const req_id = (sender + requestId).toString();
  const requestObj = {
    req_id,
    sender,
    receiver: parseInt(requestId, 10),
    status: false,
    timestamp: Date.now(),
  };
  const reqCheck = requestList.some((req) => req.req_id === requestObj.req_id);
  if (!reqCheck) {
    requestList.push(requestObj);
    console.log("request created");
  }
  localStorage.setItem("requestList", JSON.stringify(requestList));
  loadList();
}

function cancelRequest(cancelId) {
  console.log("cancel button working");
  console.log(cancelId);
  const reqIndex = requestList.findIndex(
    (req) =>
      req.sender === user.userph && req.receiver === parseInt(cancelId, 10)
  );
  console.log(reqIndex);
  if (reqIndex !== -1) {
    requestList.splice(reqIndex, 1);
    console.log("request cancelled");
  }
  localStorage.setItem("requestList", JSON.stringify(requestList));
  loadList();
}

document.querySelectorAll(".req").forEach((button) => {
  button.addEventListener("click", function buttonSwitch() {
    const phoneNumber = this.getAttribute("data-phone");
    if (this.id === "btnReq") {
      request(phoneNumber);
    } else if (this.id === "btnCan") {
      cancelRequest(phoneNumber);
    }
  });
});
