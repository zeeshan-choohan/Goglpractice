var name1 = document.getElementById("name")
var email = document.getElementById("email")
var password = document.getElementById("password")
var role = document.getElementById("role")
var btn = document.getElementsByTagName("button")
var user_data = localStorage.getItem("Uid")
console.log(user_data)

btn[0].addEventListener("click", async function(){
    event.preventDefault()
var key = firebase.database().ref(`User/${user_data}/`).child("contact").push().getKey()
 console.log(key)
 var obj = {
   "Name":name1.value,
   "Password": password.value,
   "Email": email.value,
    "Role" : role.value,
   "Contact_key":key
 }
 await firebase.database().ref(`User/${user_data}/`).child("contact/").child(key).set(obj);
 window.location = "new.html"
})