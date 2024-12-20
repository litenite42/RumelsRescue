class VehicleFactory {
  #difficulty;
  #lastLane;
  constructor(settings) {
    let {difficulty} = {...settings};

    if (!difficulty) {
      difficulty = _FOTL.difficulties.easy;
    }
    this.#difficulty = difficulty;
    this.#lastLane = -100;
  }

  New() {
    const vehicleRand = randInt(20);
    let spawnPoints = [9, 15];
    
    if (this.#difficulty === _FOTL.difficulties.medium) {
      spawnPoints = spawnPoints.map(i => i - 1);
    } else if (this.#difficulty === _FOTL.difficulties.hard) {
      spawnPoints = spawnPoints.map(i => i - 2);
    }

    const quads = [4, 9, 14, 19];
        
    let randNdx = randInt(4);
    let selectedQuad = quads[randNdx];

    while (selectedQuad === this.#lastLane)  {
      randNdx = randInt(4);
      selectedQuad = quads[randNdx];
    }

    if (vehicleRand < spawnPoints[0]) {
      new EasyVehicle(selectedQuad);
    }
    else if (vehicleRand < spawnPoints[1]) {
      new MediumVehicle(selectedQuad);
    } 
    else {
      new HardVehicle(selectedQuad);
    }

    this.#lastLane = selectedQuad;
  } 
}
