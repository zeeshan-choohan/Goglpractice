// console.log(firebase.app())
var email = document.getElementById("email")
var password = document.getElementById("password")
var signup = document.getElementById("signup")
var signin = document.getElementById("signin")
var gsign = document.getElementById("gsign")

signup.addEventListener("click",async function(){
   await firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
      console.log(email.value)
      console.log(password.value)
     console.log(userCredential.user.uid) 
     alert("ho gaya")

     var obj = {
        Email:email.value,
        Password:password.value,
        Name:"Saylani",
        Role:"User",
        uid:userCredential.user.uid
     }
     firebase.database().ref("User/").child(userCredential.user.uid).set(obj)
      
    })
    .catch((error) => {
      console.log(error.code)
      console.log(error.message)
      alert("nhi huwa")
    });
})

signin.addEventListener("click",function(){
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
  .then((user) => {
    console.log(user.user.uid)
    alert("sign in ho gaya")
    localStorage.setItem("Uid",user.user.uid)
    window.location = "new.html"
  })
  .catch((error) => {
    console.log(error.code)
    console.log(error.message)
    alert("Nhi huwa")
  });
})



gsign.addEventListener("click",function(){
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    console.log(result)
})
.catch((err)=>{
  console.log(err.message)
})
})