var Contact_key = localStorage.getItem("Current_Key")
console.log(Contact_key)
var name1 = document.getElementById("name")
var email = document.getElementById("email")
var password = document.getElementById("password")
var role = document.getElementById("role")
var btn = document.getElementsByTagName("button")
var uid = localStorage.getItem("Uid")
console.log(uid)


firebase.database().ref("User/").child(uid+"/").child("contact/").child(Contact_key).once("value",(snp)=>{
    console.log(snp.toJSON().Name)
    name1.value = snp.toJSON().Name
    email.value = snp.toJSON().Email
    password.value = snp.toJSON().Password
    role.value = snp.toJSON().Role
})

btn[0].addEventListener("click",async function(){
    event.preventDefault()
    var obj = {
        "Name": name1.value,
        "Email":email.value,
        "Password":password.value,
        "Role":role.value
    }
   await firebase.database().ref("User/").child(uid+"/").child("contact/").child(Contact_key).update(obj)
   window.location = "new.html"
})