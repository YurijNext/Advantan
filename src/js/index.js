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

  var mySwiper = new Swiper ('.slider-popup__container', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    swipe: true,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

  });

});
