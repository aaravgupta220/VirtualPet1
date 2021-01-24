//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dog_Image, happyDog_Image;

function preload(){
  //load images here
  dog_Image = loadImage("dogImg.png");
  happyDog_Image = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(250, 250, 30, 30);
  dog.addImage(dog_Image, "dgimage");
  dog.scale = 0.2;

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  

  background(46, 139, 87)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog_Image, "pdgimage");
  }

  drawSprites();
  //add styles here
  textSize(15);
  fill("white");
  stroke("black");
  text("Food : " + foodS, 240, 220);
  text("Note : Press UP_ARROW key to feed CHEWBACCA milk!", 100, 190);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

