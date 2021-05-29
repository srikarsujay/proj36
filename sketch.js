//Create variables here
var dog; 
var happyDog;
var database;
var foodS;
var foodStock;
var lastFed;
var fedTime;
var feed;
var addFood;
var foodObj;

function preload()
{
	//load images here
  dog = loadImage("images/dogImg1.png");
  happyDog = loadImage("images/dogImg");
}

function setup() {
  createCanvas(500,500);

  foodObj = new Food();

  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  foodStock.set(40);
  
  dog = createsprite(250,350,10,60);
  dog.addImage(dog);
  dog.scale = 0.2;

  feed = createButton("FEED");
  feed.position(600, 30);
  feed.mousePressed(feedDog);

  AddFood = createButton("ADD FOOD");
  AddFood.position(700, 30);
  AddFood.mousePressed(addFood);

}


function draw() {  

    //add styles here

    background(0,181,255);

    foodObj.display();

    fedTime = db.ref('fedTime');
    fedTime.on('value', function(data){
    lastFed = data.val();
    })

    if (foodS!== undefined){
      textSize(50);
      fill(255);
      text("Use UP ARROW for feeding your pet",50,50);
      text("Food Left => "+foodS, 150, 150);

    if(keyWentDown(UP_ARROW)){
     writeStock(foodS);
     dog.addImage(happyDog);
  }

    if(keyWentUp(UP_ARROW)){
      dog.addImage(dog);
    }

    if(foodS === 0){
      foodS = 20;
    }

    if(lastFed >=12){
      text("LAST FEED :" + lastFed % 12 + 'pm', 350, 30);
    } else if(lastFed === 0){
      text("LAST FEED : 12 am", 350, 30);
    }else {
      text("LAST FEED :"+ lastFed+'am', 350, 30);
    }

    drawSprites();
  }
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref("/").update({
    food: x
  })
}

function readStock(data){
  foodS = data.val();
  foodObj.updatefoodStocks(foodS);
}

function feedDog(){
  dog.addImage(dogImg2)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  db.ref('/').update({
    Food:foodObj.getFoodStock(), fedTime:hour()
  })
}

function addFood(){
  foodS++
  db.ref('/').update({
    Food:foodS
  })
}