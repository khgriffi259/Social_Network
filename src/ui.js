 import { generateDashboardExperienceTemplate, generateDashboardEducationTemplate } from './templatestrings/dashboard_template_strings';
 import { generateProfileTemplate, generateProfileDetailsTemplate } from './templatestrings/profile_template_strings';

class UI {

    constructor(container, element) {
        if(container) {
            this.elementContainer = container;
            this.elements = container.children;
        }
        this.element = element;
    }
    
    greet(name){
        // this.element.innerHTML = `Welcome ${name}`;
        this.elementContainer.innerHTML = `Welcome ${name}`;
    }

    removeElement(id){
        Array.from(this.elements).forEach(element => {
            if (element.getAttribute('data-id') === id) {
                element.remove();
            }
        })
    }
    
    clearElements(){
        this.elementContainer.innerHTML = '';
    }
    
    updateElement(id) {
        // console.log(Array.from(this.elements));
        // Array.from(this.elements).forEach(element => {
        //     console.log(element);
        //     if (element.getAttribute('data-id') === id) {
                
        //     }
        // })
    }
    
    populateForm(form, data) {
        
        form.status.value = data.status;
        form.company.value = data.company;
        form.location.value = data.location;
        form.skills.value = data.skills;
        form.github_username.value = data.gh_username;
        form.bio.value = data.bio;
    }

    setupLinks(user){
        if(user){
            Array.from(this.elements).forEach(element => {
                if(element.classList.contains('logged-out')){
                    element.style.display='none';
                } else {
                    element.style.display ='block';
                }
            }) 
        }else {
            Array.from(this.elements).forEach(element => {
                if(element.classList.contains('logged-in')){
                    element.style.display='none';
                }else {
                    element.style.display ='block';
                }
            })                
        }        
    }

    render(template_type, data, doc_id, experience, education) {
        let html;
        switch (template_type) {
            case 'dashboard-experience':
                        html = generateDashboardExperienceTemplate(data, doc_id);
                        this.elementContainer.innerHTML += html;
                    break;
            case 'dashboard-education':
                    html = generateDashboardEducationTemplate(data, doc_id);
                    this.elementContainer.innerHTML += html;
            break;
            case 'profile':
                    html = generateProfileTemplate(data, doc_id);
                    this.elementContainer.innerHTML += html;
            break;
            case 'profile-details':
                html = generateProfileDetailsTemplate(data, experience, education);
                this.elementContainer.innerHTML += html;
            break;
            default:
                break;
            }
    }

}

export default UI