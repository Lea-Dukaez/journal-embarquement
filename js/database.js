
const videosContainer = document.querySelector(".videos-container");

// setup UI for LIKES / DISLIKES
const fullHeart = (target) => {
  target.style.setProperty('font-weight', '900', 'important');
  target.style.color = "rgba(248, 194, 145,0.6)";
}
const emptyHeart = (target) => {
  target.style.setProperty('font-weight', '300', 'important');
  target.style.color = "rgb(51, 51, 51)";
}

// event Listener on LIKES
videosContainer.addEventListener('click', e => {
  const user = firebase.auth().currentUser;
  const videoID = e.target.parentNode.parentNode.id;
  //check if the click is on the icon Heart
  if(e.target.className === "icon fas fa-heart"){
    const videolikedRef = db.collection('users').doc(user.uid).collection('videosliked').doc(videoID);
    videolikedRef.get().then(doc => {
      if(doc.exists) {
        if(doc.data().liked){ 
          videolikedRef.update({
            liked: false
          }).then(() => {
            emptyHeart(e.target);
            console.log('doc successfull updated ! And video changed from liked to disliked');
          }).catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
        } else {
          videolikedRef.update({
            liked: true
          }).then(() => {
            fullHeart(e.target);
            console.log('doc successfull updated ! And video changed from disliked to liked');
          }).catch((error) => {
            console.error("Error updating document: ", error);
          });
        }
      } else {
        db.collection('users').doc(user.uid).collection('videosliked').doc(videoID).set({
          liked: true
        }).then(() => {
          fullHeart(e.target);
          console.log('doc successfull created ! with liked video');
        }).catch((err) => {
          console.log(err);
        });
      }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
  };
});

// affichage videos
const showVideo = (title, intro, url, videoId, likes) => {
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
        <p class="likes"><span class="nbLikes">0</span> J'aime</p>
      </div>
    </div>
    `;
  videosContainer.innerHTML += html;
};

// affichage likes
const showLikes = (videoID, number) => {
  const video = document.getElementById(videoID);
  const paraLikes = video.querySelector(".likes");
  const spanLikes = video.querySelector(".nbLikes");
  if(number){
    // number is not null so display likes
    paraLikes.style.display = 'block';
    spanLikes.innerHTML = number;
  } else{
    // number is null so no display
    paraLikes.style.display = 'none';
  }
};

// get the collection videos in database and show on screen
db.collection("videos").get().then(docs => {
  docs.forEach((doc) => {
    const data = doc.data();
    showVideo(data.title, data.intro, data.url, doc.id)
  });
}, err => console.log(err))

// get all changes in likes of videos in database and update on screen
db.collection("videos").onSnapshot((snapshopt)=> {
  snapshopt.docChanges().forEach((change) => {
    showLikes(change.doc.id, change.doc.data().likes)
  })
})

// get all changes in likes per user
db.collectionGroup("videosliked").onSnapshot((snapshopt)=> {
  snapshopt.docChanges().forEach((change) => {
    const dbVideoRef = db.collection('videos').doc(change.doc.id);
    if((change.type === "added") && (change.doc._hasPendingWrites === true)){
      // Atomically increment the likes in the video database by 1.
      dbVideoRef.update({
        likes: firebase.firestore.FieldValue.increment(1)
      });
    } else if(change.type === "modified"){
      if(change.doc.data().liked){
        dbVideoRef.update({
        likes: firebase.firestore.FieldValue.increment(1)
        })
      } else {
        dbVideoRef.update({
        likes: firebase.firestore.FieldValue.increment(-1)
        });
      }
    }
  });
})
