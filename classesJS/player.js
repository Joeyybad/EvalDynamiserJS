class Player{
  constructor(name, score = 0 , globalScore = 0){
    
    //propriété gameplay
    this.name = name;
    this.score = score; //score temporaire
    this.globalScore = globalScore; // score global

    
  }


  // GETTERS //
  
  getPlayer(){

  }
  getWhoPlaying(){
    this.whoPlaying = document.querySelector('#tours')
    return this.whoPlaying;
  }

  rollTheDice(){

  }
  //rollTheDice(){} event listener sur bouton roll, au clic lance les dés 
  
  //holdTheDice(){} event listener sur bouton hold , au clic retient le nombre tiré 
  }
