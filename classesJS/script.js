
$(document).ready(() => {
/* 
     Règle du jeu
  
       - Le jeu comprend 2 joueurs sur un seul et même écran.
       - Chaque joueur possède un score temporaire (ROUND) et un score global (GLOBAL). 
       - À chaque tour, le joueur a son ROUND initialisé à 1 et peut lancer un dé autant de fois qu'il le souhaite. 
       - Le résultat d’un lancer est ajouté au ROUND.
       - Lors de son tour, le joueur peut décider à tout moment de:
          ° Cliquer sur l’option “Hold”, qui permet d’envoyer les points du ROUND vers le GLOBAL. Ce sera alors le tour de l’autre joueur. 
          ° Lancer le dé. S’il obtient un 1, son score ROUND est perdu et c’est la fin de son tour. 
       - Le premier joueur qui atteint les 100 points sur son GLOBAL gagne le jeu.
  */
      let dice = $('#dice');
      dice.hide();
      let roundText = $('#roundText');
      let roundScore = $('#roundScore');
      roundText.hide();
      roundScore.hide();
      
      let newGame = $('#newGame');
      let rulestitle =$('#rulestitle')
      let rules = $('.rules')
      const reg = /^[a-z ,.'-]+$/i ;

      let player1 = $('.player1')
      let player2 = $('.player2')
      let players = [player1, player2];
      let playing = player1;
      const scoreToWin = 100;
      
      let scoreFirstPlayer = $('#ScoreFirstPlayer');
      let scoreSecondPlayer = $('#scoreSecondPlayer');
      let currentFirstPlayer = $('#currentFirstPlayer');
      let currentSecondPlayer = $('#currentSecondPlayer');
      let tempScoreSecondPlayer = 0;
      let tempScoreFirstPlayer = 0;
      
      newGame.on("click", ()=>{

         let n1=prompt("Joueur 1 entrez votre nom...");
        if(n1 == null){
         alert("entrez un nom");
         return;
       }else if( n1.length <=3){
         alert("votre nom doit comporter plus de 3 charactères");
         return;
       }else if(!n1.match(reg)){
         alert("rentrez des charactères valides")
         return;
       }else{
          player1.html(`${n1}`);
       }
       let n2=prompt("Joueur 2 entrez votre nom...");
       if(n2 == null){
         alert("entrez un nom");
         return;
       }else if( n2.length <=3){
         alert("votre nom doit comporter plus de 3 charactères");
         return;
       }else if(!n2.match(reg)){
         alert("rentrez des charactères valides")
         return;
       }else{
          player2.html(`${n2}`);
       }  
      })
      let int;
      const randomNumber = (max, min) => { // choix d'un nombre au hasard entre max et min
        console.log("Random number : " + int);
        int = Math.floor(Math.random() * (max - min + 1)) + min;
        return int;
      };
      const displayDice = (int) => {   // affiche le dé en fonction du nombre tiré
        dice.css('display', 'block');
        dice.css('text-align','center')
        dice.attr('src', `images/dice${int}.png`);
      };
      
      const hideDice = () => { // cache le dé
        dice.css('display', 'none');
      };
      
      const gameWon = (players) => {
        scoreFirstPlayer.text("0"); // réinitialisation de toutes les variables scores à "0"
        currentFirstPlayer.text("0");
        scoreSecondPlayer.text("0");
        currentSecondPlayer.text("0");
        switch (players) {
          case player1:
            alert( `${player1.html()} won the game!`);
            newRound(1, player1); // si joueur 1 arrive à 100, le score est réinitialisé et joueur 2 commence
            break;
          case player2:
            alert(`${player2.html()} won the game!`);
            newRound(1, player2); // si joueur 2 arrive à 100, le score est réinitialisé et joueur 1 commence
            break;
        }
      }
      
      const select = (players) => { // selection d'un joueur
        switch (players) {
          case player1:
            scoreSecondPlayer.text("0");
            scoreFirstPlayer.text("0");
            player1.css('opacity', 1);
            player2.css('opacity', 0.5);
            playing = player1;
            return playing;
          case player2: 
            scoreFirstPlayer.text("0");
            scoreSecondPlayer.text("0");
            player2.css('opacity', 1);
            player1.css('opacity', 0.5);
            playing = player2;
            return playing;
        }
      };
      
      const newRound = (int, players) => { // initialise un nouveau round en fonction du résultat du dé et du joueur selectionné
        roundText.show()
        roundScore.show()
        roundScore.text(String(int));
        select(players);
        if (playing === player1 && int !== 1) {
          tempScoreFirstPlayer = scoreFirstPlayer.text();
          let resultFirstPlayer = int + Number(tempScoreFirstPlayer);
          scoreFirstPlayer.text(String(resultFirstPlayer));
        } else if (playing === player1 && int === 1) {
          roundScore.text("0");
          dice.css('display', 'none');
          tempScoreFirstPlayer = 0;
          select(player2);
        } else if (playing === player2 && int !== 1) {
          tempScoreSecondPlayer = scoreSecondPlayer.text();
          let resultSecondPlayer = int + Number(tempScoreSecondPlayer);
          scoreSecondPlayer.text(String(resultSecondPlayer));
         
        } else if (playing === player2 && int === 1) {
          roundScore.text("0");
          dice.css('display', 'none');
          tempScoreSecondPlayer = 0;
          select(player1);
      
        }
      };
      
      const checkWin = (playing, globalScore) => { // vérifie si le joueur séléctionné a gagné en fonction de son score global
        globalScore = [Number(currentFirstPlayer.text()), Number(currentSecondPlayer.text())];
        console.log(globalScore);
        if (playing === player1 && globalScore[0] >= scoreToWin) {
          return gameWon(player1);
        } else if (playing === player2 && globalScore[1] >= scoreToWin) {
          return gameWon(player2);
        } else if (playing === player2) {
          return newRound(0, player1);
        } else if (playing === player1) {
          return newRound(0, player2);
        }
      };
    
      let diceHold = $('#diceHold');
      let diceRoll = $('#diceRoll');
      
      diceRoll.on("click", () => { // event listener sur le bouton roll
        randomNumber(6, 1);
        displayDice(int);
        newRound(int, players);
      });
      
      diceHold.on('click', () => { // event listener sur le bouton hold
      
        hideDice();
      
        if (playing == player1) {
          //tempScoreFirstPlayer = Number(currentFirstPlayer.text());
          tempScoreFirstPlayer = Number(scoreFirstPlayer.text());
          //let globalScoreFirstPlayer = Number(scoreFirstPlayer.text());
          let globalScoreFirstPlayer = Number(currentFirstPlayer.text());
          globalScoreFirstPlayer = globalScoreFirstPlayer + tempScoreFirstPlayer;
          currentFirstPlayer.text(globalScoreFirstPlayer);
          scoreFirstPlayer.text("0");
          console.log(`scoreFirstPlayer = ${scoreFirstPlayer}
                      scoreSecondPlayer = ${scoreSecondPlayer}
          `);
          roundScore.text("0")
          checkWin(player1, currentFirstPlayer.text());
        } else if (playing == player2) {
          tempScoreSecondPlayer = Number(scoreSecondPlayer.text());
          let globalScoreSecondPlayer = Number(currentSecondPlayer.text());
          globalScoreSecondPlayer = globalScoreSecondPlayer + tempScoreSecondPlayer;
          currentSecondPlayer.text(globalScoreSecondPlayer);
          scoreSecondPlayer.text("0");
          console.log(`scoreFirstPlayer = ${scoreFirstPlayer.text()}
          scoreSecondPlayer = ${scoreSecondPlayer.text()}
         `);
         roundScore.text("0")
          checkWin(secondPlayer, scoreSecondPlayer.text());
        }
      
        roundScore.text("0");
      
      });
      
   
 
      
      

})
      
    /*defObj = $.Deferred();
      defObj.promise(getPlayer);
      defObj.resolve();
      getPlayer.done(function(){
        rulestitle.html(`Règle du jeu`)
        rules.html(` 
        - Le jeu comprend 2 joueurs sur un seul et même écran. </br>
        - Chaque joueur possède un score temporaire (ROUND) et un score global (GLOBAL). </br>
        - À chaque tour, le joueur a son ROUND initialisé à 1 et peut lancer un dé autant de fois qu'il le souhaite. </br>
        - Le résultat d’un lancer est ajouté au ROUND. </br>
        - Lors de son tour, le joueur peut décider à tout moment de: </br>
           ° Cliquer sur l’option “Hold”, qui permet d’envoyer les points du ROUND vers le GLOBAL. Ce sera alors le tour de l’autre joueur.</br> 
           ° Lancer le dé. S’il obtient un 1, son score ROUND est perdu et c’est la fin de son tour.
        - Le premier joueur qui atteint les 100 points sur son GLOBAL gagne le jeu.`)
        
      })*/  

       
    
      
      //})
        // TROUVER UN MOYEN POUR FAIRE SI LE JOUEUR 2 N'est pas rentré  ALORS le jeu de fonctionne pas 

    
      
      
     
      //newGame.promise(()=>{
        
      //})
      

      /*player1.click((event)=>{
        player1.keypress(function(event){

        })
      })*/
      
    
//})
      
      
     
