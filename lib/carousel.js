function Carousel (imgAry, speed) {
  var currentTrackerSrc = "http://icons.iconarchive.com/icons/fi3ur";
      currentTrackerSrc += "/fruitsalad/16/strawberry-icon.png";
  this.currentTrackerSrc = currentTrackerSrc;
  var inactiveTrackerSrc = "http://icons.iconarchive.com/icons";
      inactiveTrackerSrc += "/oxygen-icons.org/oxygen/16";
      inactiveTrackerSrc += "/Status-user-online-icon.png";
  this.inactiveTrackerSrc = inactiveTrackerSrc;
  this.intervalID;
  this.imageArray = imgAry;
  this.imageElement;
  this.imageIndex = 0;
  this.pauseHtml = "| |";
  this.playHtml  = ">";
  this.speed = speed;
  this.trackerArray;
}

Carousel.prototype = {
  constructor: Carousel,

  changeImage: function (newInd) {
    newInd = this.setNewInd(newInd);

    this.setImageSource(this.imageArray[newInd]);    
  },

  changeTracker: function (newInd) {
    newInd = this.setNewInd(newInd);
                      
    this.trackerArray[this.imageIndex].setAttribute("src",
        this.inactiveTrackerSrc);
    this.trackerArray[newInd].setAttribute("src",
        this.currentTrackerSrc);
  },

  nextImage: function () {
    this.changeImage();
    this.changeTracker();
    this.imageIndex++;

    if (this.imageIndex >= this.imageArray.length) {
      this.imageIndex = 0;
    }  
  },

  setImageElement: function (imgElt) {
    this.imageElement = imgElt;
  },

  setImageSource: function (src) {
    this.imageElement.setAttribute('src', src);
  },

  setNextEvent: function (selector) {
    var carousel = this;

    $(document).on('click', selector, function () {
      carousel.nextImage();
    });
  },


  setNewInd: function (newInd) {
    if (typeof newInd === 'undefined') { newInd = this.imageIndex + 1; }
    if (newInd >= this.imageArray.length) { newInd = 0; }
    
    return newInd;
  },

  setPauseEvent: function (selector) {
    var carousel = this;

    $(document).on('click', selector, function () {
      clearInterval(carousel.intervalID);
      $(this).attr('id', 'play');
      $(this).html(carousel.playHtml);
    });
  },

  setPlayEvent: function (selector) {
    var carousel = this;

    $(document).on('click', selector, function () {
      carousel.intervalID = setInterval(function () {
            carousel.nextImage();
          },
          carousel.speed);
      $(this).attr('id', 'pause');
      $(this).html(carousel.pauseHtml);
    });
  },

  setPreviousEvent: function (selector) {
    var carousel = this;

    $(document).on('click', selector, function () {
      // FIXME Hack:
      carousel.nextImage();
      carousel.nextImage();
    });
  },

  setTrackerArray: function (trackerParents) {
    this.trackerArray = [];

    for (var i=0; i<trackerParents.length; i++) {
      this.trackerArray.push(trackerParents[i].children[0]);
    }
  },

  setTrackerButtonEvents: function (trackerBtns) {
    var carousel = this;

    // Browser-compatility issues:
    // https://developer.mozilla.org/en-US/docs/Web/API/NodeList#Why_can't_I_use_forEach_or_map_on_a_NodeList.3F
    [].forEach.call(trackerBtns, function (btn, ind) {
      // FIXME Could pass in an ID base instead of hardcoding #carousel...
      $(document).on('click', '#carousel-tracker-btn-' + (ind+1),
          function() {
            carousel.changeImage(ind);
            console.log(ind);
            carousel.changeTracker(ind);
            carousel.imageIndex = ind;   
          }
      );
    });
  },

  start: function () {
    var carousel = this;

    this.intervalID = setInterval(function () {
          carousel.nextImage();
        },
        this.speed);
  }
}

var carousel = new Carousel(
    ["http://img.wikinut.com/img/gycf69_-6rv_5fol/jpeg/0/Best-Friends-Img-Src%3AImage%3A-FreeDigitalPhotos.net.jpeg",
     "http://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg",
     "https://upload.wikimedia.org/wikipedia/commons/f/ff/Bonsai_IMG_6404.jpg"],
     1000);

$(document).ready(function (){
  carousel.setImageElement($('#crntImg').get(0));
  carousel.setPlayEvent('#play');
  carousel.setPauseEvent('#pause');
  carousel.setNextEvent('#next');
  carousel.setPreviousEvent('#previous');
  carousel.setTrackerArray($('div.carousel-tracker')[0].children);
  carousel.setTrackerButtonEvents($('div.carousel-tracker')[0].children);

  carousel.start();
});
