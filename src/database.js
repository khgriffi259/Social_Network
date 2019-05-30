import db, { firebase } from './fbconfig';

class Database {
  constructor() {
    this.users = db.collection('users');
    this.experience = db.collection('experience');
    this.education = db.collection('education');
    this.skills = db.collection('skills');
  }

  getCurrentUserName(id){
    return this.users.doc(id).get().then(doc=>{
       return doc.data().name;
    })
  }

  deleteEducation(id){
    this.education.doc(id).delete()
      .then(() => {
        console.log(id, 'document deleted');
      }).catch(err => console.log(err))
  }
 
  deleteExperience(id){
    this.experience.doc(id).delete()
      .then(() => {
        console.log(id, 'document deleted');
      }).catch(err => console.log(err))
  }

  addEducation(form, currentUserId) {
    const start_date = new Date(form.start_date.value);
    const end_date = new Date(form.end_date.value);
    
    const newEducation = {
      school: form.school.value,
      major: form.major.value,
      city: form.city.value,
      state: form.state.value,
      start: firebase.firestore.Timestamp.fromDate(start_date),
      end: firebase.firestore.Timestamp.fromDate(end_date),
      userID: currentUserId
    }

    //must return the promise itself in order to use .then() in app.js
    return this.education.add(newEducation)
      .then(() => console.log('education added'))
      .catch(err => console.log(err))
  };

  addExperience(form, currentUserId) {
    const start_date = new Date(form.start_date.value);
    const end_date = new Date(form.end_date.value);
    
    const newExperience = {
      position: form.title.value,
      company: form.company.value,
      city: form.city.value,
      state: form.state.value,
      start: firebase.firestore.Timestamp.fromDate(start_date),
      end: firebase.firestore.Timestamp.fromDate(end_date),
      userID: currentUserId
    };
    
    //must return the promise itself in order to use .then() in app.js
    return this.experience.add(newExperience).then(() => {
      console.log('experience added');
    }).catch(err => {
      console.log(err);
    })
   
  }

  editUserProfile(form, currentUserId) {
    const profile = {
      status: form.status.value,
      company: form.company.value,
      location: form.location.value,
      skills: form.skills.value,
      gh_username: form.github_username.value,
      bio:    form.bio.value,
      twitter: form.twitter.value,
      facebook: form.facebook.value,
      youtube: form.youtube.value,
      linkedin: form.linkedin.value,
      instagram: form.instagram.value,
      github: form.github.value
    }

    // return this.users.doc(currentUserId).update(profile).then(()=> {
    return this.users.doc(currentUserId).update(profile).then(()=> {
      console.log('document updated');
    }).catch(err=>console.log(err));
  }

  getEducation(id){
    return this.education.where('userID', '==', id).orderBy('start', 'desc').get()
      .then(snapshot => {
        return snapshot.docs;
    })
  }
  getExperience(id){
    return this.experience.where('userID', '==', id).orderBy('start', 'desc').get()
      .then(snapshot => {
        return snapshot.docs;
    })
  }

  getUserProfile(id){
    return this.users.doc(id).get().then(doc=> {
      return doc;
    })
  }

  getUserProfiles(callback) {
   return this.users.orderBy('name').get().then(snapshot => {
        return snapshot.docs;
    })
  }

  async addUserProfile(id, name){
    const response = await this.users.doc(id).set({
        name: name
    })
  }

  //real time listener
  getEducationChanges(callback, currentUserId) {
    this.education.where('userID', '==', currentUserId).orderBy('start', 'desc').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
          callback(change);
      })
    })
  }
  //real time listener
  getExperienceChanges(callback, currentUserId) {
    this.experience.where('userID', '==', currentUserId).orderBy('start', 'desc').onSnapshot(snapshot => {
      console.log(snapshot.docChanges());
      snapshot.docChanges().forEach(change => {
        callback(change);
      })
    })
  }

}

export default Database;
