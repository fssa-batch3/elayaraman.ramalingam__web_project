const mockUsers = JSON.parse(localStorage.getItem("userList")) || [
    {
        "id": "c31b942a-5d64-497f-a2fe-c83d0c6cbbfe",
        "username": "Elaya",
        "userph": "9344048138",
        "passwd": "1234",
        "userContacts": [
        ]
        },
        {
        "id": "b412092c-d6e6-4dd1-96d4-69a5e340c899",
        "username": "Luffy",
        "userph": "9344048136",
        "passwd": "1234",
        "userContacts": [
        ]
        },
        {
        "id": "37182ab7-b5b6-4e7f-8838-04cc59c5ea8f",
        "username": "SivaGopi",
        "userph": "1234567890",
        "passwd": "1234",
        "userContacts": []
        }
];
localStorage.setItem("userList", JSON.stringify(mockUsers));
const userList = JSON.parse(localStorage.getItem("userList")) || [];
console.log(userList);

function reg(e){
    e.preventDefault();
    console.log("Hello world!");

    const [username, userph, passwd, userpasswd] = [
        'username', 'userph', 'passwd', 'userpasswd'
        ].map(id => document.getElementById(id).value.trim());

    const regcheck = document.getElementById("regcheck").checked;

if (!username || !passwd || !userpasswd || !userph) return alert("Please fill out all the fields");

if (!/^[a-zA-Z0-9_-\s]{5,12}$/  .test(username)) return alert("Enter valid username");

if (!/^\d{10}$/.test(userph)) return alert("Enter valid Phone number");

if (passwd !== userpasswd) return alert("both passwords should match");



    if (userList.some(user => user.userph == userph)) return alert("This Phone number is already registered!");

    if (regcheck) {
        const user = {id: uuidv4(), username : username, userph : userph, passwd: userpasswd, userContacts : []};
        localStorage.setItem("userList", JSON.stringify([...userList, user]));
        document.querySelector("input").value = "";
        window.location.href = "./pages/login.html";
    } else {
        alert("Please Agree to our policies!");
    }
};

function login(e){
    e.preventDefault();

    const [ userph, userpasswd] = [
        'userph', 'userpasswd'
        ].map(id => document.getElementById(id).value.trim());
        const rememberMe = document.getElementById("rememberMe").checked;

    // const userList = JSON.parse(localStorage.getItem("userList")) || [];
    const user = userList.find(user => user.userph === userph && user.passwd === userpasswd);

    if (!user) {
        alert('Invalid phone number or password!');
        return;
    }
    localStorage.removeItem('currentUser');
    if (rememberMe) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        sessionStorage.setItem('tempuser', JSON.stringify(user));
    }
    else{
        sessionStorage.setItem('tempuser', JSON.stringify(user));
    }
    alert(`Welcome! ${user.username} 😊`);
    
    window.location.href = "./home.html";
}

