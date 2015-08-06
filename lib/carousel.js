function Carousel (imgAry, speed) {
  this.currentTrackerSrc = 'lib/strawberry-icon.png';
  this.inactiveTrackerSrc = 'lib/user-online-icon.png';
  this.intervalID;
  this.imageArray = imgAry;
  this.$imageElement;
  this.imageIndex = 0;
  this.pauseHtml = "| |";
  this.playHtml  = ">";
  this.speed = speed;
  this.trackerArray = [];
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

  setImageElement: function ($imgElt) {
    this.$imageElement = $imgElt;
  },

  setImageSource: function (src) {
    this.$imageElement.setAttribute('src', src);
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

  $setPauseEvent: function (selector) {
    var carousel = this;

    $(document).on('click', selector, function () {
      clearInterval(carousel.intervalID);
      $(this).attr('id', 'play');
      $(this).html(carousel.playHtml);
    });
  },

  $setPlayEvent: function (selector) {
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

  $setPreviousEvent: function (selector) {
    var carousel = this;

    $(document).on('click', selector, function () {
      // FIXME Hack:
      carousel.nextImage();
      carousel.nextImage();
    });
  },

  setTrackerArray: function ($trackerParents) {
    this.trackerArray = [];

    for (var i=0; i<$trackerParents.length; i++) {
      this.trackerArray.push($trackerParents[i].children[0]);
    }
  },

  $setTrackerButtonEvents: function ($trackerBtns, selectorBase) {
    var carousel = this;

    // Browser-compatility issues:
    // https://developer.mozilla.org/en-US/docs/Web/API/NodeList#Why_can't_I_use_forEach_or_map_on_a_NodeList.3F
    [].forEach.call($trackerBtns, function (btn, ind) {
      $(document).on('click', selectorBase + '-' + (ind+1), function() {
        carousel.changeImage(ind);
        console.log(ind);
        carousel.changeTracker(ind);
        carousel.imageIndex = ind;   
      });
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
    ['lib/apples.jpeg',
     'lib/puppy.jpg',
     'lib/bonsai.jpg'],
     1000);

$(document).ready(function (){
  carousel.setImageElement($('#crntImg').get(0));
  carousel.$setPlayEvent('#play');
  carousel.$setPauseEvent('#pause');
  carousel.setNextEvent('#next');
  carousel.$setPreviousEvent('#previous');
  carousel.setTrackerArray($('div.carousel-tracker')[0].children);
  carousel.$setTrackerButtonEvents($('div.carousel-tracker')[0].children,
      '#carousel-tracker-btn');

  carousel.start();
});
