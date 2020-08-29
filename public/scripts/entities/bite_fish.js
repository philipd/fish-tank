class BiteFish extends Fish {

  constructor(options) {
    super(options);
    this.imageUri = '/images/bitefish.gif';
    this.isTasty = false;
    // this.surgeSecondsLeft = 0;
    // this.maxSurge = 1.0;
    // this.surgMult = 3.0;
  }

  getProximateDenizens(position, radius) {
    function isNearMe(individual) {
      return individual.position.distance(position) <= radius;
      //return distance(individual.position, center) <= radius;
    }
    let result = Object.values(this.tank.denizens).filter(isNearMe);
    return result;
  }

  updateOneTick() {
    var delta = this.swimVelocity.scale(PHYSICS_TICK_SIZE_S);
    this.position.addMut(delta);
    this.timeUntilSpeedChange -= PHYSICS_TICK_SIZE_S;
    if (this.timeUntilSpeedChange < 0) {
      this.makeNewVelocity();
    }

    // if another tasty fish is near ...
    let neighbors = this.getProximateDenizens(this.position, 40);
    for (let neighbor of neighbors) {
      if (neighbor.isTasty)
        // ... eat it!
        neighbor.kill();
    }
  }


  // onClick(event) {
  //   this.surgeSecondsLeft = this.maxSurge;
  // }
}
