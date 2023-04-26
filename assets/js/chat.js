    let UserList = JSON.parse(localStorage.getItem("userList"));
    console.log(UserList);
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let userid = currentUser.userph;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const user = UserList.find((UserList) => UserList.userph === id);

    const user1 = UserList.find((UserList) => UserList.userph === userid);
    const user2 = UserList.find((UserList) => UserList.userph === id);

    const convoid = parseInt(user1.userph) + parseInt(user2.userph);

    const convo_list = JSON.parse(localStorage.getItem("convo_list")) || [];

    const convo = convo_list.find((convo) => convo.id === convoid);

    const headerTemplate = `
        <header class="c-head navbar">
            <div class="container-sm">
                <div>
                    <button class="btn" onclick="window.history.back()">
                        <i class="fi fi-br-angle-small-left"></i>
                    </button>
                </div>
                <div class="c-header">
                    <img src="../assets/images/profile/4.jpg" alt="" height="50px">
                    <p>${user.username}</p>
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

    // for time stamp
    function loadMessages() {
    // code to load messages
    const convo = convo_list.find((convo) => convo.id === convoid);
    if (convo && convo.messages && convo.messages.length > 0) {
        const messages = convo.messages.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );
        const messageContainer = document.querySelector(".c-holder");
        let html = "";
        for (const message of messages) {
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
        }
        messageContainer.innerHTML = html;


    }


    document.querySelectorAll(".delete-btn .btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
        deleteMsg(e.target.dataset.messageId);
        });
    });

    document.querySelectorAll("#message").forEach(
        (message) => {
            message.addEventListener("dblclick", (e) => {
                const buttons = document.querySelectorAll(".delete-btn .btn");
                buttons.forEach((btn) => {
                    btn.classList.toggle("d-none");
                })
            })
        }

    );

    // document.querySelectorAll(".message").forEach((message) => {
    //     message.addEventListener("dblclick", (e) => {
    //       message.querySelectorAll(".delete-btn .btn").forEach((btn) => {
    //         btn.classList.remove("d-none");
    //       });
    //     });
    //   });
      


    }

    
    
    function deleteMsg(id) {


            console.log(id)

            const msgIndex = convo.messages.findIndex(msg => msg.id === id);

            console.log(msgIndex);

            if(msgIndex > 0) {
                convo.messages.splice(msgIndex, 1); 
            }

            localStorage.setItem("convo_list", JSON.stringify(convo_list));

            loadMessages();
        

    }



    function Chat() {
    let convo = convo_list.find((convo) => convo.id === convoid);
    if (!convo && user1.userph !== user2.userph) {
        convo = {
        id: convoid,
        user1: user1.userph,
        user2: user2.userph,
        messages: [],
        };
        convo_list.push(convo);
        localStorage.setItem("convo_list", JSON.stringify(convo_list));
    }
    return convo;
    }

    function appndmsg(e) {
    e.preventDefault();
    const convo = Chat();
    let message = document.getElementById("msg_val").value.trim();
    if (message) {
        if (!convo.messages) {
        convo.messages = [];
        }
        convo.messages.push({
        id: uuidv4(),
        message: message,
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
