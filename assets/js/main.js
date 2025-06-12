/*================================================
Template name: Restfast - HTML Template
Version: 1.0.0
Author: Website_Stock 
Author url: https://themeforest.net/user/website_stock

[ Table of Contents ]

01: country select dropdown menu
02: main js
  2.1: progressbar
  2.2: sticky header activation
  2.3: Back to top button
  2.4: Swiper slider
    2.4.1: Slider 1
    2.4.2: Slider 2
    2.4.3: Slider 3
  2.5: Wow js
  2.6: Video play
  2.7: Preloader
  2.8: Counter up
  2.9: Title animation
  2.10: Responsive animation
  2.11: Grow animation
  2.12: Collapse
  2.13: Image slide
  2.14: Image parallax
  2.15: Side menu desktop
  2.16: Responsive menu
  2.17: Accordion

==================================================*/

/*================================================
01: country select dropdown menu
==================================================*/
$(document).ready(function () {
  function countryDropdown(selector) {
    var Selected = $(selector);
    var Drop = $(selector + "-drop");
    var DropItem = Drop.find("li");

    // Preselect a country (for example, Afghanistan)
    var initialCountry = Drop.find('li[data-code="AF"]');
    Selected.html(initialCountry.html());

    Selected.click(function () {
      Selected.toggleClass("open");
      Drop.toggle();
    });

    Drop.find("li").click(function () {
      Selected.removeClass("open");
      Drop.hide();

      var item = $(this);
      Selected.html(item.html());
    });

    DropItem.each(function () {
      var code = $(this).attr("data-code");

      if (code != undefined) {
        var countryCode = code.toLowerCase();
        $(this)
          .find("i")
          .addClass("flagstrap-" + countryCode);
      }
    });
    // Close the dropdown when clicking outside of it
    $(document).click(function (event) {
      if (
        !Selected.is(event.target) &&
        Selected.has(event.target).length === 0 &&
        !Drop.is(event.target) &&
        Drop.has(event.target).length === 0
      ) {
        Selected.removeClass("open");
        Drop.hide();
      }
    });
  }

  countryDropdown("#country");
  countryDropdown("#currency");
  countryDropdown("#home");

  // date picker
  $("#datepicker").datepicker({
    dateFormat: "dd-mm-yy",
    duration: "fast"
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var currentYear = new Date().getFullYear();
  document.getElementById("year").textContent = currentYear;
});

var $btn = $(".btn"),
  $btnInk = $btn.find(".btn__ink");

// set $btnInk diameter
if (!$btnInk.height() && !$btnInk.width()) {
  var d = Math.max($btn.outerWidth(), $btn.outerHeight());
  $btnInk.css({ height: d, width: d });
}

$btn.on("mouseenter", function (e) {
  var $rippler = $(this),
    $ink = $(this).find(".btn__ink");

  $ink.removeClass("btn__ink--active");

  // get coordinates
  var x = e.pageX - $rippler.offset().left - $ink.width() / 2;
  var y = e.pageY - $rippler.offset().top - $ink.height() / 2;

  // set $ink position and add class .animate
  $ink
    .css({
      top: y + "px",
      left: x + "px"
    })
    .addClass("btn__ink--active");
});

$btn.on("mouseleave", function (e) {
  var $rippler = $(this),
    $ink = $(this).find(".btn__ink");

  // get coordinates
  var x = e.pageX - $rippler.offset().left - $ink.width() / 2;
  var y = e.pageY - $rippler.offset().top - $ink.height() / 2;

  // set $ink position and add class
  $ink
    .css({
      top: y + "px",
      left: x + "px"
    })
    .removeClass("btn__ink--active");
});
/*================================================
  02: main js
  ==================================================*/

(function ($) {
  "use strict";

  // Ensure jQuery is loaded and available
  if (typeof $ === "undefined") {
    console.error("jQuery is not loaded.");
    return;
  }

  let device_width = window.innerWidth;
  $.exists = function (selector) {
    return $(selector).length > 0;
  };

  gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

  var rtsJs = {
    m: function (e) {
      rtsJs.d();
      rtsJs.methods();
    },
    d: function (e) {
      (this._window = $(window)),
        (this._document = $(document)),
        (this._body = $("body")),
        (this._html = $("html"));
    },
    methods: function (e) {
      rtsJs.stickyHeader();
      rtsJs.swiperActivation();
      rtsJs.wowActive();
      rtsJs.videoActivation();
      rtsJs.counterUp();
      rtsJs.title_animation();
      rtsJs.skew_up();
      rtsJs.gsapAnimationImageScale();
      rtsJs.feedbackCollupsShow();
      rtsJs.imageSlideGsap();
      rtsJs.imageParalax();
      rtsJs.sideMenu();
      rtsJs.metismenu();
      rtsJs.preloader();
      rtsJs.backToTopInit();
      rtsJs.circleAnimation();
      rtsJs.progressbar();
      rtsJs.toggleSocialLinks();
      rtsJs.initFadeInAnimation();
    },

    /*================================================
  2.1: progressbar
  ==================================================*/

    progressbar: function (e) {
      const progressBars = document.querySelectorAll(".progress-bar");

      function animateProgressBar(progressBar) {
        const percentage = progressBar.getAttribute("data-percentage");
        const progressContent = progressBar.querySelector(".progress-content");
        const progressNumberMark = progressBar.querySelector(
          ".progress-number-mark"
        );
        const percentText = progressNumberMark.querySelector(".percent");

        // Animate the width of the progress bar
        gsap.to(progressContent, {
          width: percentage,
          duration: 2
        });

        // Animate the position and text of the number mark
        gsap.to(progressNumberMark, {
          left: percentage,
          duration: 2,
          onUpdate: function () {
            const currentWidth = gsap.getProperty(progressContent, "width");
            const totalWidth = gsap.getProperty(progressBar, "width");
            const progress = Math.round((currentWidth / totalWidth) * 100);
            percentText.innerHTML = progress + "%";
          }
        });

        // Ensure the progress number mark is visible
        progressNumberMark.classList.remove("hidden");
      }

      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateProgressBar(entry.target);
              observer.unobserve(entry.target); // Optional: Stop observing once animated
            }
          });
        },
        { threshold: 0.5 }
      );

      progressBars.forEach((progressBar) => {
        observer.observe(progressBar);
      });
    },

    /*================================================
  2.2: sticky header activation
  ==================================================*/

    stickyHeader: function (e) {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
          $(".header--sticky").addClass("sticky");
        } else {
          $(".header--sticky").removeClass("sticky");
        }
      });
    },

    /*================================================
  2.3: Back to top button
  ==================================================*/

    backToTopInit: function () {
      $(document).ready(function () {
        "use strict";

        var progressPath = document.querySelector(".progress-wrap path");

        var pathLength = progressPath.getTotalLength();

        progressPath.style.transition = progressPath.style.WebkitTransition =
          "none";
        progressPath.style.strokeDasharray = pathLength + " " + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition =
          "stroke-dashoffset 10ms linear";
        var updateProgress = function () {
          var scroll = $(window).scrollTop();
          var height = $(document).height() - $(window).height();
          var progress = pathLength - (scroll * pathLength) / height;
          progressPath.style.strokeDashoffset = progress;
        };
        updateProgress();
        $(window).scroll(updateProgress);
        var offset = 50;
        var duration = 550;
        jQuery(window).on("scroll", function () {
          if (jQuery(this).scrollTop() > offset) {
            jQuery(".progress-wrap").addClass("active-progress");
            jQuery(".rts-switcher").addClass("btt__visible");
          } else {
            jQuery(".progress-wrap").removeClass("active-progress");
            jQuery(".rts-switcher").removeClass("btt__visible");
          }
        });
        jQuery(".progress-wrap").on("click", function (event) {
          event.preventDefault();
          jQuery("html, body").animate({ scrollTop: 0 }, duration);
          return false;
        });
      });

      $(document).ready(function () {
        "use strict";

        var progressPath = document.querySelector(".progress-wrap2 path");

        var pathLength = progressPath.getTotalLength();

        progressPath.style.transition = progressPath.style.WebkitTransition =
          "none";
        progressPath.style.strokeDasharray = pathLength + " " + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition =
          "stroke-dashoffset 10ms linear";
        var updateProgress = function () {
          var scroll = $(window).scrollTop();
          var height = $(document).height() - $(window).height();
          var progress = pathLength - (scroll * pathLength) / height;
          progressPath.style.strokeDashoffset = progress;
        };
        updateProgress();
        $(window).scroll(updateProgress);
        var offset = 50;
        var duration = 550;
        jQuery(window).on("scroll", function () {
          if (jQuery(this).scrollTop() > offset) {
            jQuery(".progress-wrap2").addClass("active-progress");
            jQuery(".rts-switcher").addClass("btt__visible");
          } else {
            jQuery(".progress-wrap2").removeClass("active-progress");
            jQuery(".rts-switcher").removeClass("btt__visible");
          }
        });
        jQuery(".progress-wrap2").on("click", function (event) {
          event.preventDefault();
          jQuery("html, body").animate({ scrollTop: 0 }, duration);
          return false;
        });
      });
    },

    /*================================================
  2.4: Swiper slider
  ==================================================*/
    // 2.4.1: Slider 1
    swiperActivation: function () {
      // 2.4.3: Slider 3
      $(document).ready(function () {
        var swiper = new Swiper(".banner-slider", {
          slidesPerView: 1,
          spaceBetween: 20,
          pagination: {
            el: ".swiper-pagination",
            clickable: true
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          },
          loop: true,
          autoplay: {
            delay: 2500,
            disableOnInteraction: true
          }
        });
      });

      // 2.4.3: Slider 3
      $(document).ready(function () {
        var swiper = new Swiper(".testimonial", {
          slidesPerView: 1,
          spaceBetween: 20,
          pagination: {
            el: ".swiper-pagination",
            clickable: true
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          },
          loop: true,
          autoplay: false,
          // autoplay: {
          //   delay: 2500,
          //   disableOnInteraction: true
          // },
          breakpoints: {
            1200: {
              slidesPerView: 1
            },
            900: {
              slidesPerView: 1
            },
            768: {
              slidesPerView: 1
            },
            580: {
              slidesPerView: 1
            },
            0: {
              slidesPerView: 1
            }
          }
        });
      });

      // 2.4.3: Slider 4
      $(document).ready(function () {
        // customer-feedback
        var swiper = new Swiper(".customer-feedback", {
          slidesPerView: 2,
          spaceBetween: 26,
          loop: true,
          autoplay: false,
          // autoplay: {
          //   delay: 2500,
          //   disableOnInteraction: true
          // },
          on: {
            init: function () {
              addReverseClass();
            },
            slideChange: function () {
              addReverseClass();
            }
          },
          breakpoints: {
            1200: {
              slidesPerView: 2
            },
            900: {
              slidesPerView: 2
            },
            768: {
              slidesPerView: 1
            },
            580: {
              slidesPerView: 1
            },
            0: {
              slidesPerView: 1
            }
          }
        });
        function addReverseClass() {
          var slides = document.querySelectorAll(
            ".customer-feedback .swiper-slide"
          );
          slides.forEach((slide, index) => {
            if (index % 2 !== 0) {
              slide.classList.add("reverse-layout");
            } else {
              slide.classList.remove("reverse-layout");
            }
          });
        }
      });

      // 2.4.4: Slider 5
      $(document).ready(function () {
        var swiper = new Swiper(".customer-feedback2", {
          slidesPerView: 3,
          spaceBetween: 26,
          loop: true,
          autoplay: {
            delay: 2500,
            disableOnInteraction: true
          },
          breakpoints: {
            1200: {
              slidesPerView: 3
            },
            900: {
              slidesPerView: 3
            },
            768: {
              slidesPerView: 2
            },
            580: {
              slidesPerView: 1
            },
            0: {
              slidesPerView: 1
            }
          }
        });
      });

      // marquee-slider
      $(document).ready(function () {
        var swiper = new Swiper(".marquee-slider", {
          spaceBetween: 0,
          centeredSlides: true,
          speed: 6000,
          autoplay: {
            delay: 1
          },
          loop: true,
          slidesPerView: "auto",
          allowTouchMove: false,
          disableOnInteraction: true
        });
      });
    },

    /*================================================
  2.5: Wow js
  ==================================================*/
    wowActive: function () {
      new WOW().init();
    },

    /*================================================
  2.6: Video play
  ==================================================*/
    videoActivation: function (e) {
      $(document).ready(function () {
        $(".popup-youtube, .popup-video").magnificPopup({
          disableOn: 700,
          type: "iframe",
          mainClass: "mfp-fade",
          removalDelay: 160,
          preloader: false,
          fixedContentPos: false
        });
      });
    },

    /*================================================
  2.7: Preloader
  ==================================================*/
    preloader: function () {
      $(window).on("load", function () {
        $(".loader-wrapper").fadeOut();
      });
    },

    /*================================================
  2.8: Counter up
  ==================================================*/
    counterUp: function (e) {
      $(".counter").counterUp({
        delay: 10,
        time: 1000
      });
      $(".counter").addClass("animated fadeInDownBig");
      $("h3").addClass("animated fadeIn");
    },

    /*================================================
  2.9: Title animation
  ==================================================*/
    title_animation: function () {
      gsap.registerPlugin(ScrollTrigger);
      gsap.registerPlugin(SplitText);
      if (window.innerWidth > 768) {
        $(document).ready(function () {
          let addAnimation = function () {
            $(".split-collab").each(function (index) {
              const textInstance = $(this);
              const text = new SplitText(textInstance, {
                type: "chars"
              });

              let letters = text.chars;

              let tl = gsap.timeline({
                scrollTrigger: {
                  trigger: textInstance,
                  start: "top 85%",
                  end: "top 85%",
                  onComplete: function () {
                    textInstance.removeClass(".split-collab");
                  }
                }
              });

              tl.set(textInstance, { opacity: 1 }).from(letters, {
                duration: 0.5,
                autoAlpha: 0,
                x: 50,
                scaleY: 0,
                skewX: 50,
                stagger: { amount: 1 },
                ease: "back.out(1)"
              });
            });
          };

          addAnimation();

          window.addEventListener("resize", function (event) {
            if ($(window).width() >= 992) {
              addAnimation();
            }
          });
        });
      }
    },

    /*================================================
  2.10: Responsive animation
  ==================================================*/
    skew_up: function () {
      gsap.registerPlugin(SplitText);
      if (window.innerWidth > 768) {
        $(document).ready(function () {
          let addAnimation = function () {
            $(".skew-up").each(function (index) {
              const text = new SplitType($(this), {
                types: "lines, words",
                lineClass: "word-line"
              });
              let textInstance = $(this);
              let line = textInstance.find(".word-line");
              let word = line.find(".word");
              let tl = gsap.timeline({
                scrollTrigger: {
                  trigger: textInstance,
                  start: "top 85%",
                  end: "top 85%",
                  onComplete: function () {
                    $(textInstance).removeClass("skew-up");
                  }
                }
              });
              tl.set(textInstance, { opacity: 1 }).from(word, {
                y: "100%",
                skewX: "-5",
                duration: 2,
                stagger: 0.09,
                ease: "expo.out"
              });
            });
          };
          addAnimation();
          window.addEventListener("resize", function (event) {
            if ($(window).width() >= 992) {
              addAnimation();
            }
          });
        });
      }

      if (window.innerWidth > 768) {
        $(document).ready(function () {
          let addAnimation = function () {
            $(".skew-up-2").each(function (index) {
              const textInstance = $(this);
              const text = new SplitText(textInstance, {
                type: "chars"
              });

              let letters = text.chars;

              let tl = gsap.timeline({
                scrollTrigger: {
                  trigger: textInstance,
                  start: "top 85%",
                  end: "top 85%",
                  onComplete: function () {
                    textInstance.removeClass("skew-up-2");
                  }
                }
              });

              tl.set(textInstance, { opacity: 1 }).from(letters, {
                duration: 0.4,
                autoAlpha: 0,
                y: 50,
                // scaleX: 0,
                // skewX: 50,
                stagger: { amount: 1 },
                ease: "back.out(0)"
              });
            });
          };

          addAnimation();

          window.addEventListener("resize", function (event) {
            if ($(window).width() >= 992) {
              addAnimation();
            }
          });
        });
      }
    },

    /*================================================
  2.11: Grow animation
  ==================================================*/
    gsapAnimationImageScale: function (e) {
      $(document).ready(function () {
        let growActive = document.getElementsByClassName("grow");
        if (growActive.length) {
          const growTl = gsap.timeline({
            scrollTrigger: {
              trigger: ".grow",
              scrub: 1,
              start: "top center",
              end: "+=1000",
              ease: "power1.out"
            }
          });
          growTl.to(".grow", {
            duration: 1,
            scale: 1
          });
        }
      });
    },

    /*================================================
  2.12: Collapse
  ==================================================*/
    feedbackCollupsShow: function () {
      // feedback button click show start
      document.addEventListener("DOMContentLoaded", function () {
        var rtsBtn = document.querySelector(".button-area-box-shadow .rts-btn");
        var overlaySection = document.querySelector(".overlay-bottom-section");
        var isToggled = false;

        if (rtsBtn && overlaySection) {
          rtsBtn.addEventListener("click", function () {
            if (!isToggled) {
              // Change margin of .rts-btn
              rtsBtn.style.margin = "0px auto 0 auto";
              rtsBtn.innerHTML = "View less feedbacks";
              // Remove the overlay-bottom-section class
              overlaySection.classList.remove("overlay-bottom-section");
            } else {
              // Revert margin of .rts-btn
              rtsBtn.style.margin = "";
              rtsBtn.innerHTML = "View all feedbacks";

              // Add the overlay-bottom-section class back
              overlaySection.classList.add("overlay-bottom-section");
            }

            // Toggle the state
            isToggled = !isToggled;
          });
        }
      });
      // feedback button click show End
    },

    /*================================================
  2.13: Image slide
  ==================================================*/
    imageSlideGsap: function () {
      gsap.to(".images", {
        scrollTrigger: {
          // trigger: ".images",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
          // markers: true
        },
        x: 330
      });
      gsap.to(".images-2", {
        scrollTrigger: {
          // trigger: ".images",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
          // markers: truesw
        },
        y: 330
      });
    },

    /*================================================
  2.14: Image parallax
  ==================================================*/
    imageParalax: function () {
      $(document).ready(function () {
        let paralax = document.getElementsByClassName("anim-image-parallax");
        if (paralax.length) {
          $(".anim-image-parallax").each(function () {
            // Add wrap <div>.
            $(this).wrap(
              '<div class="anim-image-parallax-wrap"><div class="anim-image-parallax-inner"></div></div>'
            );

            // Add overflow hidden.
            $(".anim-image-parallax-wrap").css({
              overflow: "hidden"
            });

            var $animImageParallax = $(this);
            var $aipWrap = $animImageParallax.parents(
              ".anim-image-parallax-wrap"
            );
            var $aipInner = $aipWrap.find(".anim-image-parallax-inner");

            // Parallax
            gsap.to($animImageParallax, {
              yPercent: 80,
              ease: "none",
              scrollTrigger: {
                trigger: $aipWrap,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                markers: false
              }
            });

            // Zoom in
            let tl_aipZoomIn = gsap.timeline({
              scrollTrigger: {
                trigger: $aipWrap,
                start: "top 90%",
                markers: false
              }
            });
            tl_aipZoomIn.from($aipInner, {
              duration: 1.5,
              autoAlpha: 0,
              scale: 1.4,
              ease: Power2.easeOut,
              clearProps: "all"
            });
          });
        }
      });

      $(document).ready(function () {
        let paralax = document.getElementsByClassName("anim-image-parallax-2");
        if (paralax.length) {
          $(".anim-image-parallax-2").each(function () {
            // Add wrap <div>.
            $(this).wrap(
              '<div class="anim-image-parallax-wrap"><div class="anim-image-parallax-inner"></div></div>'
            );

            // Add overflow hidden.
            $(".anim-image-parallax-wrap").css({
              overflow: "hidden"
            });
            var $animImageParallax = $(this);
            var $aipWrap = $animImageParallax.parents(
              ".anim-image-parallax-wrap"
            );
            var $aipInner = $aipWrap.find(".anim-image-parallax-inner");

            // Parallax
            gsap.to($animImageParallax, {
              yPercent: 20,
              ease: "none",
              scrollTrigger: {
                trigger: $aipWrap,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                markers: false
              }
            });

            // Zoom in
            let tl_aipZoomIn = gsap.timeline({
              scrollTrigger: {
                trigger: $aipWrap,
                start: "top 90%",
                markers: false
              }
            });
            tl_aipZoomIn.from($aipInner, {
              duration: 1.5,
              autoAlpha: 0,
              scale: 1.4,
              ease: Power2.easeOut,
              clearProps: "all"
            });
          });
        }
      });
    },

    /*================================================
  2.15: Side menu desktop
  ==================================================*/
    // side menu desktop
    sideMenu: function () {
      $(document).on("click", "#menu-btn", function () {
        $("#side-bar").addClass("show");
        $("#anywhere-home").addClass("bgshow");
      });
      $(document).on("click", ".close-icon-menu", function () {
        $("#side-bar").removeClass("show");
        $("#anywhere-home").removeClass("bgshow");
      });
      $(document).on("click", "#anywhere-home", function () {
        $("#side-bar").removeClass("show");
        $("#anywhere-home").removeClass("bgshow");
      });
      $(document).on("click", ".onepage .mainmenu li a", function () {
        $("#side-bar").removeClass("show");
        $("#anywhere-home").removeClass("bgshow");
      });
    },

    /*================================================
  2.16: Responsive menu
  ==================================================*/
    metismenu: function () {
      $("#mobile-menu-active").metisMenu();
    },

    // circle animation
    circleAnimation: function () {
      gsap.config({ trialWarn: false });
      console.clear();

      const target = document.querySelector("#dotted");

      const tl = gsap.from(target, {
        strokeDashoffset: 300,
        repeat: -1,
        ease: "none",
        duration: 5
      });
    },

    // toggleSocialLinks

    toggleSocialLinks: function () {
      const buttons = document.querySelectorAll(".toggle-button");
      let activeButton = null;
      let activeTimeline = null;

      buttons.forEach((button) => {
        const socialLinks = button
          .closest(".social-link-wrapper")
          .querySelector(".social-links");
        const socialIcons = socialLinks.querySelectorAll("li");
        const sharePanelIcons = button;

        const tl = gsap.timeline({ paused: true });

        gsap.defaults({ ease: "back.inOut" });

        tl.to(socialLinks, {
          duration: 0.5,
          scale: 0,
          transformOrigin: "50% 50%"
        })
          .to(
            sharePanelIcons,
            {
              duration: 0.5,
              transformOrigin: "50% 50%",
              scale: 1,
              rotation: 45,
              y: 0,
              x: 0
            },
            0.1
          )
          .to(
            sharePanelIcons,
            {
              duration: 0.5,
              transformOrigin: "50% 50%",
              scale: 1,
              rotation: -45,
              y: -0,
              x: 0
            },
            0.1
          )
          .fromTo(
            socialLinks,
            { scaleX: 0 },
            {
              duration: 0.5,
              transformOrigin: "100% 50%",
              scaleX: 1,
              ease: "circ.inOut"
            },
            0.1
          )
          .fromTo(
            socialLinks,
            { scaleY: 0.8, x: -10 },
            {
              duration: 0.4,
              transformOrigin: "50% 50%",
              scaleY: 1,
              x: 0,
              ease: "circ.inOut"
            },
            0.1
          )
          .staggerFromTo(
            socialIcons,
            0.1,
            { opacity: 0, x: 10 },
            { opacity: 1, x: 0 },
            -0.05
          );

        button.addEventListener("click", function () {
          if (activeButton && activeButton !== this) {
            activeTimeline.reverse();
            activeButton.classList.remove("toggled");
            activeButton
              .closest(".social-link-wrapper")
              .querySelector(".social-links")
              .classList.add("hidden");
          }

          if (this.classList.contains("toggled")) {
            tl.reverse();
          } else {
            tl.play();
          }

          this.classList.toggle("toggled");
          socialLinks.classList.toggle("hidden");

          activeButton = this.classList.contains("toggled") ? this : null;
          activeTimeline = tl;
        });
      });
    },

    // initFadeInAnimation

    initFadeInAnimation: function () {
      const fadeElements = document.querySelectorAll(".fade-in");
      fadeElements.forEach((element) => {
        gsap.set(element, { opacity: 0, y: 100, duration: 1 }); // Set initial opacity to 0

        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 80%",
            toggleActions: "play none none reverse"
          }
        });
      });
    }
  };

  rtsJs.m();

  /*================================================
  2.17: Accordion
  ==================================================*/
  $(document).ready(function () {
    // Listen for the collapse show event
    $(".working-process-accordion-one .accordion-collapse").on(
      "show.bs.collapse",
      function () {
        // Find the parent .accordion-item and add the 'show' class
        $(this).closest(".accordion-item").addClass("show");
      }
    );

    // Listen for the collapse hide event
    $(".working-process-accordion-one .accordion-collapse").on(
      "hide.bs.collapse",
      function () {
        // Find the parent .accordion-item and remove the 'show' class
        $(this).closest(".accordion-item").removeClass("show");
      }
    );
    // THEME MODE SWITCHER JS
    var rts_light = $(".rts-dark-light");
    if (rts_light.length) {
      var toggle = document.getElementById("rts-data-toggle");
      var storedTheme =
        localStorage.getItem("fluxi-theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light");
      if (storedTheme)
        document.documentElement.setAttribute("data-theme", storedTheme);
      toggle.onclick = function () {
        var currentTheme = document.documentElement.getAttribute("data-theme");
        var targetTheme = "light";

        if (currentTheme === "light") {
          targetTheme = "dark";
        }
        document.documentElement.setAttribute("data-theme", targetTheme);
        localStorage.setItem("fluxi-theme", targetTheme);
      };
    }
  });
})(jQuery, window);

// search modal dialog
var authAnimation;

function openAuthModal() {
  authAnimation = gsap
    .timeline({ defaults: { ease: "power2.inOut" } })
    .to("#authOverlay", {
      scaleY: 0.01,
      x: 1,
      opacity: 1,
      display: "flex",
      duration: 0.4
    })
    .to("#authOverlay", {
      scaleY: 1,
      background: "rgba(255,255,255,0.16)",
      duration: 0.6
    })
    .to(
      "#authOverlay #second",
      { scaleY: 1, opacity: 1, duration: 0.6 },
      "-=0.4"
    )
    .to(
      "#authOverlay #third",
      { scaleY: 1, opacity: 1, duration: 0.4 },
      "-=0.2"
    )
    .to(
      "#authOverlay #fourth",
      {
        background: "rgba(255,255,255,0.3)",
        border: "1px solid rgba(255,255,255,0.3)",
        duration: 0.8
      },
      "-=0.4"
    );
}

function closeAuthModal() {
  authAnimation.reverse().timeScale(-1.6);
}
