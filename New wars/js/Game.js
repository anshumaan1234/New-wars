class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    if(obstaclesGroup.lenght<10){
      this.spawnObstacles()
    }
    
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      player.getCarsAtEnd();
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;
      if(obstaclesGroup.lenght<10){
        this.spawnObstacles()
      }
      
      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        
        //use data form the database to display the cars in y direction
        
        cars[index-1].x = allPlayers[plr].x
        cars[index-1].y = allPlayers[plr].y

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = cars[index-1].x;
          camera.position.y = cars[index-1].y;
          fill('blue')
          stroke(10)
          
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(83) && player.index !== null){
      player.y +=10
      player.update();
    }
    if(keyIsDown(87) && player.index !== null){
      player.y -=10
      player.update();
    }
    if(keyIsDown(65) && player.index !== null){
      player.x-=10
      player.update();
    }
    if(keyIsDown(68) && player.index !== null){
      player.x +=10
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
     globelRank++
     player.rank=globelRank
     player.update()
      Player.updateCarsAtEnd(player.rank)
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank)
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      player.getCarsAtEnd();
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
        if(allPlayers[plr].rank!=0){
        var element=createElement('h3')
        element.position(displayWidth/2, allPlayers[plr].rank*40)
    element.html(allPlayers[plr].name+': '+allPlayers[plr].rank)
        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
          fill('blue')
          stroke(10)
          ellipse(x,y,60,60)
          element.style('color','red')
        }
       else{
        element.style('color','black')
       }
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
    }
    }
  drawSprites()
  }
  spawnObstacles() {
    if(frameCount % 60 === 0 ) {
      var obstacle = createSprite(600,165,10,40);
      //obstacle.debug = true;
      obstacle.velocityX = Math.round(random(-1,1))*15;
      obstacle.velocityY = Math.round(random(-1,1))*15;

      obstacle.x = Math.round(random(50,1150));
      obstacle.y = Math.round(random(50,1150));
      //generate random obstacles
      var rand = Math.round(random(1,6));
      // switch(rand) {
      //   case 1: obstacle.addImage(obstacle1);
      //           break;
      //   case 2: obstacle.addImage(obstacle2);
      //           break;
      //   case 3: obstacle.addImage(obstacle3);
      //           break;
      //   case 4: obstacle.addImage(obstacle4);
      //           break;
      //   case 5: obstacle.addImage(obstacle5);
      //           break;
      //   case 6: obstacle.addImage(obstacle6);
      //           break;
      //   default: break;
      // }
      
      //assign scale and lifetime to the obstacle           
      obstacle.scale = 0.5;
      obstacle.lifetime = 300;
      //add each obstacle to the group
      obstaclesGroup.push(obstacle);
    }
  }
  }

