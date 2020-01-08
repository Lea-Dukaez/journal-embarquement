// const 
const modal = document.querySelector('#modal-login');
const modalContent = document.querySelector('.modal-content');
const closeModal = document.querySelector('.close-modal');
const iconsLogin = document.querySelectorAll('.login');
const iconsLogout = document.querySelectorAll('.log-out');
const accountsUser = document.querySelectorAll('.account');

const collapseHeader = document.querySelectorAll(".collapse-header");
const inputs = document.querySelectorAll(".collapse-body input");

const newAccountPsw = document.querySelector('.new-psw');
const btnSignup = document.getElementById("signupbtn");
const btnLogin = document.getElementById("loginbtn");
const forgetPsw = document.querySelector('.psw-forget');

const sideNavBurger = document.querySelector('.side-nav-burger');

// close - open modal :
// When the user clicks the button login => open modal
iconsLogin.forEach(icon => {
  icon.onclick = () => {
    modal.style.display = "block";
    sideNavBurger.style.display = "none";
  }
});

// When the user clicks on <span> (x) => close the modal
closeModal.onclick = () => {
  modal.style.display = "none";
  sideNavBurger.style.display = "inline-block";
  collapseHeader.forEach(header => {
    if(header.classList.contains("active")){
      header.classList.toggle("active");
      header.nextElementSibling.firstElementChild.reset()
      header.nextElementSibling.style.maxHeight = null;
    }
});
}

// When the user clicks anywhere outside of the modal => close it
window.onmousedown = (event) => {
  if ((event.target === modal)) {
    modal.style.display = "none";
    sideNavBurger.style.display = "inline-block";
    collapseHeader.forEach(header => {
      if(header.classList.contains("active")){
        header.classList.toggle("active");
        header.nextElementSibling.firstElementChild.reset()
        header.nextElementSibling.style.maxHeight = null;
      }
    });
  }
}

// Login / Sign In :
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

// Form sign in / sign up : 
// Snackbar welcome login msg
const showLoginMsg = (userName) => {
  // Get the snackbar DIV
  const snackbarLogin = document.getElementById("snackbarLogin");
  // Add the "show" class to DIV
  snackbarLogin.innerHTML = `Bienvenue ${userName} !`;
  snackbarLogin.classList.toggle("show");
  // After 3 seconds, remove the show class from DIV
  setTimeout(() => { 
    snackbarLogin.classList.toggle("show"); 
  }, 3000);
};

// Error Msg sign in / sign up
const errorMsg = (msg, form) => {
  // Add the "show" class to DIV
  form.innerHTML = `${msg}`;
  form.classList.toggle("showMsg");
  // After 3 seconds, remove the show class from span
  setTimeout(() => { 
    form.classList.toggle("showMsg"); 
  }, 3000);
};

// Sign Up form + authentification
btnSignup.addEventListener('click', () => {

  newUserName = document.querySelector("input[name='username']").value;
  newUserEmail = document.querySelector("input[name='newemail']").value;
  newUserPsw = document.querySelector("input[name='newpsw']").value;
  signupErrorMsg = document.querySelector("#signuperr");
  collapseBody = signupErrorMsg.parentNode.parentNode;

  const regexpsw = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/ ;
  if(regexpsw.test(newUserPsw)){
    auth.createUserWithEmailAndPassword(newUserEmail, newUserPsw)
      .then(cred => {
        const user = cred.user;
        // add / update user name
        user.updateProfile({ displayName: `${newUserName}`});
        // reset form and close modal
        btnSignup.parentNode.reset();
        btnSignup.parentNode.parentNode.style.maxHeight = null;
        modal.style.display = "none";
        sideNavBurger.style.display = "inline-block";
        // display userName + custom msg
        accountsUser.forEach(name => {
          name.innerHTML = newUserName;
        })
        showLoginMsg(newUserName);
        //create user in firestore database
        return db.collection('users').doc(user.uid).set({});
      })
      .catch(err => {
        console.log(err.message);
        if(err.code === "auth/email-already-in-use"){
          const errMsg = "Email déjà utilisé";
          errorMsg(errMsg, signupErrorMsg)
          collapseBody.style.maxHeight = collapseBody.scrollHeight + "px";
        } else if(err.code === "auth/invalid-email"){
          const errMsg = "Email invalide";
          errorMsg(errMsg, signupErrorMsg);
          collapseBody.style.maxHeight = collapseBody.scrollHeight + "px";
        }
      });
  } else {
    console.log('invalid password');
    const errMsg = "Le mot de passe doit contenir au moins 6 caractères dont un chiffre, une majuscule et une minuscule";
    errorMsg(errMsg, signupErrorMsg)
    collapseBody.style.maxHeight = collapseBody.scrollHeight + "px";
  }
});


