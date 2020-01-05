// db.collection("videos").add({
//   title: "Le Supermarche",
//   intro: "Nos débuts à la recherche de supermarchés !",
//   date: new Date,
//   url: "https://www.youtube.com/embed/Ih4u6EFdq2I"
// })
// .then(function(docRef) {
//   console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
//   console.error("Error adding document: ", error);
// });


const videosContainer = document.querySelector(".videos-container");
const hearts = document.querySelectorAll(".fa-heart");

// event Listener on LIKES & COMMENTS
videosContainer.addEventListener('click', e => {

  console.log(e);
  console.log(e.target);
  console.log(e.target.parentNode.parentNode.id);
  console.log(e.target.parentNode.nextElementSibling);


  // LIKES 
  if(e.target.className === "icon fas fa-heart"){
    e.target.style.setProperty('font-weight', '900', 'important');
    e.target.style.color = "rgba(248, 194, 145,0.6)";
    e.target.parentNode.nextElementSibling.style.display = "block";
  }

});


// affichage videos
const showVideo = (title, intro, url, videoId) => {
  const html = `
    <div class="video" id="${videoId}"">
      <div class="video-content">
        <h2>${title}</h2>
        <p>${intro}</p>
      </div>
      <div class="iframe-container">
        <iframe src="${url}" class="youtube"></iframe>
      </div>
      <div class="icons">
        <span class="icon fas fa-heart"></span>
        <span class="icon fas fa-comment"></span>
      </div>
      <div class="dbinfo">
        <p class="likes"><span>1</span> J'aime</p>
      </div>
    </div>
    `;

  videosContainer.innerHTML += html;
};

db.collection("videos").onSnapshot((docs) => {
  docs.forEach((doc) => {
    const data = doc.data();
    showVideo(data.title, data.intro, data.url, doc.id)
  });
})