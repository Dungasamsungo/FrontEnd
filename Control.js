
 userList = [];
 function saveUser(){
     console.log("in the save function");
     id = document.getElementById("id").value;
     name = document.getElementById("name").value;
     email = document.getElementById("email").value;
     url= `name=${name}&email= ${email}`;

     const xhttp = new XMLHttpRequest();
     if (id ==''){
         xhttp.open("POST", "https://class209.herokuapp.com/demo/add?" + url);
     }else{
         xhttp.open("PUT", `https://class209.herokuapp.com/demo/update/${id}?${url}`);
     }
    
     xhttp.send(); 
     xhttp.onload = function (){
         alert(this.responseText);
         updateUser();
         clearInput();

     }
     
 }

 
 function clearInput(){
     document.getElementById("id").value = "";
     document.getElementById("name").value ="";
     document.getElementById("email").value ="";
 }


 function updateUser(){
     const xhttp = new XMLHttpRequest();
     xhttp.open("GET", "https://class209.herokuapp.com/demo/all");
     xhttp.send(); 
     xhttp.onload = function (){
         userList = JSON.parse (this.responseText);
         text = "";
         for(i in userList){
             u = userList[i];
             // console.log(u); 
             text += `<tr onclick='activateUser(${i})'><td>${u.id}</td><td>${u.name}</td><td>${u.email}</td></tr>`;
         } 
        document.getElementById("tableBody").innerHTML = text;
     }
    
 }  

 function activateUser(i){
     //console.log(userList[i]);
     u = userList[i];
     document.getElementById("id").value = u.id;
     document.getElementById("name").value = u.name;
     document.getElementById("email").value = u.email;

 }

 function deleteUser(){
     id = document.getElementById("id").value;
     if (id == ''){
         alert ("Select a user!");
         return;
     }
     if (!confirm("Do you really want to delete this user?")){
         return;
     }

 const xhttp = new XMLHttpRequest();
 xhttp.open("DELETE", "https://class209.herokuapp.com/demo/delete/" + id);
 xhttp.send();
 xhttp.onload = function (){
     alert(this.responseText);
     updateUser();
     clearInput();
 }
 }