// Sign in form + authentification
btnLogin.addEventListener('click',() => {

  userEmail = document.querySelector("input[name='email']").value;
  userPsw = document.querySelector("input[name='psw']").value;
  signinErrorMsg = document.querySelector("#signinerr");
  collapseBody = signinErrorMsg.parentNode.parentNode;

  auth.signInWithEmailAndPassword(userEmail,userPsw)
    .then( () => {
      // reset form and close modal
      btnLogin.parentNode.reset();
      btnLogin.parentNode.parentNode.style.maxHeight = null;
      modal.style.display = "none";
      sideNavBurger.style.display = "inline-block";
      console.log('user logged in');
    })
    .catch(err => {
      console.log(err.message);
      const errMsg = "Email ou mot de passe invalide";
      errorMsg(errMsg, signinErrorMsg);
      collapseBody.style.maxHeight = collapseBody.scrollHeight + "px";
    });
});

// Inputs => Trigger the click on submit Button on "Enter"
inputs.forEach(input => {
  input.addEventListener("keyup", e => {
    if(e.keyCode === 13){
      if(input.parentNode.id === 'signup-form'){
        btnSignup.click();
      } else if(input.parentNode.id === 'login-form'){
        btnLogin.click();
      }
    }
  });
});

// log out users
iconsLogout.forEach(icon => {
  icon.addEventListener("click", () => {
    auth.signOut();
  });
});

// Password forgotten / reset
// forgetPsw.addEventListener('click', () => {
//   console.log('hello');

// })
// var auth = firebase.auth();
// var emailAddress = "user@example.com";

// auth.sendPasswordResetEmail(emailAddress)
// .then(function() {
//   // Email sent.
// }).catch(function(error) {
//   // An error happened.
// });

// setup UI if login 
const setupUILogin = (firebaseUser) => {
  if(firebaseUser){
    // avoid over-writing of username by null when user created + login first time
    if(firebaseUser.displayName){
      const userName = firebaseUser.displayName;
      accountsUser.forEach(acc => {
        acc.innerHTML = userName;
      });
      showLoginMsg(userName);
    }
    accountsUser.forEach(acc => {
      acc.style.display = "inline-block";
    });
    // logout icon  visible when login
    iconsLogout.forEach(icon => {
      icon.style.display = "inline-block";
    });
    // login icon not visible when already login
    iconsLogin.forEach(icon => {
      icon.style.display = "none";
    });
  } else {
    // logout icon & account name not visible when not login
    iconsLogout.forEach(icon => {
      icon.style.display = "none";
    });
    accountsUser.forEach(acc => {
      acc.style.display = "none";
    });
    // login icon nt visible when not login
    iconsLogin.forEach(icon => {
      icon.style.display = "block";
    });
    console.log("not logged in");
  }
}

// set up the color of LIKES for the login user
const setupUILikes = (firebaseUser) => {
  if(firebaseUser){
    const userLogin = firebaseUser.uid;
    const videosLikedRef = db.collection('users').doc(userLogin).collection('videosliked');
    videosLikedRef.where("liked", "==", true).get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              const videoHTML = document.getElementById(doc.id);
              const heartIcon = videoHTML.children[2].firstElementChild;
              fullHeart(heartIcon);
          });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
  } else {
    const hearts = document.querySelectorAll(".fa-heart");
    hearts.forEach(heart => {
      emptyHeart(heart);
    })
  }
};

// Add a realtime listener
auth.onAuthStateChanged(firebaseUser => {
  setupUILogin(firebaseUser);
  setupUILikes(firebaseUser);
});
