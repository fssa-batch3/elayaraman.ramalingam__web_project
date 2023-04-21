
// **declarations**


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


//loop to get list of users without the current user and contacts

let contact_list = []

for(let i=0;i<user.userContacts.length;i++){
    contact_list.push(user.userContacts[i].id)
}

for(let i = 0; i<UserList.length;i++){
        if(id != UserList[i].userph && !UserList[i].userph.includes(contact_list)){
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

            let status = !check ? "request":"can_request";
            let btn_text = !check ? "Request":"Cancel";

            // if (!check) {
                const profileCard = `
                        <div class="profile-card">
                        <img src="../assets/images/profile/4.jpg" alt="" height="60px">
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
            // }
            // else {
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
    function can_request(id){
        requestList.splice(requestList.findIndex(req => req.sender == id && req.receiver == user.userph),1)
        localStorage.setItem("requestList", JSON.stringify(requestList));
        document.querySelector(".m-body").innerHTML = "";
        loadList();
    }

