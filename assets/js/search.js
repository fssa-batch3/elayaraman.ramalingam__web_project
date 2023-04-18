
//declarations


// logged user 
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if(!currentUser){
    currentUser = JSON.parse(sessionStorage.getItem("tempuser"));
}

let UserList = JSON.parse(localStorage.getItem("userList"));
let id = currentUser.userph;
let user = UserList.find(user => user.userph == id);
let userHomeList = [];
const requestList = JSON.parse(localStorage.getItem('requestList'))||[];


//loop to get list of users without the current user

for(let i = 0; i<UserList.length;i++){

    console.log(UserList[i].userph);
        if(id != UserList[i].userph){
            userHomeList.push(UserList[i]);
        }
}

let userSearchList = [];

    function loadList() {
        document.querySelector(".m-body").innerHTML = "";
        for (let i = 0; i < userHomeList.length; i++) {
            const contact = userHomeList[i];
            const check = requestList.some((req) => (
                req.sender == contact.userph && 
                req.receiver == user.userph || 
                req.sender == user.userph && 
                req.receiver == contact.userph
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
        const req_id = (sender + id).toString();;
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

