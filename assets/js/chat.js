let msg_card = document.createElement("div");
msg_card.setAttribute("class","chat_right");

let msg_content = document.createElement("div");
msg_content.setAttribute("class","right message");
msg_card.append(msg_content);

let msg_str = document.createElement("p");
msg_str.innerHTML = message_list[0].message;
msg_content.append(msg_str);

let msg_time = document.createElement("span");
msg_time.innerHTML = message_list[0].msg_time;
msg_content.append(msg_time);

document.querySelector("div.chat").append(msg_card);

message_input.value ="";