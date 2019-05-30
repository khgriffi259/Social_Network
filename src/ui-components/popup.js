class Popup {

    constructor(title, message, callback) {
      this.title = title;
      this.message = message;
      this.callback = callback;
      this.container = document.querySelector('body');
      this.decision = false;
    }
  
    init() {
      const popup = `
          <div class="popup-wrapper">
              <div class="popup bg-white p-1">
                  <div class="popup-close">X</div>
                  <div class="popup-content ">
                      <h2 class="">${this.title}</h2>
                      <p class="p-1 my-2">${this.message}</p>
                      <div class="dialogue_buttons my-1">
                          <button class="btn popup-no" >Cancel</button>
                          <button class="btn btn-danger my-1 popup-yes" >Start Delete</button>
                      </div>
                  </div>
              </div>
          </div>  
      `;
      this.container.insertAdjacentHTML('beforeend', popup);
  
      this.container.querySelector('.popup-no').addEventListener('click', () => this.cancelListener());
      this.container.querySelector('.popup-close').addEventListener('click', () => this.cancelListener());
    //   this.container.querySelector('.popup-wrapper').addEventListener('click', () => this.cancelListener());
      this.container.querySelector('.popup-yes').addEventListener('click', () => this.startListener());
  
    }
  
     cancelListener() {
      let elem = document.querySelector('.popup-wrapper');
      elem.parentNode.removeChild(elem);
    }
  
     startListener() {
      this.decision  = true;
      if (this.decision && this.callback !== undefined) {
        this.callback();
        let elem = document.querySelector('.popup-wrapper');
        elem.parentNode.removeChild(elem);
      }
    } 
  
  }

export default Popup