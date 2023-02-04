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



gsign.addEventListener("click",async function(){
  event.preventDefault()
  var provider = new firebase.auth.GoogleAuthProvider();
  await firebase.auth()
  .signInWithPopup(provider)
  .then((res) => {
    // console.log(res.user.displayName)
    // console.log(res.user.email)
    // console.log(res)
    var user = res.user
    var obj = {
      Name : user.displayName,
      email : user.email,
      uid : user.uid
    }
    // console.log(obj)

    firebase.database().ref("User/").child(user.uid).once("value", function(snp){
      console.log(snp.toJSON)
      if(snp.toJSON == null){
        firebase.database().ref("User/").child(user.uid).set(obj) 
      }
      else{
        console.log("Pehlay se ha")
      }
    })



})
.catch((err)=>{
  console.log(err.message)
})
})