let UserList = JSON.parse(localStorage.getItem("userList"));
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let userid = currentUser.userph;

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const user = UserList.find(UserList => UserList.userph === id);


const headerTemplate = `
    <header class="c-head navbar">
        <div class="container-sm">
            <div>
                <i class="fi fi-br-angle-small-left"></i>
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
    const body = document.querySelector('body');
    body.insertAdjacentHTML('afterbegin', headerTemplate);
    }

// script for uuid
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/uuid@9.0.0/dist/index.min.js';
script.async = true;
document.head.appendChild(script);


let message_list = JSON.parse(localStorage.getItem("message_list"));
if(!message_list){
    message_list = []
}

function Chat(){

    let UserList = JSON.parse(localStorage.getItem("userList"));
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let userid = currentUser.userph;

    const user1 = UserList.find(UserList => UserList.userph === userid);
    const user2 = UserList.find(UserList => UserList.userph === id);

    const convoid = parseInt(user1.userph) + parseInt(user2.userph);

    const convo = {
        convoid: convoid,
        user1: user1.userph,
        user2: user2.userph
    };

    console.log(convo);
    message_list.push(convo);

    // localStorage.setItem('message_list', JSON.stringify(message_list));

    console.log(user2);
    console.log(user1);
    }

function appndmsg(e){
    console.log("appndmsg");
    e.preventDefault();

}