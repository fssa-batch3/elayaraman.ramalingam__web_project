const currentUser = JSON.parse(localStorage.getItem("currentUser")) || JSON.parse(sessionStorage.getItem("tempuser"));

const UserList = JSON.parse(localStorage.getItem("userList"));

const user = UserList.find((user) => user.userph === currentUser.userph);

const requestList = JSON.parse(localStorage.getItem("requestList")) || [];

// loop to get list of users without the current user
const userHomeList = UserList.filter((x) => !contact_list.includes(x.userph) && x.userph !== user.userph);

// create req-list

const reqList = requestList.filter( (request) => request.receiver === user.userph);

// function to load requests in request page
function loadRequest() {
  const mBody = document.querySelector(".m-body");

  reqList.forEach((request) => {
    const sender = UserList.find( req => req.userph === user.userph);

    const profileCard = `
    <div class="profile-card">
    <img src="../assets/images/profile/4.jpg" alt="" height="60px" onclick="window.location.href='./details.html?id=${req_sender.userph}'">
        <div class="content">
            <p>${req_sender.username}</p>
            <div class="card-holder">
                <button class="yes" onclick="addContact(${userph})">
                    <i class="fi fi-br-check"></i>
                </button>
                <button class="no" onclick="removeReq(${userph})">
                    <i class="fi fi-br-cross"></i>
                </button>
            </div>
        </div>
    </div>
`;
mBody.innerHTML += profileCard;
  })
  for (let i = 0; i < req_list.length; i++) {
    const req_id = `${parseInt(req_list[i].sender)}`;
    const req_sender = UserList.find((req) => req.userph === req_id);
    const request = req_list[i];
    const userph = request.sender;
    if (req_sender) {
      const profileCard = `
                <div class="profile-card">
                <img src="../assets/images/profile/4.jpg" alt="" height="60px" onclick="window.location.href='./details.html?id=${req_sender.userph}'">
                    <div class="content">
                        <p>${req_sender.username}</p>
                        <div class="card-holder">
                            <button class="yes" onclick="addContact(${userph})">
                                <i class="fi fi-br-check"></i>
                            </button>
                            <button class="no" onclick="removeReq(${userph})">
                                <i class="fi fi-br-cross"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
      mBody.innerHTML += profileCard;
    }
  }
}

function addContact(num) {
  const req_sender = UserList.find((req) => req.userph === num);
  console.log(num);
  const contact = {
    id: num,
    status: true,
  };
  const contact_1 = {
    id: user.userph,
    status: true,
  };
  const { userContacts } = user;
  const sender_contacts = req_sender.userContacts;
  userContacts.push(contact);
  sender_contacts.push(contact_1);
  requestList.splice(
    requestList.findIndex(
      (req) => req.sender === num && req.receiver === parseInt(user.userph)
    ),
    1
  );
  localStorage.setItem("requestList", JSON.stringify(requestList));
  localStorage.setItem("userList", JSON.stringify(UserList));
  document.querySelector(".m-body").innerHTML = "";
  loadRequest();
}
function removeReq(num) {
  requestList.splice(
    requestList.findIndex(
      (req) => req.sender === num && req.receiver === parseInt(user.userph)
    ),
    1
  );

  localStorage.setItem("requestList", JSON.stringify(requestList));
  document.querySelector(".m-body").innerHTML = "";
  loadRequest();
}
