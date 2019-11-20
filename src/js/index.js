$(document).ready(function () {
  /** Masked Input **/
  $('input[name=phone]').mask('+38(099) 999 99 99');

  /** Anchor link **/
  $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function (event) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function () {
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          }
        });
      }
    }

    $('.b-header__nav-link').not(this).removeClass('b-header__nav-link--active');
    $(this).addClass('b-header__nav-link--active');
  });

  /**Mobile menu**/
  let mobileMenu = (function() {
    const openBtn = $('.hamburger'),
          menu = $('.mobile-menu'),
          link = $('.mobile-menu__link');

    function toggleMenu() {
      openBtn.toggleClass('hamburger--collapse is-active header-hamburger--active');
      menu.toggleClass('mobile-menu--active');
    }

    openBtn.on('click', function(e) {
      e.preventDefault();
      toggleMenu();
    });

    link.on('click', function(e) {
      e.preventDefault();
      toggleMenu();
    })
  })();

  /**Modal**/

  $('.b-test__button').on('click', function(e) {
    e.preventDefault();
    $('.test-popup').fadeIn(100);
  });

  $('.test-popup__close').on('click', function(e) {
    e.preventDefault();
    $('.test-popup').fadeOut(100);
  });

  $('.show-video-popup').on('click', function(e) {
    e.preventDefault();
    console.log(123);
    $('.video-popup').fadeIn(100);
  });

  $('.video-popup__close').on('click', function(e) {
    e.preventDefault();

    $('.video-popup').fadeOut(100);
  });

  $('.b-videos__poster').on('click', function() {
    let src = $(this).data('src');
    console.log($('.b-videos__poster').data('src'));
    $('.video-popup').fadeIn(100);
    $('.video-popup__video').attr('src', src);
  });


  (function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('.b-header__nav-link').each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
        $('.b-header__nav-link').removeClass("b-header__nav-link--active"); //added to remove active class from all a elements
        currLink.addClass("b-header__nav-link--active");
      }
      else{
        currLink.removeClass("b-header__nav-link--active");
      }
    });
  })();



  /**Test**/
  let DOMStrings = {
    dotsList : '.js-dots-list',
    dotsItem : '.js-dot',
    dotsItemActive : '.dot-active',
    questionwrap : '.js-q-wrap',
    contentWrap : '.js-cnt-wrap',
    answerBtn : '.js-ans-btn',
    btn : '.test-popup__reply',
    continue: '.test-popup__continue',
    socials: '.test-socials'
  };

  let currentQuestion = 0;
  let dataLength;
  let answer;
  let allAnswers = 0;

  function getData(callback) {
    $.getJSON('./test.json', function(data) {
      callback(data);
    });
  }

  getData(initItem);

  function initItem(data) {
    appendDots(data);
    appendQuestion(data);
  }

  function appendDots(dataObj) {
    dataLength = dataObj.length;

    if($(DOMStrings.dotsList).is(':parent')) {
      currentQuestion += 1;
      $(DOMStrings.dotsItem).eq(currentQuestion).addClass('dot-active');
    } else {
      for (let i = 0; i < dataLength - 1; i++) {
        $(DOMStrings.dotsList).append('<li class="test-popup__dot js-dot"></li>');
      }
      $(DOMStrings.dotsItem).eq(0).addClass('dot-active');
    }
  }


  function appendQuestion(dataObj) {
    $(DOMStrings.questionwrap).empty();
    $(DOMStrings.questionwrap).append(dataObj[currentQuestion]['question']);
    $(DOMStrings.contentWrap).empty();
    $(DOMStrings.contentWrap).append(`<img src="${dataObj[currentQuestion]['img']}">`);
  }

  function viewConclusion() {
    $(DOMStrings.questionwrap).empty();
    $('.test-popup__header').css('min-height', '3.35714vw');
    $(DOMStrings.contentWrap).empty();
    $(DOMStrings.answerBtn).addClass('btn-hide');
    $(DOMStrings.continue).addClass('btn-hide');
    $(DOMStrings.socials).addClass('show-socials');

    $('.test-popup__content').prepend(`<span class="test-result">Ваш результат:</span>
                                        <span class="test-result-count"><strong>${allAnswers}<strong> правильных ответа из <strong>${dataLength - 1}<strong></span>`);

    function viewresulttext(dataObj) {
      if(allAnswers < 5) {
        $(DOMStrings.contentWrap).append(`<div class="result-text">${dataObj[dataLength-1]['totals'][2]}</div>`);
      } else if (allAnswers >= 5 && allAnswers <= 7) {
        $(DOMStrings.contentWrap).append(`<div class="result-text">${dataObj[dataLength-1]['totals'][1]}</div>`);
      } else if (allAnswers >= 8 && allAnswers <= 10) {
        $(DOMStrings.contentWrap).append(`<div class="result-text">${dataObj[dataLength-1]['totals'][0]}</div>`);
      }
    }

    getData(viewresulttext);
  }

  function checkAnswer(dataObj) {
    let correctTemplate = `
                          <div class="is-correct-wrap">
                            <span class="is-correct-title">Правильно</span>
                            <p class="is-correct-text">${dataObj[currentQuestion]['correctText']}</p>
                          </div>
                        `;

    let errorTemplate = `
                          <div class="is-correct-wrap">
                            <span class="is-error-title">Не верно</span>
                            <p class="is-correct-text">${dataObj[currentQuestion]['wrongText']}</p>
                          </div>
                        `;

    console.log(answer);

    if(answer == dataObj[currentQuestion]['answer']) {
      allAnswers += 1;
      $(DOMStrings.contentWrap).empty();
      $(DOMStrings.contentWrap).append(correctTemplate);
      $(DOMStrings.btn).addClass('btn-hide');
      $(DOMStrings.continue).addClass('btn-show');
    } else if(answer != dataObj[currentQuestion]['answer'] && answer != null) {
      $(DOMStrings.contentWrap).empty();
      $(DOMStrings.contentWrap).append(errorTemplate);
      $(DOMStrings.btn).addClass('btn-hide');
      $(DOMStrings.continue).addClass('btn-show');
    }

    answer = null;
    console.log(answer);

  }

  $(DOMStrings.answerBtn).on('click', function(e) {
    e.preventDefault();
    $(this).addClass('btn-active');
    $(DOMStrings.answerBtn).not(this).removeClass('btn-active');

    answer = $(this).data('status');
  });

  $(DOMStrings.btn).on('click', function(e) {
    e.preventDefault();
    getData(checkAnswer);
  });

  $(DOMStrings.continue).on('click', function(e) {
    if(currentQuestion + 1 === dataLength - 1) {
      viewConclusion();
    } else {
      e.preventDefault();
      $(DOMStrings.answerBtn).removeClass('btn-active');
      $(DOMStrings.btn).removeClass('btn-hide');
      $(DOMStrings.continue).removeClass('btn-show');
      getData(initItem);
    }

  });
























  var mySwiper = new Swiper ('.slider-popup__container', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    swipe: false,
    noSwiping: false,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

  });

});
