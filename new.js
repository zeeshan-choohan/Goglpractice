var email = document.getElementById("email")
var name1 = document.getElementById("name")
var password = document.getElementById("password")
var role = document.getElementById("role")
var btn = document.getElementById("btn")
var table = document.getElementsByTagName("table")

var data = localStorage.getItem("Uid")
// console.log(data)

firebase.database().ref(`User/${data}`).once("value",(data1)=>{    
    // console.log(data1.toJSON())
        
        var data = data1.toJSON()
    
        var email1 = data["Email"]
        // console.log(email1)
        email.innerText += `: ${email1}` 
    
        var name12 = data["Name"]
        // console.log(name12)
    
        name1.innerText += ` : ${name12} `
        var password1 = data["Password"]
        // console.log(password1)
        password.innerText +=   ` : ${password1}`
        var role1 = data["Role"]
        // console.log(role1)
        role.innerText +=` : ${role1}`
    });


//  firebase.database().ref(`User/`).once("value",(snp)=>{
// console.log(snp.toJSON())
// var  userdata = snp.toJSON()
// // console.log(userdata)
// var value = Object.values(userdata)
// console.log(value)
// value.map((v,i)=>{
//     console.log(v)
//     console.log(i)
//     table[0].innerHTML +=`
//     <tr >
//     <td>${i+1}</td>
//             <td>${v.Name}</td>
//             <td>${v.Email}</td>
//             <td>${v.Password}</td>
//             <td>${v.Role}</td>

//     </tr>`
// })
//     })

firebase.database().ref(`User/${data}/contact`).once("value",(snapshot)=>{
    // console.log(snapshot.toJSON())
    var udata = snapshot.toJSON()
    // console.log(udata)
   if(udata !=null){
    var value = Object.values(udata)
    value.map((v,i)=>{
        // console.log(v)
        // console.log(i)
        table[0].innerHTML += `<tr>
        <td>${i+1}</td>
        <td>${v.Name}</td>
        <td>${v.Email}</td>
        <td>${v.Password}</td>
        <td>${v.Role}</td>
        <td><button id = '${v.Contact_key}' onclick = "edit(this)">Edit</button>
        <button id = '${v.Contact_key}' onclick = "del(this)">Del</button>
        </td>

        </tr>`
    })
   }
else{
    table[0].innerHTML = "<h2>No data </h2>"
}
})

function edit(e){
     console.log(e.id)
     localStorage.setItem("Current_Key",e.id)
     window.location.href="edit_contact.html"
}

function del(de){
    var uid = localStorage.getItem("Uid")
firebase.database().ref("User/").child(uid+"/").child("contact/").child(de.id).remove()
window.location.reload();
}

btn.addEventListener("click",function(){
    window.location.href="add_contact.html"
})