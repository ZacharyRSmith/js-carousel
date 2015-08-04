  var imgAry = ["http://img.wikinut.com/img/gycf69_-6rv_5fol/jpeg/0/Best-Friends-Img-Src%3AImage%3A-FreeDigitalPhotos.net.jpeg",
                "http://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg",
                "https://upload.wikimedia.org/wikipedia/commons/f/ff/Bonsai_IMG_6404.jpg"];
                var imgInd = 0;
var pauseHTML = "| |";
var playHTML = ">";

function Carousel (imgAry) {
  this.imgAry = imgAry;
}

function changeImg(crntInd) {
  if (typeof crntInd === 'undefined') {
    crntInd = imgInd;
  }

    

      
  crntImg.setAttribute("src",imgAry[crntInd]);



}

function changeTracker(trackerAry) {
  var trackerAry = [document.getElementById("carousel-tracker-1"),
                    document.getElementById("carousel-tracker-2"),
                    document.getElementById("carousel-tracker-3")];
                    
  trackerAry[imgInd].setAttribute("src", "http://icons.iconarchive.com/icons/fi3ur/fruitsalad/16/strawberry-icon.png");

  if (imgInd === 0) {
    prevPosition = 2;
  } else {
    prevPosition = imgInd - 1;
  }

  trackerAry[prevPosition].setAttribute("src", "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/16/Status-user-online-icon.png");
}

function nextImg() {
  changeImg();
  changeTracker();
  imgInd++;
          if (imgInd >= imgAry.length) { imgInd = 0; }  
}

var carousel = new Carousel([
    "http://img.wikinut.com/img/gycf69_-6rv_5fol/jpeg/0/Best-Friends-Img-Src%3AImage%3A-FreeDigitalPhotos.net.jpeg",
    "http://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/f/ff/Bonsai_IMG_6404.jpg"]);

$(document).ready(function(){

  var crntImg = document.getElementById("crntImg");

  var carouselIntervalID = setInterval(nextImg, 1000);

  $(document).on('click', 'button#play', function() {
    carouselIntervalID = setInterval(nextImg, 1000);
    $(this).attr('id', 'pause');
    $(this).html(pauseHTML);
  });

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

  $(document).on('click', '#carousel-tracker-1', function() {
    changeImg(0);
  });

  $(document).on('click', '#carousel-tracker-2', function() {
    changeImg(1);
  });

  $(document).on('click', '#carousel-tracker-3', function() {
    changeImg(2);
  });
});
