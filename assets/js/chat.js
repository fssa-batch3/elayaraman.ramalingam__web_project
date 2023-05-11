/* eslint-disable prettier/prettier */
const UserList = JSON.parse(localStorage.getItem("userList"));
const currentUser =
  JSON.parse(localStorage.getItem("currentUser")) ||
  JSON.parse(sessionStorage.getItem("tempuser"));
const user = UserList.find((userObj) => userObj.userph === currentUser.userph);

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const receiverId = parseInt(id);

const receiver = UserList.find((users) => users.userph === receiverId);
const sender = user;

console.log(receiverId);
console.log(user.userph);

console.log(sender);
console.log(receiver);

const convoId = "" + sender.userph + receiverId;

console.log(convoId);

const convoList = JSON.parse(localStorage.getItem("convoList")) || [];

console.log(convoList);

const messageContainer = document.querySelector(".c-holder");

const headerTemplate = `
        <header class="c-head navbar navbar-fixed-top">
            <div class="container-sm">
                <div>
                    <button class="btn" onclick="window.history.back()">
                        <i class="fi fi-br-angle-small-left"></i>
                    </button>
                </div>
                <div class="c-header">
                    <img src="../assets/images/profile/4.jpg" alt="" height="50px">
                    <p>${receiver.username}</p>
                </div>
                <div>
                    <i class="fi fi-rr-menu-dots-vertical"></i>
                </div>
            </div>
        </header>
    `;

function addHeader() {
  document.querySelector("body").insertAdjacentHTML("afterbegin", headerTemplate);
}

addHeader();

const convo = chat();

function chat() {
  const currentConvo = convoList.find((convos) => convos.id === (""+user.userph + receiverId) || ("" + receiverId + user.userph));
  if (!currentConvo && sender.userph !== receiverId) {
    const convoObj = {
      id: convoId,
      user1: sender.userph,
      user2: receiverId,
      messages: [],
    };
    convoList.push(convoObj);
    localStorage.setItem("convoList", JSON.stringify(convoList));
  }
  return currentConvo;
}

// for time stamp
function loadMessages() {
  const messages = convo ? convo.messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)) : [];

  console.log(messages);

  let messageHTML = "";

  messages.forEach((message) => {
    const messageFromSender = message.sender === receiverId;

    const classForMessage = !messageFromSender ? "out" : "in";

    const deleteBtn = !messageFromSender
      ? `<div class="delete-btn"><button class="btn btn-danger text-white d-none" data-message-id="${message.id}" type="button">delete</button></div>`
      : "";

    messageHTML += `
            <div id="message">
            ${deleteBtn}
                <div class="message ${classForMessage}">
                <div class="msg">
                    <p>${message.message}</p>
                </div>
                <div class="time">
                    <span>${message.timeWithDate}</span>
                </div>
                </div>
                </div>
            `;
  });

  messageContainer.innerHTML = messageHTML;

  function deleteMsg(msgId) {
    const msgIndex = convo.messages.findIndex((msg) => msg.id === msgId);
    if (msgIndex > -1) {
      convo.messages.splice(msgIndex, 1);
    }
    localStorage.setItem("convoList", JSON.stringify(convoList));
    loadMessages();
  }

  document.querySelectorAll(".delete-btn .btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      deleteMsg(e.target.dataset.messageId);
    });
  });

  document.querySelectorAll("#message").forEach((message) => {
    message.addEventListener("dblclick", (e) => {
      e.preventDefault();
      const button = message.querySelector(".delete-btn .btn");
      button.classList.toggle("d-none");
    });
  });
  // document.querySelectorAll("#message").forEach((message) => {
  //   const button = message.querySelector(".delete-btn .btn");
  //   message.addEventListener("dblclick", (e) => {
  //     e.preventDefault();
  //     button.classList.add("d-none");
  //   });
  //   document.addEventListener("click", (e) => {
  //     if (!button) {
  //       button.classList.remove("d-none");
  //     }
  //   });
  // });

}

window.addEventListener("load", loadMessages);

function appndmsg(e) {
  e.preventDefault();
  const convo = chat();
  const message = document.getElementById("msg_val").value.trim();
  const currentDate = new Date();

  const timeWithDate = currentDate.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  if (message) {
    if (!convo.messages) {
      convo.messages = [];
    }
    convo.messages.push({
      id: uuidv4(),
      message,
      sender: sender.userph,
      receiver: receiverId,
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      timeWithDate : timeWithDate,
      timestamp: new Date(),
    });
    document.getElementById("msg_val").value = "";
  }
  localStorage.setItem("convoList", JSON.stringify(convoList));

  loadMessages();
}

document.getElementById("btn-send").addEventListener("click", appndmsg);
