// adding new likes documents
// setting up a real-time listener to get new likes


class Video {
  constructor(videoName, username){
    this.videoName = videoName;
    this.username = username;
    this.likes = db.collection('likes');
  }
  async addLike(){
    // format a "like" object
    const now = new Date();
    const like = {
      liked: 1,
      username: this.username,
      videoName: this.videoName,
      created_at: firebase.firestore.Timestamp.fromDate(now)
    };
    // save the like document to the database
    const response = await this.likes.add(like);
    return response;
  }
  getLikes(callback){
    this.likes
      .where('videoName', '==', this.videoName) // get document from a certain collection where a certain condition is true : 3arguments (property name)
      .orderBy('created_at')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type === 'added'){
            //update the UI
            callback(change.doc.data())
          }
        });
      });
  }

}

// // class instances
// const video = new Video('le depart', 'lea');

// video.getLikes((data) => {
//   console.log(data);
// });