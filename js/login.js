// Modal-login - accordion
const collapseHeader = document.querySelectorAll(".collapse-header");

collapseHeader.forEach((header,index) => {

  header.addEventListener("click", e =>{
    header.classList.toggle("active");

    const collapseBody = header.nextElementSibling;
    if (collapseBody.style.maxHeight) {
      collapseBody.style.maxHeight = null;
    } else {
      collapseBody.style.maxHeight = collapseBody.scrollHeight + "px";
    }

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

// close modal
// When the user clicks the button
const modal = document.querySelector('#modal-login');
const iconLogin = document.querySelector('.login');
iconLogin.onclick = () => {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
const closeModal = document.querySelector('.close-modal');
closeModal.onclick = () => {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}


// regular expression form
const inputs = document.querySelectorAll(".collapse-body input");
const newAccountForm = document.querySelector('.new-account');
const regexPsw = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/ ;

const validate = (field, regex) => {
  console.log(regex.test(field.value));
}

newAccountForm.addEventListener('keyup', e => {
  console.log(e);
  console.log(e.target);
  console.log(e.target.attributes.name.value);
  validate(e.target, regexPsw);

});