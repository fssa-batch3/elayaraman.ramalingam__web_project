/* eslint-disable prettier/prettier */
const UserList = JSON.parse(localStorage.getItem("userList"));
const currentUser =
  JSON.parse(localStorage.getItem("currentUser")) ||
  JSON.parse(sessionStorage.getItem("tempuser"));

const user = UserList.find((userObj) => userObj.userph === currentUser.userph);

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const receiver = UserList.find((users) => users.userph === user.userph);

const user1 = UserList.find((userOneCheck) => userOneCheck.userph === user.userph);
const user2 = UserList.find((userTwoCheck) => userTwoCheck.userph === id);

const convoid = user1.userph + user2.userph;

const convo_list = JSON.parse(localStorage.getItem("convo_list")) || [];

const convo = convo_list.find((findConvo) => findConvo.id === convoid);

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
  document
    .querySelector("body")
    .insertAdjacentHTML("afterbegin", headerTemplate);
}

addHeader();

// for time stamp
function loadMessages() {
  // code to load messages
  const pickedConvo = convo_list.find((pickConvo) => pickConvo.id === convoid);
  if (pickedConvo && pickedConvo.messages && pickedConvo.messages.length > 0) {
    const messages = pickedConvo.messages.sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );
    const messageContainer = document.querySelector(".c-holder");
    let html = "";
    messages.forEach((message) => {
      const senderClass = message.sender === user1.userph ? "out" : "in";
      const delete_btn =
        message.sender === user1.userph
          ? `<div class="delete-btn"><button class="btn btn-danger text-white d-none" data-message-id="${message.id}" type="button" >delete</button></div>`
          : "";

      html += `
            <div id="message" >
            ${delete_btn}
                <div class="message ${senderClass}">

                <div class="msg">
                    <p>${message.message}</p>
                </div>
                <div class="time">
                    <span>${message.time}</span>
                </div>
                </div>
                </div>
            `;
    });
    messageContainer.innerHTML = html;
  }

  function deleteMsg(msgId) {
    console.log(id);
    const msgIndex = convo.messages.findIndex((msg) => msg.id === msgId);
    console.log(msgIndex);
    if (msgIndex > 0) {
      convo.messages.splice(msgIndex, 1);
    }
    localStorage.setItem("convo_list", JSON.stringify(convo_list));
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
}

window.addEventListener("load", loadMessages);

function Chat() {
  const currentConvo = convo_list.find((convos) => convos.id === convoid);
  if (!convo && user1.userph !== user2.userph) {
    const convoObj = {
      id: convoid,
      user1: user1.userph,
      user2: user2.userph,
      messages: [],
    };
    convo_list.push(convoObj);
    localStorage.setItem("convo_list", JSON.stringify(currentConvo));
  }
  return convo;
}

function appndmsg(e) {
  e.preventDefault();
  const convo = Chat();
  const message = document.getElementById("msg_val").value.trim();
  if (message) {
    if (!convo.messages) {
      convo.messages = [];
    }
    convo.messages.push({
      // eslint-disable-next-line no-undef
      id: uuidv4(),
      message,
      sender: user1.userph,
      receiver: user2.userph,
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      timestamp: new Date(),
    });
    document.getElementById("msg_val").value = "";
  }
  localStorage.setItem("convo_list", JSON.stringify(convo_list));

  loadMessages();
}

document.getElementById("btn-send").addEventListener("click", appndmsg);
