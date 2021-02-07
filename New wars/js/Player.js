class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank=0
    this.x=displayWidth/2
    this.y=displayHeight/2
    this.score=0
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }
  getCarsAtEnd(){
    database.ref('carsAtEnd').on('value',(data)=>{
    globelRank=data.val()


    })
  }
  static updateCarsAtEnd(rank){
    database.ref('/').update({
    carsAtEnd:rank


    })
  }
  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }
  updateObs(){
    database.ref('/').update({
      obstacles: obstaclesGroup
    });
  }
  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance,
      rank:this.rank,
      x:this.x,
      y:this.y,
      score:this.score

    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
}
