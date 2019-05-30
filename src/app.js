import UI from './ui';
import Database from './database';
import { format } from 'date-fns'
import Popup from './ui-components/popup'
import './ui-components/styles/popup.css'
import  Auth from './auth';

// get references to elements on pages
const showCreateProfileForm = document.querySelector('#show-create-profile-form');
const profileDetailsContainer = document.querySelector('.profile-details');
const profilesContainer = document.querySelector('.profiles');
const experienceContainer = document.querySelector('.data-dasboard-experience');
const educationContainer = document.querySelector('.data-dashboard-education');
const editUserProfileForm = document.querySelector('.create-profile');
const addExperienceForm = document.querySelector('.add-experience');
const addEducationForm = document.querySelector('.add-education');
const experienceTable = document.querySelector('.experience-table');
const educationTable = document.querySelector('.education-table');
const registerForm = document.querySelector('#register-form');
const loginForm = document.querySelector('#login-form');
const logout = document.querySelector('#logout');
const navLinksContainer = document.querySelector('.links');
const greetingElement = document.querySelector('.welcome');

const db = new Database();
const auth = new Auth();

auth.subscribeToUserStatus(user => {
  const navUI = navLinksContainer ? new UI(navLinksContainer) : null;
  if (user){
    console.log('subscribe method:',user);
    navUI.setupLinks(true);
    db.getCurrentUserName(user.uid).then(userName => {
      const greetingUI = greetingElement ? new UI(greetingElement) : null;
      greetingUI && greetingUI.greet(userName);
    })
    const currentpage = getPageFromURL()[0];
    switch (currentpage) {
      case 'create_profile':
        populateCreateProfileForm();
        break;
        case 'dashboard':
          getRealTimeExperienceData();
          getRealTimeEducationData();
          break;
        case 'profiles':
          getUserProfiles();
          break;
        case 'profile_details':
          getUserProfile();
          break;
        default:
          break;
        }
      
  } else {
    console.log('subscribe method:', user);
    navUI.setupLinks(false);
  }
});

function getUserIDFromURL(){
  let parametersArray = window.location.search.substring(1);
  return parametersArray.split('&').map(parameter => {
    let currentParameter = parameter.split('=');
    if (currentParameter[0] == 'uid') {
      return currentParameter[1];
    }
  })
}

function getPageFromURL(){
  let parametersArray = window.location.search.substring(1);
  return parametersArray.split('&').map(parameter => {
    let currentParameter = parameter.split('=');
    if (currentParameter[0] == 'page') {
      return currentParameter[1];
    }
  })
}

function getUserProfile(){
  // console.log('hello');
  let id = getUserIDFromURL()[1];
  db.getUserProfile(id).then(user => {
    db.getExperience(user.id).then(exp=>{
      // docs.forEach(doc=> console.log(doc.data()))
      db.getEducation(user.id).then(edu => {        
        const ui = new UI(profileDetailsContainer);
        ui && ui.render('profile-details', user.data(), null, exp, edu);
      })
    })
  });
}

function populateCreateProfileForm(){
  db.getUserProfile(auth.currentUserID).then(user=>{
    console.log(user.data());
    const ui = editUserProfileForm?  new UI(null, editUserProfileForm) : null;
    ui && ui.populateForm(editUserProfileForm, user.data());
  })
}

//add user profile
editUserProfileForm && editUserProfileForm.addEventListener('submit', e => {
  e.preventDefault();
  db.editUserProfile(editUserProfileForm, auth.currentUserID).then(()=>{
    editUserProfileForm.reset();
    window.location.href = `${window.origin}/profiles.html?page=profiles`;
  })
});

function getUserProfiles(){
  console.log('profiles loaded');
  const ui = profilesContainer ? new UI(profilesContainer) : null;
  db.getUserProfiles().then(users => {
    users.forEach(user => {
    ui && ui.render('profile', user.data(), user.id);
    })  
  })
}

// add event listener to exp and education tables
educationTable && educationTable.addEventListener('click', async e => {
  const id = e.target.parentElement.parentElement.getAttribute('data-id');
  if (e.target.tagName === 'BUTTON') {
    console.log(id);
    const confirmDelete = new Popup(
      'Delete', 
      'This will permanently delete this experience record.',
      ()=> db.deleteEducation(id)
    );
    confirmDelete.init();
  }
})

// add education form if element exists
addEducationForm && addEducationForm.addEventListener('submit', e => {
  e.preventDefault();
  db.addEducation(addEducationForm, auth.currentUserID).then(() =>{
    addEducationForm.reset();
    window.location.href = `${window.origin}/dashboard.html?page=dashboard`;
  })
})

experienceTable && experienceTable.addEventListener('click', async e => {
  const id = e.target.parentElement.parentElement.getAttribute('data-id');
  if (e.target.tagName === 'BUTTON') {
    console.log(id);
    const confirmDelete = new Popup(
      'Delete', 
      'This will permanently delete this experience record.',
      ()=> db.deleteExperience(id)
    );
    confirmDelete.init();
  }
})

// add experience form if element exists
addExperienceForm && addExperienceForm.addEventListener('submit', e => {
  e.preventDefault();
  db.addExperience(addExperienceForm, auth.currentUserID).then(() =>{
    addExperienceForm.reset();
    window.location.href = `${window.origin}/dashboard.html`;
  })
})

//auth tasks
logout && logout.addEventListener('click', () => {
  auth.signOut();
})

loginForm && loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;
    
    auth.signIn(email, password).then(cred => {
      loginForm.reset();
      window.location.href= `${window.origin}/dashboard.html`;
    })
});

registerForm && registerForm.addEventListener('submit', async e => {
  e.preventDefault();
  const email = registerForm.email.value;
  const password = registerForm.password.value;
  const name = registerForm.name.value;
  
  const cred = await auth.signUp(email, password);
  await db.addUserProfile(cred.user.uid, name);
  
  window.location.href= `${window.origin}/dashboard.html`;
})

function getRealTimeEducationData(){
  console.log('education data loaded');
  const ui = educationContainer ? new UI(educationContainer) : null;
  db.getEducationChanges(change => {
    switch (change.type) {
      case 'added':
        ui && ui.render('dashboard-education', change.doc.data(), change.doc.id);  
        break;
      case 'modified':
        // ui.renderUpdate('experience', data.doc.data(), data.doc.id);  
      case 'removed':
        ui && ui.removeElement(change.doc.id);
      default:
        break;
    }
  }, auth.currentUserID);
}

function getRealTimeExperienceData() {
  console.log('experience data loaded');
  const ui = experienceContainer ? new UI(experienceContainer) : null;
  db.getExperienceChanges(change => {
    switch (change.type) {
      case 'added':
        ui && ui.render('dashboard-experience', change.doc.data(), change.doc.id);  
        break;
      case 'modified':
        // ui.renderUpdate('experience', data.doc.data(), data.doc.id);  
      case 'removed':
        ui && ui.removeElement(change.doc.id);
      default:
        break;
    }
  }, auth.currentUserID);
}

