function Enemy() {

  // Atributos base do inimigo.

  var baseLife = 100;
  var baseEnergy = 120;
  var baseDefense = 10;
  var baseAttack = 10;


  // Getters and Setters.

  this.getBaseLife = function(){
    return baseLife;
  };

  this.setBaseLife = function(life){
    baseLife = life;
  };

  this.getBaseEnergy = function(){
    return baseEnergy;
  };

  this.setBaseEnergy = function(energy){
    baseEnergy = energy;
  };

  this.getBaseDefense = function(){
    return baseDefense;
  };

  this.setBaseDefense = function(defense){
    baseDefense = defense
  };

  this.getBaseAttack = function(){
    return baseAttack;
  };

  this.setBaseAttack = function(attack){
    baseAttack = attack;
  }

}
