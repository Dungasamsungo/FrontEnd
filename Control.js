userList = [];
function saveUser() {
    //console.log("in the save function");
    id = document.getElementById("id").value;
    vname = document.getElementById("name").value;
    email = document.getElementById("email").value;
    url = `name=${vname}&email= ${email}`;

    if (vname.trim()== '') {
        alert('Error in the typed name. ');
        return
    }

    if (email.trim() == '') {
        alert('Error in the typed name. ');
        return;
    }

    const xhttp = new XMLHttpRequest();
    if (id == '') {
        xhttp.open("POST", "https://class209.herokuapp.com/demo/add?" + url);
    } else {
        xhttp.open("PUT", `https://class209.herokuapp.com/demo/update/${id}?${url}`);
    }

    xhttp.send();
    xhttp.onload = function () {
        msg = this.responseText;
        alert(msg);
        updateUser();
        if (msg.substring(0,2) == 'ok'){
            clearInput();
        }
    

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

    pageQty = userList.length / 5;
    if (pageQty % 5 > 0) {
        pageQty++;
    }
    pageQty = parseInt(pageQty);
    if (pageQty > 1) {
        previous = (pg == 0) ? 0 : pg - 1;
        Next = (pg == pageQty - 1) ? pageQty - 1 : pg + 1;
        pageTxt = `<li class="page-item" onclick='updatePage(${previous})'><a class="page-link" href="#"><</a></li>`;
        for (i = 1; i <= pageQty; i++) {
            pageTxt += `<li class="page-item`;
                   if(i-1 == pg){
                pageTxt += "active";
            }
            pageTxt += `<li onclick='updatepage(${i - 1})' ><a class ="page-link" href="#">${i}</a></li>`;
            
            
        }
        pageTxt += `<li class="page-item" onclick='updatePage(${Next})'><a class="page-link" href= "#">></a></li>`;
        
        document.getElementById("pageList").innerHTML = pageTxt;
    }


    text = "";
    pg = 5 * pg;
    for (i = pg; i <= pg + 4; i++) {
        u = userList[i];
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