let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if(!currentUser){
    currentUser = JSON.parse(sessionStorage.getItem("tempuser"));
}

let UserList = JSON.parse(localStorage.getItem("userList"));

let id = currentUser.userph;

let user = UserList.find(user => user.userph == id);

let userContacts = user.userContacts;
console.log(userContacts);
let userHomeList = [];
const requestList = JSON.parse(localStorage.getItem('requestList'))||[];

//loop to get list of users without the current user

for(let i = 0; i<UserList.length;i++){
    if(currentUser.userph != UserList[i].userph){
        userHomeList.push(UserList[i]);
    }
}

let userSearchList = [];

    function loadList() {
        document.querySelector(".m-body").innerHTML = "";
        for (let i = 0; i < userHomeList.length; i++) {
            const contact = userHomeList[i];
            const check = requestList.some((req) => (
                req.sender === parseInt(contact.userph) && 
                req.receiver === parseInt(user.userph) || 
                req.sender === parseInt(user.userph) && 
                req.receiver === parseInt(contact.userph)
            ));
            if (!check) {
                const profileCard = `
                        <div class="profile-card">
                        <img src="../assets/images/profile/4.jpg" alt="" height="60px">
                        <div class="content">
                            <p>${contact.username}</p>
                            <div class="card-holder">
                            <button class="req" onclick="request(${contact.userph})">
                                Request
                            </button>
                            </div>
                        </div>
                        </div>
                        `;
                document.querySelector(".m-body").innerHTML += profileCard;
            }
        }
    }
    function request(id){
        let sender = parseInt(user.userph);
        const req_id = "" + sender + id;
        const request ={
            req_id: req_id,
            sender : sender,
            receiver : id,
            status : false,
            timestamp : Date.now()
        }
        requestList.push(request);
        localStorage.setItem("requestList", JSON.stringify(requestList));
        document.querySelector(".m-body").innerHTML = "";
        loadList();
    }

// function to load requests in request page

    function loadRequest() {
        const req_list = [];
        for (let i = 0; i < requestList.length; i++) {
            if(requestList[i].receiver == id){
                req_list.push(requestList[i]);
            }
        }
        const mBody = document.querySelector(".m-body");
        for (let i = 0; i < req_list.length; i++) {
            let req_id = "" + parseInt(req_list[i].sender);
            console.log(req_id);
            console.log(UserList);
            let req_sender = UserList.find(req => req.userph == req_id);
            const request = req_list[i];
            const userph = request.sender;
            if(req_sender){
                const profileCard = `
                <div class="profile-card">
                    <img src="../assets/images/profile/4.jpg" alt="" height="60px">
                    <div class="content">
                        <p>${req_sender.username}</p>
                        <div class="card-holder">
                            <button class="yes" onclick="addContact(${userph})">
                                <i class="fi fi-br-check"></i>
                            </button>
                            <button class="no" onclick="removeReq()">
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

    function addContact(i){
        console.log("working!");

        let req_sender = UserList.find(req => req.userph == i);

        console.log(req_sender)

        console.log(i);
        let contact = {
            id : i,
            status : true
        };
        let contact_1 = {
            id : user.userph,
            status : true
        }
        let userContacts = user.userContacts;
        let sender_contacts = req_sender.userContacts;
        userContacts.push(contact);
        sender_contacts.push(contact_1);
        requestList.splice(requestList.findIndex(req => req.sender === i && req.receiver === parseInt(user.userph)), 1);
        localStorage.setItem("requestList",JSON.stringify(requestList));
        
        localStorage.setItem("userList",JSON.stringify(UserList));
        loadRequest();
    }
    function removeReq(i){
        let userContacts = user.userContacts;
        userContacts = [];
        console.log(userContacts);
        localStorage.setItem("userList",JSON.stringify(UserList));
    }


function loadUser(){
    if(userContacts.length == 0){
        let str = document.createElement('p');
        str.textContent = "You have no contacts in your list to chat"
        document.querySelector(".m-body").appendChild(str);
    }
    for(let i=0;i<userContacts.length;i++ ){
        const profileCard = `
            <div class="profile-card">
                <img src="../assets/images/profile/4.jpg" alt="${userHomeList[i].username}" height="50px">
                <div class="content" onclick="window.location.href='./chat.html?id=${userHomeList[i].userph}'">
                    <p>${userHomeList[i].username}</p>
                    <span>${userHomeList[i].userph}</span>
                </div>
            </div>
        `;
        document.querySelector(".m-body").insertAdjacentHTML('beforeend', profileCard);
    }
}

