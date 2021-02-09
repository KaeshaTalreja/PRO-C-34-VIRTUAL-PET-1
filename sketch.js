//Create variables here
var dog;
var dogImage,happyDogImage;
var db;
var stock;


function preload()
{
	//load images here
	dogImage=loadImage("images/dogImg.png");
	happyDogImage=loadImage("images/dogImg1.png");


}

function setup() {
	createCanvas(500, 500);
	//creating dog sprite
	dog=createSprite(300,200);
	dog.addImage("hungry dog",dogImage);
	dog.scale=0.4;

	//connect to database
	db=firebase.database();

	//get the no of milk bottles in our stock
	db.ref('Food').on("value",readStock,showError);
  
}


function draw() { 
	background(46,139,87); 

  drawSprites();
  //add styles here

  //feed the dog and update the stock
  if(keyWentDown("up")){
  	stock=stock-1;
  	if(stock<0){
  		stock=0;
  	}
  	writeStock(stock);
  	dog.addImage("fed dog",happyDogImage);
  }

  textSize(18);
  fill("red");
  stroke("red");
  strokeWeight(1);
  text("Press up arrow key to feed the dog",150,50);
  text("No of milk bottles in stock: "+stock,250,100);

}

function readStock(data){
	stock=data.val();

}

function showError(){
	console.log("some problem");
}

function writeStock(s){
	db.ref("/").update({
		Food:s
	});
}



