function findObj(x, y){
    for (i=0;i< y.length;i++){
        if(x === y[i]);
        return y[i];
    }
}

function showDetails(){

    const userId = JSON.parse(localStorage.getItem("currentUser"));
    const userList = JSON.parse(localStorage.getItem("users"));

    document.getElementById("username").value = userId["username"];
    document.getElementById("tel").value = userId["tel"];

    console.log(findObj(userId.username,userList));
    }

      
