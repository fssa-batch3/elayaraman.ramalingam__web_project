let currentUser = JSON.parse(sessionStorage.getItem("tempuser"));
if(!currentUser){
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
}
let UserList = JSON.parse(localStorage.getItem("userList"));
let id = currentUser.userph;
let user = UserList.find(user => user.userph == id);
let userContacts = user.userContacts;
let userHomeList = [];
const requestList = JSON.parse(localStorage.getItem('requestList'))||[];

for(let i = 0; i<UserList.length;i++){
    if(currentUser.userph != UserList[i].userph){
        userHomeList.push(UserList[i]);
    }
}

function loadList(){
        for (let i = 0; i < userHomeList.length; i++) {
            const user = userHomeList[i];
            let check_id = parseInt(currentUser.userph) + parseInt(user.userph);
            if(!requestList.some((requestList) => requestList.req_id === check_id)){
                const profileCard = `
                <div class="profile-card">
                <img src="../assets/images/profile/4.jpg" alt="" height="60px">
                <div class="content">
                    <p>${user.username}</p>
                    <div class="card-holder">
                    <button class="req" onclick="request(${user.userph})">
                        Request
                    </button>
                    </div>
                </div>
                </div>
                `;
                document.querySelector(".m-body").innerHTML += profileCard;
            }
        }
        };
    function request(id){
        let sender = currentUser.userph;
        const req_id = parseInt(sender) + parseInt(id);
        const request ={
            req_id: req_id,
            sender : sender,
            receiver : id,
            status : false,
            timestamp : Date.now()
        }
        if (!requestList.some((req) => req.req_id === req_id)) {
            requestList.push(request);
            localStorage.setItem("requestList", JSON.stringify(requestList));
            document.querySelector(".m-body").innerHTML = "";
            loadList();
    }}

    function loadRequest() {
        const requestList = JSON.parse(localStorage.getItem("requestList"));
        const id = parseInt(currentUser.userph);
        const req_list = [];
        for (let i = 0; i < requestList.length; i++) {
            if(requestList[i].receiver == id){
                req_list.push(requestList[i]);
            }
        }
        const requestPage = document.querySelector(".request-page");
        const mBody = document.querySelector(".m-body");
        for (let i = 0; i < req_list.length; i++) {
            let req_id = parseInt(req_list[i].sender);
            let req_sender = UserList.find(req => req.userph == req_id);
            console.log(req_sender);
            const request = req_list[i];
            const profileCard = `
                <div class="profile-card">
                    <img src="../assets/images/profile/4.jpg" alt="" height="60px">
                    <div class="content">
                        <p>${req_sender.username}</p>
                        <div class="card-holder">
                            <button class="yes">
                                <i class="fi fi-br-check"></i>
                            </button>
                            <button class="no">
                                <i class="fi fi-br-cross"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            mBody.innerHTML += profileCard;
        }
    }
    

function loadUser(){
    console.log(userHomeList);
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

