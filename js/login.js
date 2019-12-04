// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDaV1_deg05sDQgZRwqIuKRsLICW7ptf5E",
  authDomain: "taiwan-blog-e2ac1.firebaseapp.com",
  databaseURL: "https://taiwan-blog-e2ac1.firebaseio.com",
  projectId: "taiwan-blog-e2ac1",
  storageBucket: "taiwan-blog-e2ac1.appspot.com",
  messagingSenderId: "254095991684",
  appId: "1:254095991684:web:376224c1ecaec75d6133d1",
  measurementId: "G-VGCLK8X0DF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth = firebase.auth();



// const 
const modal = document.querySelector('#modal-login');
const closeModal = document.querySelector('.close-modal');
const iconsLogin = document.querySelectorAll('.login');
const iconsLogout = document.querySelectorAll('.log-out');
const accountsUser = document.querySelectorAll('.account');

const collapseHeader = document.querySelectorAll(".collapse-header");
const inputs = document.querySelectorAll(".collapse-body input");

const newAccountPsw = document.querySelector('.new-psw');
const btnSignup = document.getElementById("signupbtn");
const btnLogin = document.getElementById("loginbtn");

const sideNavBurger = document.querySelector('.side-nav-burger');


// close - open modal
// When the user clicks the button
iconsLogin.forEach(icon => {
  icon.onclick = () => {
    modal.style.display = "block";
    sideNavBurger.style.display = "none";
  }
});

// When the user clicks on <span> (x), close the modal
closeModal.onclick = () => {
  modal.style.display = "none";
  sideNavBurger.style.display = "inline-block";
  newAccountPsw.style.borderColor = "initial";
  collapseHeader.forEach(header => {
    if(header.classList.contains("active")){
      header.classList.toggle("active");
      header.nextElementSibling.firstElementChild.reset()
      header.nextElementSibling.style.maxHeight = null;
    }
});
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    sideNavBurger.style.display = "inline-block";
    newAccountPsw.style.borderColor = "initial";
    collapseHeader.forEach(header => {
      if(header.classList.contains("active")){
        header.classList.toggle("active");
        header.nextElementSibling.firstElementChild.reset()
        header.nextElementSibling.style.maxHeight = null;
      }
    });
  }
}

// Modal-login - accordion
collapseHeader.forEach((header,index) => {

  header.addEventListener("click", e =>{
    header.classList.toggle("active");
    const collapseBody = header.nextElementSibling;
    collapseBody.firstElementChild.reset();

    // close open form on click
    if (collapseBody.style.maxHeight) {
      collapseBody.style.maxHeight = null;
    } else {
      collapseBody.style.maxHeight = collapseBody.scrollHeight + "px";
    }

    // close one form when the other one is open
    if(!index){
      collapseHeader[index+1].classList.toggle("active");
      const collapseBodyOne = collapseHeader[index+1].nextElementSibling;
      collapseBodyOne.style.maxHeight = null;
    } else {
      collapseHeader[index-1].classList.toggle("active");
      const collapseBodyTwo = collapseHeader[index-1].nextElementSibling;
      collapseBodyTwo.style.maxHeight = null;
    }
  });
});



// Form sign in / sign up
// Sign Up
btnSignup.addEventListener('click', () => {
  newUserEmail = document.querySelector("input[name='newemail']").value;
  newUserPsw = document.querySelector("input[name='newpsw']").value;

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/ ;
  if(regex.test(newUserPsw)){
    auth.createUserWithEmailAndPassword(newUserEmail, newUserPsw)
      .then(() => {
        newAccountPsw.style.borderColor = "initial";
        btnSignup.parentNode.reset();
        btnSignup.parentNode.parentNode.style.maxHeight = null;
        modal.style.display = "none";
        sideNavBurger.style.display = "inline-block";
        console.log('user created')
      })
      .catch(err => console.log(err.message));
  } else {
    console.log('invalid password')
    newAccountPsw.style.borderColor = "red"; 
  }


});


// Sign In
btnLogin.addEventListener('click',() => {

  userEmail = document.querySelector("input[name='email']").value;
  userPsw = document.querySelector("input[name='psw']").value;
  errorMsg = document.querySelector(".error");

  auth.signInWithEmailAndPassword(userEmail,userPsw)
    .then( () => {
      btnLogin.parentNode.reset();
      btnLogin.parentNode.parentNode.style.maxHeight = null;
      modal.style.display = "none";
      sideNavBurger.style.display = "inline-block";
      errorMsg.style.display = "none";
      console.log('user logged in');
    })
    .catch(err => {
      console.log(err.message);
      errorMsg.style.display = "block";
    });
});

// log out users
iconsLogout.forEach(icon => {
  icon.addEventListener("click", () => {
    auth.signOut();
  });
});


// Add a realtime listener
auth.onAuthStateChanged(firebaseUser => {
  if(firebaseUser){
    iconsLogout.forEach(icon => {
      icon.style.display = "inline-block";
    });
    accountsUser.forEach(acc => {
      acc.style.display = "inline-block";
    });
    iconsLogin.forEach(icon => {
      icon.style.display = "none";
    });
    console.log(firebaseUser);
  }else{
    iconsLogout.forEach(icon => {
      icon.style.display = "none";
    });
    accountsUser.forEach(acc => {
      acc.style.display = "none";
    });
    iconsLogin.forEach(icon => {
      icon.style.display = "block";
    });
    console.log("not logged in");
  }
});