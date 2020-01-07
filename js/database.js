
const videosContainer = document.querySelector(".videos-container");
const hearts = document.querySelectorAll(".fa-heart");

// setup UI for LIKES / DISLIKES
const videoLiked = (target) => {
  target.style.setProperty('font-weight', '900', 'important');
  target.style.color = "rgba(248, 194, 145,0.6)";
  target.parentNode.nextElementSibling.style.display = "block";
}
const videoDisLiked = (target) => {
  target.style.setProperty('font-weight', '300', 'important');
  target.style.color = "rgb(51, 51, 51)";
  target.parentNode.nextElementSibling.style.display = "none";
}

// event Listener on LIKES
videosContainer.addEventListener('click', e => {
  const user = firebase.auth().currentUser;
  const videoID = e.target.parentNode.parentNode.id;

  if(e.target.className === "icon fas fa-heart"){
    const userRef = db.collection('users').doc(user.uid);
    userRef.get().then((doc) => {
      if (doc.exists) {
        if(doc.data()[videoID]){
          userRef.update({
            [videoID]: false
          }).then(() => {
            videoDisLiked(e.target);
            console.log('doc successfull updated ! And video changed from liked to disliked');
          }).catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
        } else {
          userRef.update({
            [videoID]: true
          }).then(() => {
            videoLiked(e.target);
            console.log('doc successfull updated ! And video changed from disliked to liked');
          }).catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
        }
      } else {
          // doc.data() will be undefined in this case
          console.log("NO existing user!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
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

db.collection("videos").onSnapshot(docs => {
  docs.forEach((doc) => {
    const data = doc.data();
    showVideo(data.title, data.intro, data.url, doc.id)
  });
}, err => console.log(err))