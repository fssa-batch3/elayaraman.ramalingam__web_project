let currentUser = JSON.parse(sessionStorage.getItem("tempuser"));

if(!currentUser){
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
}
let UserList = JSON.parse(localStorage.getItem("userList"));

let index = 0;
for(let i = 0; i<UserList.length;i++){
    if(currentUser.userph == UserList[i].userph){
        index = i;
        break;
    }
}

const user = UserList[index];

function profile(){
    document.getElementById("username").value = user.username;
    document.getElementById("userph").value = user.userph;
}

function logout(){
    sessionStorage.clear();
    localStorage.removeItem("currentUser");

    window.location.href="./login.html";
}
function deleteUser(){

    UserList.splice(index, 1);
    localStorage.setItem("userList", JSON.stringify(UserList));

    sessionStorage.clear();
    localStorage.removeItem("currentUser");

    window.location.href="../index.html";
}

function submit(){

    let username = document.getElementById("username").value.trim();
    if (!username ) return alert("Enter valid username")
    currentUser.username = username;
    UserList[index].username = username;

    let passwd = prompt("Enter your password");
    if(passwd === currentUser.passwd){
        localStorage.setItem( "currentUser" ,JSON.stringify(currentUser));
        sessionStorage.setItem("tempuser",JSON.stringify(currentUser));
        localStorage.setItem( "userList" ,JSON.stringify(UserList));

        window.location.href="/profile.html";
    }
    else{
        alert("Password is incorrect");
        return;
    }

}

