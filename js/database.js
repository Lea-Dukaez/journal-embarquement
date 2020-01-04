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
      <a href="#" class="icon fas fa-heart"></a>
      <a href="#" class="icon fas fa-comment"></a>
    </div>
  </div>
  `;

  videosContainer.innerHTML += html;
};



db.collection("videos").onSnapshot((docs) => {
  docs.forEach((doc) => {
    const data = doc.data();
    showVideo(data.title, data.intro, data.url, data.id)
    console.log(data);
  });
})