import { format } from 'date-fns';

export const generateProfileTemplate = (user, id) => {
    let html = `
    <div class="profile bg-light my-1">
    <div class="img-container">
      <img
        class="round-img"
        src="${user.image}"
        alt=""
      />
    </div>
    <div>
      <h1>${user.name}</h1>
      <div class="latest-experience">
        <p>${user.status}</p>
        <p>${user.location}</p>
      </div>
      <a href="profile.html?page=profile_details&uid=${id}" class="btn btn-primary">View Profile</a>
    </div>
    <ul class="technologies">
      <li class="text-primary"><i class="fas fa-check"></i> HTML</li>
      <li class="text-primary"><i class="fas fa-check"></i> CSS</li>
      <li class="text-primary"><i class="fas fa-check"></i> Javascript</li>
      <li class="text-primary"><i class="fas fa-check"></i> Python</li>
    </ul>
  </div>
`;
    return html;
}

export const generateProfileDetailsTemplate = (user, experience, education) => {
  const fullname = user.name.split(' ');
  const firstname = fullname[0];
  let html = `
  <a href="profiles.html?page=profiles" class="btn">Back To Profiles</a>
  <div class="profile-grid my-1">
    <!-- PROFILE TOP -->
    <div class="profile-top bg-primary p-2">
      <img
        class="round-img my-1"
        src="${user.image}"
        alt=""
      />
      <h1 class="large">${user.name}</h1>
      <p class="lead">${user.company}</p>
      <p>${user.location}</p>
      <div class="icons my-1">
        <a href="#"><i class="fas fa-globe fa-2x"></i></a>
        <a href="#"><i class="fab fa-twitter fa-2x"></i></a>
        <a href="#"><i class="fab fa-facebook fa-2x"></i></a>
        <a href="#"><i class="fab fa-linkedin fa-2x"></i></a>
        <a href="#"><i class="fab fa-instagram fa-2x"></i></a>
      </div>
    </div>
    <!-- PROFILE-ABOUT -->
    <div class="profile-about bg-light p-2">
      <h2 class="text-primary">${firstname}'s Bio</h2>
      <p class="">
        ${user.bio}
      </p>
      <div class="line"></div>
      <h2 class="text-primary">Skill Set</h2>
      <div class="skills">
        ${user.skills}
      </div>
    </div>
    <!-- EXPERIENCE -->
    <div class="profile-exp bg-white p-2">
      <h2 class="text-primary">Experiences</h2>
    ${experience.map(item => {
      return (
         `<div class="line"></div>
          <div>
            <h3>${item.data().company}</h3>
            <p>${format(item.data().start.toDate(),'MMM YYYY')} - ${format(item.data().end.toDate(), 'MMM YYYY')} </p>
            <p>Position: ${item.data().position}</p>
            <p>
              Description: Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Cum architecto cupiditate iste laborum aliquam praesentium?
            </p>
        </div>`
      )
    })}   
    </div>
    <div class="profile-education bg-white p-2">
      <h2 class="text-primary">Education</h2>
      ${education.map(item => {
        return (
          `
            <div class="line"></div>
            <h3>${item.data().school}</h3>
            <p>${format(item.data().start.toDate(),'MMM YYYY')} - ${format(item.data().end.toDate(), 'MMM YYYY')}</p>
            <p>Degree: Bachelor's</p>
            <p>Field of Study: ${item.data().major}</p>
            <p>
              Description: Lorem ipsum dolor sit, amet consectetur adipisicing
              elit. Dolorum inventore totam possimus doloremque ipsum non!
            </p>
        `
        )
      })}   
    </div>
    <!-- Github Section -->
    <div class="profile-github my-2">
      <h2 class="text-primary">
        <i class="fab fa-github"> Github Repos</i>
      </h2>
      <div class="repo bg-white my-1 p-1">
        <div>
          <h4 class="text-primary"><a href="#">Repo One</a></h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Aliquam, repudiandae.
          </p>
        </div>
        <div>
          <ul>
            <li class="badge badge-primary">Stars: 44</li>
            <li class="badge badge-dark">Watchers: 20</li>
            <li class="badge badge-light">Forks: 25</li>
          </ul>
        </div>
      </div>
      <div class="repo bg-white my-1 p-1">
        <div>
          <h4 class="text-primary"><a href="#">Repo Two</a></h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Aliquam, repudiandae.
          </p>
        </div>
        <div>
          <ul>
            <li class="badge badge-primary">Stars: 44</li>
            <li class="badge badge-dark">Watchers: 20</li>
            <li class="badge badge-light">Forks: 25</li>
          </ul>
        </div>
      </div>
      <div class="repo bg-white my-1 p-1">
        <div>
          <h4 class="text-primary"><a href="#">Repo Three</a></h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Aliquam, repudiandae.
          </p>
        </div>
        <div>
          <ul>
            <li class="badge badge-primary">Stars: 44</li>
            <li class="badge badge-dark">Watchers: 20</li>
            <li class="badge badge-light">Forks: 25</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  
  `;

  return html;
}