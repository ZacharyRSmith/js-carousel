  var imgAry = ["http://img.wikinut.com/img/gycf69_-6rv_5fol/jpeg/0/Best-Friends-Img-Src%3AImage%3A-FreeDigitalPhotos.net.jpeg",
                "http://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg",
                "https://upload.wikimedia.org/wikipedia/commons/f/ff/Bonsai_IMG_6404.jpg"];
                var imgInd = 0;

function nextImg() {
  carousel.changeImage();
  carousel.changeTracker();
  imgInd++;
          if (imgInd >= imgAry.length) { imgInd = 0; }  
}

function Carousel (imgAry, speed) {
  this.intervalID;
  this.imageArray = imgAry;
  this.imageElement;
  this.pauseHtml = "| |";
  this.playHtml  = ">";
  this.speed = speed;
}

Carousel.prototype = {
  constructor: Carousel,

  changeImage: function (newInd) {
    if (typeof newInd === 'undefined') { newInd = imgInd + 1; }
    if (newInd >= imgAry.length) { newInd = 0; }

    carousel.setImageSource(imgAry[newInd]);    
  },

  changeTracker: function (newInd) {
    if (typeof newInd === 'undefined') { newInd = imgInd + 1; }
    if (newInd >= imgAry.length) { newInd = 0; }

    var trackerAry = [document.getElementById("carousel-tracker-1"),
                      document.getElementById("carousel-tracker-2"),
                      document.getElementById("carousel-tracker-3")];
                      
    trackerAry[imgInd].setAttribute("src", "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/16/Status-user-online-icon.png");
    trackerAry[newInd].setAttribute("src", "http://icons.iconarchive.com/icons/fi3ur/fruitsalad/16/strawberry-icon.png");
  },

  setTrackerButtons: function () {
    var trackerBtns = $('div.carousel-tracker').get(0).children;
    var carousel = this;

    // Browser-compatility issues:
    // https://developer.mozilla.org/en-US/docs/Web/API/NodeList#Why_can't_I_use_forEach_or_map_on_a_NodeList.3F
    [].forEach.call(trackerBtns, function (btn, ind) {
      $(document).on('click', '#carousel-tracker-btn-' + (ind+1), function() {
        carousel.changeImage(ind);
        console.log(ind);
        carousel.changeTracker(ind);
        imgInd = ind;   
      });
    });
  },

  setImageElement: function (imgElt) {
    this.imageElement = imgElt;
  },

  setImageSource: function (src) {
    this.imageElement.setAttribute('src', src);
  },

  setNextEvent: function () {
    $(document).on('click', '#next', function() { nextImg(); });
  },

  setPauseEvent: function () {
    var carousel = this;

    $(document).on('click', '#pause', function() {
      clearInterval(carousel.intervalID);
      $(this).attr('id', 'play');
      $(this).html(carousel.playHtml);
    });
  },

  setPlayEvent: function () {
    var carousel = this;

    $(document).on('click', '#play', function() {
      carousel.intervalID = setInterval(nextImg, carousel.speed);
      $(this).attr('id', 'pause');
      $(this).html(carousel.pauseHtml);
    });
  },

  setPreviousEvent: function () {
    $(document).on('click', '#previous', function() {
      // FIXME Hack:
      nextImg();
      nextImg();
    });
  },

  start: function () {
    this.intervalID = setInterval(nextImg, this.speed);
  }
}

var carousel = new Carousel(
    ["http://img.wikinut.com/img/gycf69_-6rv_5fol/jpeg/0/Best-Friends-Img-Src%3AImage%3A-FreeDigitalPhotos.net.jpeg",
     "http://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg",
     "https://upload.wikimedia.org/wikipedia/commons/f/ff/Bonsai_IMG_6404.jpg"],
     1000);

$(document).ready(function(){
  carousel.setImageElement($('#crntImg').get(0));
  carousel.setPlayEvent();
  carousel.setPauseEvent();
  carousel.setNextEvent();
  carousel.setPreviousEvent();
  carousel.setTrackerButtons();

  carousel.start();
});
