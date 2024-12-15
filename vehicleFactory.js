class VehicleFactory {
  #difficulty;
   
  constructor(settings) {
    let {difficulty} = {...settings};

    if (!difficulty) {
      difficulty = _FOTL.difficulties.easy;
    }
    this.#difficulty = difficulty;
  }

  New() {
    const vehicleRand = randInt(20);
    let spawnPoints = [9, 15];
    
    if (this.#difficulty === _FOTL.difficulties.medium) {
      spawnPoints = spawnPoints.map(i => i - 1)
    } else if (this.#difficulty === _FOTL.difficulties.hard) {
      spawnPoints = spawnPoints.map(i => i - 2);
    }
      
    if (vehicleRand < spawnPoints[0]) {
      new EasyVehicle();
    }
    else if (vehicleRand < spawnPoints[1]) {
      new MediumVehicle();
    } 
    else {
      new HardVehicle();
    }
  } 
}
