  
'use strict';

/* array type of extension */
var extension = ['png', 'gif', 'jpg'];
// console.log(extension);

/* this array that contain all products(images) each extension has array*/
var png = ['sweep'];
var gif = ['usb'];
var jpg = [
  'bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum'
  , 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep'
  , 'scissors', 'shark', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];

/* this array that contain all products(images) */
var products = [png, gif, jpg];

// console.table(products);

var totalClicks = 0;
var numberOfRounds = 25;


/* get the img by id */
var leftimg = document.getElementById('leftimg');
var middleimg = document.getElementById('middleimg');
var rightimg = document.getElementById('rightimg');
var holderImg = document.getElementById('holderImg');

/* create constructor function for the product */
function Product(name) {
  this.productName = name;
  this.imgPath = `img/${name}.${extension[i]}`;
  this.clicks = 0;
  this.shows = 0;
  Product.all.push(this);
}
Product.all = [];

/* instantiate objects for all the goats one shot */

for (var i = 0; i < products.length; i++){

  for (var j = 0; j < products[i].length; j++){
    new Product((products[i])[j]);
  }
}
// console.table(Product.all);

/* render 3 random img */
var leftProduct, middleProduct ,rightProduct;

function renderImg() {

  /* (do while) to makesure the isn't same random Number( same img) */
  do {
    var randomNumber1 = randomNumber(0,Product.all.length-1);
    var randomNumber2 = randomNumber(0,Product.all.length-1);
    var randomNumber3 = randomNumber(0,Product.all.length-1);
  } while (randomNumber1 === randomNumber2 || randomNumber2 === randomNumber3 || randomNumber3 === randomNumber1);

  console.log(randomNumber1, randomNumber2, randomNumber3);

  leftProduct = Product.all[randomNumber1];
  middleProduct = Product.all[randomNumber2];
  rightProduct = Product.all[randomNumber3];

  /* this is for count how many times was shown each product(image) */
  leftProduct.shows++;
  middleProduct.shows++;
  rightProduct.shows++;

  console.log(leftProduct, middleProduct ,rightProduct);

  leftimg.src = leftProduct.imgPath;
  leftimg.alt = leftProduct.productName;
  leftimg.title = leftProduct.productName;
  middleimg.src = middleProduct.imgPath;
  middleimg.alt = middleProduct.productName;
  middleimg.title = middleProduct.productName;
  rightimg.src = rightProduct.imgPath;
  rightimg.alt = rightProduct.productName;
  rightimg.title = rightProduct.productName;
}
renderImg();


/* add event for ending the session after 25 rounds of voting  */
/* and how many times was voted each product(image) */
holderImg.addEventListener('click',handleClick);

function handleClick (event) {
  console.log();
  if(totalClicks < numberOfRounds){

    if(event.target.id !== 'holderImg'){
      totalClicks++;
      if(event.target.id === 'leftimg') {
        leftProduct.clicks++;
      }
      if(event.target.id === 'middleimg') {
        middleProduct.clicks++;
      }
      if(event.target.id === 'rightimg') {
        rightProduct.clicks++;
      }
      renderImg();

    }
  } else if (totalClicks === numberOfRounds) {
    totalClicks++;
    renderResults();
  }
}

function renderResults () {

  var ul1 = document.getElementById('results');
  for(var l = 0; l < Product.all.length; l++) {
    var li = document.createElement('li');
    li.textContent = `${Product.all[l].productName} had ${Product.all[l].clicks} votes and was shown ${Product.all[l].shows} times.`;
    ul1.append(li);
  }
}

/* helper functions for get random number */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}