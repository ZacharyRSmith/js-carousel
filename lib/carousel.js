  var imgAry = ["http://img.wikinut.com/img/gycf69_-6rv_5fol/jpeg/0/Best-Friends-Img-Src%3AImage%3A-FreeDigitalPhotos.net.jpeg",
                "http://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg",
                "https://upload.wikimedia.org/wikipedia/commons/f/ff/Bonsai_IMG_6404.jpg"];
                var imgInd = 0;
var pauseHTML = "| |";
var playHTML = ">";

function changeImg(newInd) {
  if (typeof newInd === 'undefined') { newInd = imgInd + 1; }
  if (newInd >= imgAry.length) { newInd = 0; }

  carousel.setImageSource(imgAry[newInd]);
}

function changeTracker(newInd) {
  if (typeof newInd === 'undefined') { newInd = imgInd + 1; }
  if (newInd >= imgAry.length) { newInd = 0; }

  var trackerAry = [document.getElementById("carousel-tracker-1"),
                    document.getElementById("carousel-tracker-2"),
                    document.getElementById("carousel-tracker-3")];
                    
  // resetOldTracker
  // resetCrntTracker();
  trackerAry[imgInd].setAttribute("src", "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/16/Status-user-online-icon.png");
  
  // setNewTracker(newInd);
  // setNewTracker

  trackerAry[newInd].setAttribute("src", "http://icons.iconarchive.com/icons/fi3ur/fruitsalad/16/strawberry-icon.png");
}

function nextImg() {
  changeImg();
  changeTracker();
  imgInd++;
          if (imgInd >= imgAry.length) { imgInd = 0; }  
}



/*
setImgElt:function (htmlElement) {
  imgElt = htmlElement;
}

setPlayElement:function (playElt) {
  if (playElt.length !== 1) {
    "Function should receive 1 and only 1 element but did not! :_(";
  }

  playElement = playElt;
}

setPlayEvent:function () {
  playElement.click(function () {
    start();
    $(this).attr('id', 'pause');
    $(this).html(pauseHtml);
  }
}

  $(document).on('click', playElement, function () {
    start();
    $(this).attr('id', 'pause');
    $(this).html(pauseHtml);
  });
}

start:function (speed) {
  carouselIntervalID = setInterval(nextImg, speed);
}
*/
function Carousel (imgAry, speed) {
  this.imageArray = imgAry;
  var imageElement;
  var speed = speed;

  this.getSpeed = function () {
    return speed;
  }
}

Carousel.prototype = {
  constructor: Carousel,

  setImageElement: function (imgElt) {
    imageElement = imgElt;
  },

  setImageSource:function (src) {
    imageElement.setAttribute('src', src);
  },

  setPlayEvent:function () {
    var speed = this.getSpeed();

    $(document).on('click', '#play', function() {
      carouselIntervalID = setInterval(nextImg, speed);
      $(this).attr('id', 'pause');
      $(this).html(pauseHTML);
    });
  }
}

var carousel = new Carousel([
    "http://img.wikinut.com/img/gycf69_-6rv_5fol/jpeg/0/Best-Friends-Img-Src%3AImage%3A-FreeDigitalPhotos.net.jpeg",
    "http://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/f/ff/Bonsai_IMG_6404.jpg"], 2000);

$(document).ready(function(){

  carousel.setImageElement($('#crntImg').get(0));
  // var crntImg = document.getElementById("crntImg");

  carousel.setPlayEvent();
  /*$(document).on('click', 'button#play', function() {
    carouselIntervalID = setInterval(nextImg, 1000);
    $(this).attr('id', 'pause');
    $(this).html(pauseHTML);
  });*/

  $(document).on('click', 'button#pause', function() {
    clearInterval(carouselIntervalID);
    $(this).attr('id', 'play');
    $(this).html(playHTML);
  });

  $(document).on('click', 'button#next', function() { nextImg(); });

  $(document).on('click', 'button#previous', function() {
    // Hack:
    nextImg();
    nextImg();
  });

  $(document).on('click', '#carousel-tracker-btn-1', function() {
    changeImg(0);
    changeTracker(0);
    imgInd = 0;
  });

  $(document).on('click', '#carousel-tracker-btn-2', function() {
    changeImg(1);
    changeTracker(1);
    imgInd = 1;    
  });

  $(document).on('click', '#carousel-tracker-btn-3', function() {
    changeImg(2);
    changeTracker(2);
    imgInd = 2;
  });

  // carousel.start(1000);
  var carouselIntervalID = setInterval(nextImg, 1000);
});
