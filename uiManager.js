class uiManager {
  difficulty;
  mute;

  root;
  menu;

  constructor() {
    this.root = new UIObject();

    const uiInfo = new UIText(vec2(540,360), vec2(320, 180), 
        'Rumel\'s Rescue\nM = Toggle menu');
    uiInfo.textColor = GREEN;
    uiInfo.lineWidth = 8;
    this.root.addChild(uiInfo);
    this.root.visible = true;

    // setup example menu
    this.menu = new UIObject(vec2(20,17));
    this.root.addChild(this.menu);
    const uiBackground = new UIObject(vec2(20,17), vec2(38,2));
    this.menu.addChild(uiBackground);
    this.menu.visible = true;

    const textTitle = new UIText(vec2(24,16), vec2(38, 2), 'Rumel\'s Options');
    this.menu.addChild(textTitle);
    textTitle.textColor = RED;
    textTitle.lineWidth = 4;
    textTitle.lineColor = BLUE;

    const easyMode = new UICheckbox(vec2(540, 120), vec2(30, 30), true);
    const easyModeText = new UIText(vec2(585, 123), vec2(50, 40), "Easy");

    const mediumMode = new UICheckbox(vec2(540, 180), vec2(30, 30), false);
    const mediumModeText = new UIText(vec2(598, 183), vec2(75, 40), "Medium");

    const hardMode = new UICheckbox(vec2(540, 240), vec2(30, 30), false);
    const hardModeText = new UIText(vec2(598, 243), vec2(75, 40), "Hard");

    this.menu.addChild(easyMode);
    this.menu.addChild(easyModeText);
    this.menu.addChild(mediumMode);
    this.menu.addChild(mediumModeText);
    this.menu.addChild(hardMode);
    this.menu.addChild(hardModeText);

    easyMode.onPress = () => {
      difficulty = _FOTL.difficulties.easy;
      #turnOff(mediumMode, hardMode);
    }
    
  }

  static #turnOff(...checkboxes) {
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
  }

  toggleVisibility() {
    this.root.visible = !this.root.visible;
    this.menu.visible = !this.menu.visible;
  }

  getVisibility() {
    return menu.visible; 
  }

  setVisibility(visible) {
    this.root.visible = visible;
    this.menu.visible = visible;
  }
}
