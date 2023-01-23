const profile_list = [
    {
        "profile_path" : "./profiles/profile 1.html",
        "profile_pic_path" : "../../assets/images/profile/1.jpg",
        "chat_path" : "./chat/1-1_chat 1.html",
        "profile_name" : "karthi"
    },
    {
        "profile_path" : "./profiles/profile 1.html",
        "profile_pic_path" : "../../assets/images/profile/2.jpg",
        "chat_path" : "./chat/1-1_chat 2.html",
        "profile_name" : "Sandy"
    },
    {
        "profile_path" : "./profiles/profile 1.html",
        "profile_pic_path" : "../../assets/images/profile/3.jpg",
        "chat_path" : "./chat/1-1_chat 3.html",
        "profile_name" : "Naomi"
    },
    {
        "profile_path" : "./profiles/profile 1.html",
        "profile_pic_path" : "../../assets/images/profile/4.jpg",
        "chat_path" : "./chat/1-1_chat 4.html",
        "profile_name" : "PKS"
    },
]

function fun(){

    for(const element of profile_list){
    let profile_card = document.createElement("div");
    profile_card.setAttribute("class","profile_card");
    console.log(profile_card);
    
    let open_profile = document.createElement("div");
    open_profile.setAttribute("class","open_profile");
    open_profile.setAttribute("onclick",`location.href='${element["profile_path"]}'`);
    profile_card.append(open_profile);
    
    let chat_profile = document.createElement("img");
    chat_profile.setAttribute("class","chat_profile");
    chat_profile.setAttribute("src",element["profile_pic_path"]);
    open_profile.append(chat_profile);
    
    let open_chat = document.createElement("div");
    open_chat.setAttribute("class","open_chat");
    open_chat.setAttribute("onclick",`location.href='${element["chat_path"]}'`)
    profile_card.append(open_chat);
    
    let profile_name = document.createElement("h1");
    profile_name.innerHTML = element["profile_name"];
    open_chat.append(profile_name);
    
    document.querySelector("div.holder").append(profile_card);
    }
    
}









