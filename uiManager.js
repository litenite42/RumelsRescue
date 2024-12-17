function NEXTPAGE(el) {
  let currentPage = el.parentNode.parentNode.querySelector('.is-visible');
}
class uiManager {
  difficulty;
  mute;
  visible;

  menus;
  currentMenu;

  constructor() {
  this.menus = document.querySelectorAll('.menus > div');
    this.currentMenu = Array.from(this.menus).filter(m => m.id == 'main-menu')[0];
  
  const startBtn = this.currentMenu.querySelector('#main-menu-submit');

  startBtn.addEventListener('click', (evt) => {
    _FOTL.currentState = _FOTL.states.intro;

    this.currentMenu.classList.remove('is-visible');
    this.currentMenu = Array.from(this.menus).filter(m => m.id == 'intro-screen')[0];
    this.currentMenu.classList.add('is-visible');
  });

    Array.from(document.querySelectorAll('.next-page')).forEach(el => {
      
    });

  }

  toggleVisibility() {
    this.visible = !this.visible;
  }

  getVisibility() {
    return this.visible; 
  }

  setVisibility(visible) {
    this.visible = visible;
  }
}
