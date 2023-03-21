function appndmsg(e){
    console.log("appndmsg");
    e.preventDefault();

    let message_list = JSON.parse(localStorage.getItem("message_list"));
    if(!message_list){
        message_list = []
    }
}