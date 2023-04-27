const navbarTemplate = `
<nav class="m-nav">
            <div class="m-nav-items">
                <button class="" id="btn-search">
                    <i class="fi fi-rr-user-add"></i>
                </button>
            </div>
            <div class="m-nav-items">
                <button class="" id="btn-home">
                    <i class="fi fi-rr-envelope"></i>
                </button>
            </div>
            <div class="m-nav-items">
                <button class="" id="btn-req">
                    <i class="fi fi-rr-portrait"></i>
                </button>
            </div>
        </nav>`;

function addNavbar(){
    document.querySelector(".module")
        .insertAdjacentHTML('beforeend',navbarTemplate); 
}

addNavbar();

const byId = id => document.getElementById(id);

byId("btn-req").addEventListener("click", () => window.location.href = "./requests.html");
byId("btn-search").addEventListener("click", () => window.location.href = "./search.html");
byId("btn-home").addEventListener("click", () => window.location.href = "./home.html");
byId("btn-profile").addEventListener("click", () => window.location.href = "./profile.html");