jQuery( document ).ready(function($) {
  $('.menu-icon').click(function () {
      $('.nav-menu').slideToggle();
      $(this).fadeOut();
      $('.menu-close').fadeIn();
      $('body').addClass('overflow');
  });
       $('.menu-close').click(function () {
      $('.nav-menu').slideToggle();
          $('.ss-menu').delay(300).fadeOut(); 
           $('body').removeClass('overflow');
  });
      $('.ss-menu-close').click(function () {
          $('.ss-menu, .label-menu').slideUp();
           $('.nav-menu').hide();
      });
      
      $('.menu-close').click(function () {
          $(this).fadeOut();
          $('.menu-icon').fadeIn();
      });
      
      $('.mobile-search-icon').click(function () {
      $('.mobile-search').slideToggle();
  });
  
   $('.mobile-search-icon').click(function () {
      $('.mobile-search').slideToggle();
  });
      
       
  
  
     
      $('li.menu-item-has-children, li:not(.unwash-reviews) .sub-menu li:first-child').children('a').addClass('not-clickable');
      
      $('.not-clickable').removeAttr('href');

      $("<li>Back</li>").insertBefore('li.unwash-reviews .sub-menu li:first-child');
      $('li.unwash-reviews .sub-menu li:first-child').addClass('back-to-main');
      
 $('li.menu-item-has-children a').click(function () {
     $(this).next('.sub-menu').slideToggle();
 });

 $('li.ss-menu-link').click(function () {
     $('.ss-menu').slideToggle();
 });

 $('li.explore-menu-link').click(function () {
  $('.label-menu').slideToggle();
});

  $('li.back-to-main').click(function () {
     $('.sub-menu').slideToggle();
 });
      $('li.ss-back-to-main').click(function () {
     $('.ss-menu').slideToggle();
 });
 $('li.explore-back-to-main').click(function () {
  $('.label-menu').slideToggle();
});
    
$( ".in-post-shop .shop-btn" ).wrap( "<div class='shop-btn-wrapper'></div>" );
   
      
        
       $(window).scroll(function () {
      if ($(window).scrollTop() > 350) { 
          $('.site-header').addClass('shrink').fadeIn();
          $('.nav-menu').addClass('menu-shrink');
      }
      else{
          $('.site-header').removeClass('shrink');
          $('.nav-menu').removeClass('menu-shrink');
      }
  });
        
      

    

      
      $('.in-post-shop-slide').slick({
          slidesToShow:5,
          slidesToScroll: 1,
          arrows:false,
          infinite:false,
          responsive: [
            {
              breakpoint: 1025,
              settings: {
                slidesToShow: 3.5,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 769,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]
 
});
    
      
  
const swiper = new Swiper('.swiper', {
        
slidesPerView:"auto",
        spaceBetween: 110,
          freeMode: true,
    scrollbar: {
          el: ".swiper-scrollbar",
        }
       
  });

  var swiper2 = new Swiper('.home-shop-swiper', {
        
    slidesPerView:1.5,
    freeMode: true,
            spaceBetween: 35,
             
             
        scrollbar: {
              el: ".swiper-scrollbar",
            },
            breakpoints: {
                  
              640: {
                slidesPerView:5,
                spaceBetween: 35
              },                   
            }
           
      });

  var swiper3 = new Swiper('.ec-right', {
        
    slidesPerView:1.5,
            spaceBetween: 20,
              freeMode: true,
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
            scrollbar: {
                  el: ".swiper-scrollbar",
                },
                breakpoints: {
                  
                  640: {
                    slidesPerView:3,
                    spaceBetween: 35
                  },                   
                }
               
          });


        


$('.home-hero-posts').slick({
   autoplay: true,
autoplaySpeed: 6500,
   prevArrow:"<button type='button' class='slick-prev'></button>",
          nextArrow:"<button type='button' class='slick-next'></button>",
   responsive: [
  {
    breakpoint: 1024,
    settings: {
      arrows:false,
    }
  },
  {
    breakpoint: 480,
    settings: {
      arrows:false,
        dots:true,
      
    }
  }
 
]
  
});



});