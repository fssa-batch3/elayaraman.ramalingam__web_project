
console.log("hai");

let message_list = JSON.parse(localStorage.getItem("message_list"));
    if(!message_list){
        message_list = []
    }

    console.log(message_list);

    for (let msg_list of message_list){
    let msg_card = document.createElement("div");
    msg_card.setAttribute("class","chat_right");

    let msg_content = document.createElement("div");
    msg_content.setAttribute("class","right message");
    msg_card.append(msg_content);

    let msg_str = document.createElement("p");
    msg_str.innerHTML = msg_list.message;
    msg_content.append(msg_str);

    let msg_time = document.createElement("span");
    msg_time.innerHTML = msg_list.msg_time;
    msg_content.append(msg_time);

    document.querySelector("div.chat").append(msg_card);
}

let chat_bar = document.querySelector(".chat_bar");

chat_bar.addEventListener("submit", function(m){

    m.preventDefault;

    const message_input = document.getElementById("message_input").value.trim();

    if(message_input){

    const message_time = new Date();
    const hours = message_time.getHours() > 12 ? message_time.getHours() - 12 : message_time.getHours();
    const minutes = message_time.getMinutes() < 10 ? '0' + message_time.getMinutes() : message_time.getMinutes();
    const ampm = message_time.getHours() >= 12 ? 'PM' : 'AM';
    const time = hours + ':' + minutes + ' ' + ampm;

    const message = {
        id: Date.now(),
        message:message_input,
        msg_time:time
    };

    message_list.push(message);

    localStorage.setItem("message_list",JSON.stringify(message_list));
        
    }

    });