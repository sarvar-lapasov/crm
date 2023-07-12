let docTitle = document.title;
window.addEventListener("blur", () => {
    document.title = "Come back ;(";
});
window.addEventListener("focus", () => {
    document.title = docTitle;
});
// variable
let closeBtn = document.querySelector(".close-sidebar");
let main = document.querySelector(".main");
let userList = document.querySelector(".card-bottom");
let removeBtn = document.querySelectorAll(".deleteBtn");

// eventListener
loadEventListeners();

function loadEventListeners() {
    closeBtn.addEventListener("click", closeSidebar);
    main.addEventListener("click", addUser);
    userList.addEventListener("click", removeUser);

    document.addEventListener("DOMContentLoaded", getFromLocalStorage);
}

// functions
function closeSidebar() {
    let parent = closeBtn.parentElement;
    let children = parent.querySelectorAll(".remove-element");
    let profile = parent.querySelector(".profile");
    if (!parent.classList.contains("active")) {
        closeBtn.firstElementChild.classList.add("activeBtn");
        parent.classList.add("active");
        profile.style.marginLeft = "12px";
        if (children.length > 0) {
            for (let i = 0; i < children.length; i++) {
                children[i].style.display = "none";
            }
        }
    } else {
        closeBtn.firstElementChild.classList.remove("activeBtn");
        parent.classList.remove("active");
        profile.style.marginLeft = "24px";
        if (children.length > 0) {
            for (let i = 0; i < children.length; i++) {
                children[i].style.display = "block";
            }
        }
    }
}

function addUser(e) {
    e.preventDefault();
    if (e.target.classList.contains("addBtn")) {
        const parent = e.target.parentElement.parentElement;
        const userNameInput = parent.querySelector("#exampleInputName1");
        const userEmailInput = parent.querySelector("#exampleInputEmail1");
        const userPasswordInput = parent.querySelector(
            "#exampleInputPassword1"
        );

        if (
            userNameInput.value.trim() === "" ||
            userEmailInput.value.trim() === "" ||
            userPasswordInput.value.trim() === ""
        ) {
            // Display error message or alert the user that input fields are required
            return;
        }

        const user = {
            id: (Math.random() + 1).toString(36).substring(2),
            userName: userNameInput.value,
            userEmail: userEmailInput.value,
            userPassword: userPasswordInput.value,
            userRecent: Math.ceil(Math.random() * 10),
        };
        addToUserList(user);
        setTimeout(() => {
            const modal = parent.parentElement.parentElement;
            modal.parentElement.firstElementChild.click();
        }, 300);
    }
}

function addToUserList(user) {
    const li = document.createElement("li");
    li.classList.add("card-item");
    li.innerHTML = `
         <div class="card-item__pro w-50" >
        		<img class="card-item__img" src="./img_src/profile.png" alt="" />
        		<p class="card-item__name w-50">
        			${user.userName}
        		</p>
        	</div>
        	<p class="card-item__email w-50 d-none d-lg-block ">
        		${user.userEmail}
        	</p>
        	<p class="card-item__parol w-50 d-none d-lg-block ">
        		${user.userPassword}</p>
        	<p class="card-item__s w-50">
        		${user.userRecent} minut oldin
        	</p>
        	<div class="card-item-btn">
            <a class="d-none" data-id="${user.id}"  href="#" ></a>
        		<button class="btn-btn editBtn"><svg class="btn-icon">
        				<use href="#edit" />
        			</svg></button>
        		<button class="btn-btn deleteBtn"><svg class="btn-icon">
        				<use class="delete-use" href="#delete" />
        			</svg></button>
        	</button>
        </div>
    `;

    userList.appendChild(li);
    document.querySelector("#exampleInputName1").value = "";
    document.querySelector("#exampleInputEmail1").value = "";
    document.querySelector("#exampleInputPassword1").value = "";

    saveIntoStorage(user);
}

function saveIntoStorage(user) {
    let users = getUserFromStorage();
    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));
}

function getUserFromStorage() {
    let users;
    if (localStorage.getItem("users") === null) {
        users = [];
    } else {
        users = JSON.parse(localStorage.getItem("users"));
    }
    return users;
}

function removeUser(e) {
    let user, userId;
    if (
        e.target.classList.contains("deleteBtn") ||
        e.target.classList.contains("delete-use")
    ) {
        e.target.closest(".card-item").remove();
        user = e.target.closest(".card-item");
        userId = user.querySelector("a").getAttribute("data-id");
    }
    console.log(userId);
    removeUserLocalStorage(userId);
}

function removeUserLocalStorage(id) {
    let users = getUserFromStorage();

    users.forEach((user, index) => {
        if (user.id === id) {
            users.splice(index, 1);
        }
    });
    localStorage.setItem("users", JSON.stringify(users));
}

function getFromLocalStorage() {
    let users = getUserFromStorage();

    users.forEach((user) => {
        const li = document.createElement("li");
        li.classList.add("card-item");
        li.innerHTML = `
         <div class="card-item__pro w-50" >
        		<img class="card-item__img" src="./img_src/profile.png" alt="" />
        		<p class="card-item__name w-50">
        			${user.userName}
        		</p>
        	</div>
        	<p class="card-item__email w-50 d-none d-lg-block ">
        		${user.userEmail}
        	</p>
        	<p class="card-item__parol w-50 d-none d-lg-block ">
        		${user.userPassword}</p>
        	<p class="card-item__s w-50">
        		${user.userRecent} minut oldin
        	</p>
        	<div class="card-item-btn">
            <a class="d-none" data-id="${user.id}"  href="#" ></a>
        		<button class="btn-btn editBtn"><svg class="btn-icon">
        				<use href="#edit" />
        			</svg></button>
        		<button class="btn-btn deleteBtn"><svg class="btn-icon">
        				<use class="delete-use" href="#delete" />
        			</svg></button>
        	</button>
        </div>
    `;

        userList.appendChild(li);
    });
}
