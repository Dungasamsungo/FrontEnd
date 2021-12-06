userList = [];
function saveUser() {
    //console.log("in the save function");
    id = document.getElementById("id").value;
    vname = document.getElementById("name").value;
    email = document.getElementById("email").value;
    url = `name=${vname}&email= ${email}`;

    const xhttp = new XMLHttpRequest();
    if (id == '') {
        xhttp.open("POST", "https://class209.herokuapp.com/demo/add?" + url);
    } else {
        xhttp.open("PUT", `https://class209.herokuapp.com/demo/update/${id}?${url}`);
    }

    xhttp.send();
    xhttp.onload = function () {
        alert(this.responseText);
        updateUser();
        clearInput();

    }

}


function clearInput() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
}


function updateUser() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://class209.herokuapp.com/demo/all");
    xhttp.send();
    xhttp.onload = function () {
        userList = JSON.parse(this.responseText);
        updatePage(0);

    }

}

function updatePage(pg) {

    pageQty = (userList.length) / 5;
    if (pageQty % 5 > 0) {
        pageQty++;
    }
    pageQty = parseInt(pageQty);
    if (pageQty > 1) {
        txtpage = `<li class="page-item" onclick='updatePage(0)' ><a class="page-link" href= "#">start</a></li>`
        for (i = 1; i <= pageQty; i++) {
            active = ""
            if(i-1 == pg){
                active = "active"
            }
            txtpage += `<li class="page-item ${active}" onclick='updatePage(${i - 1})'><a class="page-link" href= "#">${i}</a></li>`
            console.log(pageQty);
        }
        txtpage += `<li class="page-item" onclick='updatePage(${pageQty - 1})'><a class="page-link" href= "#">end</a></li>`
        
        document.getElementById("pageList").innerHTML = txtpage;
    }


    text = "";
    pg = 5 * pg;
    for (i = pg; i <= pg + 4; i++) {
        u = userList[i];
        // console.log(u); 
        if (u != undefined) {
            text += `<tr onclick='activateUser(${i})'><td>${u.id}</td><td>${u.name}</td><td>${u.email}</td></tr>`;
        }            
        
    }
    document.getElementById("tableBody").innerHTML = text;

}

function activateUser(i) {
    //console.log(userList[i]);
    u = userList[i];
    document.getElementById("id").value = u.id;
    document.getElementById("name").value = u.name;
    document.getElementById("email").value = u.email;

}

function deleteUser() {
    id = document.getElementById("id").value;
    if (id == '') {
        alert("Select a user!");
        return;
    }
    if (!confirm("Do you really want to delete this user?")) {
        return;
    }

    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "https://class209.herokuapp.com/demo/delete/" + id);
    xhttp.send();
    xhttp.onload = function () {
        alert(this.responseText);
        updateUser();
        clearInput();
    }
}