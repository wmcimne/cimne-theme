/*

Menu pantalla de escritorio

*/

jQuery(function($){
  $(document).ready(function(){

    // Inserta los dropdowns creados a los items del menú primer nivel
    $('.dropdown-menu').each(function(i){
        
      i = i + 1;
      
      var $dropdown = $('.dropdown-menu-' + i);
      var $mainMenuItem = $('.first-level-' + i + '>a');
      $dropdown.insertAfter($mainMenuItem);
      
    });  
      
    // valores css de la barra de menú en función de si is home / is hover 
    const homeHoverParams = () => {
      $('#main-bar').css('background-color', '#004996');
    }
    const homeNoHoverParams = () => {
      $('#main-bar').css('position', 'relative');
      $('#main-bar').css('background-color', 'transparent');
      $('.et_pb_menu__logo img').attr('src', 'http://cimne.local/wp-content/uploads/2024/09/logo-blanco-cimne-web.png');
      $('#menu-main-right li a').css({ 'border-color': '#fff', 'color': '#fff' });
      $('.category-menu-right button.et_pb_menu__search-button').css({ 'border-color': '#fff', 'color': '#fff' });
    }
    const noHomeHoverParams = () => {
      $('#main-bar').css('background-color', '#004996');
      $('.category-menu-left li.first-level>a').css('color', '#fff');
      $('.et_pb_menu__logo img').attr('src', 'http://cimne.local/wp-content/uploads/2024/09/logo-blanco-cimne-web.png');
      $('#menu-main-right li a').css({ 'border-color': '#fff', 'color': '#fff' });
      $('.category-menu-right button.et_pb_menu__search-button').css({ 'border-color': '#fff', 'color': '#fff' });
    }
    const noHomeNoHoverParams = () => {
      $('#main-bar').css('background-color', '#fff');
      $('.category-menu-left li.first-level>a').css('color', '#004996');
      $('.et_pb_menu__logo img').attr('src', 'http://cimne.local/wp-content/uploads/2024/09/logo-color-cimne-web.png');
      $('#menu-main-right li a').css({ 'border-color': '#02A0A5', 'color': '#02A0A5' });
      $('.category-menu-right button.et_pb_menu__search-button').css({ 'border-color': '#004996', 'color': '#004996' });
    }

    // controla que valores css asignar a la barra de menú
    if ( $('body').hasClass('home') ) {

      homeNoHoverParams();
      $('#main-bar').hover(function () {

        console.log('HOME HOVER');
        homeHoverParams();
      }, function () {

        console.log('HOME NO HOVER');
        homeNoHoverParams();
      });

    }else{
      console.log(window.window.scrollY);
      $('#main-bar').hover(function () {

        console.log('NO HOME HOVER');
        noHomeHoverParams();
      }, function () {

        console.log('NO HOMVE NO HOVER');
        noHomeNoHoverParams();
      });
    }
      
    // Controla la ocultación de la barra superior del menú y la posición de los dropdowns al hacer scroll
    
    window.onscroll = function() {
        let currentScrollPos = window.window.scrollY;
        let topBarHeight = document.getElementById('top-bar').offsetHeight;
        const dropdowns = document.querySelectorAll('.dropdown-menu');
  
  
        if (currentScrollPos > topBarHeight) {
          document.getElementById('top-bar').style.display = 'none';
          document.getElementById('main-bar').style.top = '0px';
          for (let i = 0; i < dropdowns.length; i++) {
            dropdowns[i].style.top = '104px';
          }
        } else {
          document.getElementById('top-bar').style.display = 'block';
          document.getElementById('main-bar').style.top = '40px';
          for (let i = 0; i < dropdowns.length; i++) {
              dropdowns[i].style.top = '144px';
          }
        }

    }
  });
});

// Controla el megamenú

// jQuery(function($){
//     $(document).ready(function(){
    

//         $('.dropdown-menu').each(function(i){
        
//             i = i + 1;
            
//             var $dropdown = $('.dropdown-menu-' + i);
//             var $mainMenuItem = $('.first-level-' + i + '>a');
//             $dropdown.insertAfter($mainMenuItem);
            
//         });  
            
//         var $firstLevel = $('#menu-main li > a');
//         var $allDropdowns = $('.et-menu nav .dropdown-menu');

//         $('#menu-main').hover(function(){
//             $('#menu-main li > a').off('click');
//         });

//         $firstLevel.hover(function(){
//             $('.category-menu').css('background', '#004996');
//         },function(){
//             $('.category-menu').css('background-color', 'none');
//         });
       
//         $firstLevel.off('click').click(function() {

//             $(this).attr('href', '#');  
//             var $thisDropdown = $(this).siblings(); 

//             $thisDropdown.slideToggle();
//             $(this).toggleClass('icon-switch');

//             var dropdownSiblings = $allDropdowns.not($thisDropdown);   
//             dropdownSiblings.slideUp();

//             var $thisFirstLevel = $(this);
//             var $firstLevelSiblings = $firstLevel.not($thisFirstLevel);
//             $firstLevelSiblings.removeClass('icon-switch');  

//         });   
    
//     });
// });


/*

 Mobile menu

*/

jQuery(function($){
  $(document).ready(function() {

    // Obtén todos los elementos flecha de menú
    var  index, classNameList, arrowClassName, classText ;

    // Agrega un evento de clic a cada elemento de menú
    $('li[class*="-arrow-"]').click(function(event) {
      event.preventDefault();
      console.log(this);

      // Mantiene el menú 1er nivel visible
      $('.mobile_menu_bar').click();

      // Obtén el índice del elemento de menú clicado
      classNameList = $( this ).attr('class');
      arrowClassName = classNameList.split(' ');
      console.log(`classnamelist: ${classNameList} - arrowclassname: ${arrowClassName}`);
      for ( value of arrowClassName ) {
        if (value.includes('-arrow-')) { 
          classText = value.split('-');
          index = classText[classText.length - 1];
        }
      }

      // Muestra la pestaña con efecto desplazamiento lateral correspondiente al índice del elemento de menú clicado
      $('.content-tab').eq(index).animate({ left: "0px", top: "80px"});
    });

    // Oculta el submenú con efecto desplazamiento lateral
    $('.submenu-arrow').click(function() {
      $('.content-tab').eq(index).animate({ left: "1000px", top: "80px"});
    });
    $('.mobile_menu_bar').click(function() {
      $('.content-tab').eq(index).animate({ left: "1000px", top: "80px"});
    });

    // método que dispa un evento cuando se cambia la clase de un elemento usando jQuery
    $.fn.onClassChange = function (cb) {
      return $(this).each((_, el) => {
        new MutationObserver(mutations => {
          mutations.forEach(mutation => cb && cb(mutation.target, mutation.target.className));
        }).observe(el, {
          attributes: true,
          attributeFilter: ['class'] // solo escucha para cambios del atributo 'class'
        });
      });
    }

    // uso en el elemento de menú cuando cambia la clase opened/closed
    // se cambian propiedades css en la barra superior del menú
    $(".mobile_nav").onClassChange((el, newClass) => {


      if ( $('body').hasClass('home') ) {
        if (newClass.includes('opened')) {
          console.log(`.mobile_nav at homepage had its class updated to: ${newClass}`);

          $('.mobile-menu').css('position', 'fixed');
          $('#mobile-menu-container').css('background-color' , '#004996');
          $('.et_pb_menu__logo img').attr('src', 'http://cimne.local/wp-content/uploads/2024/09/logo-blanco-cimne-web.png');
          $('.et_pb_fullwidth_menu_0_tb_header .et_pb_menu__icon.et_pb_menu__search-button').css('color', '#fff');
          $('.mobile-menu button.et_pb_menu__search-button ').css('border', '#fff solid 1px');
          $('.mobile_nav.opened .mobile_menu_bar::before').css('color', '#fff');
          $('#page-container .mobile-menu').css('background-color' , '#004996');       
        }else {
          console.log(`.mobile_nav at homepage had its class updated to: ${newClass}`);

          $('.mobile-menu').css('position', 'relative');
          $('#mobile-menu-container').css('background-color' , 'transparent');
          $('#page-container .mobile-menu').css('background-color' , 'transparent');
        }
      }else{
        if (newClass.includes('opened')) {
          console.log(`.mobile_nav had its class updated to: ${newClass}`);

          $('.et_pb_menu__logo img').attr('src', 'http://cimne.local/wp-content/uploads/2024/09/logo-blanco-cimne-web.png');
          $('.et_pb_fullwidth_menu_0_tb_header .et_pb_menu__icon.et_pb_menu__search-button').css('color', '#fff');
          $('.mobile-menu button.et_pb_menu__search-button ').css('border', '#fff solid 1px');
          $('.mobile_nav.opened .mobile_menu_bar::before').css('color', '#fff');
          $('#page-container .mobile-menu').css('background-color' , '#004996');       
        }else {
          console.log(`.mobile_nav had its class updated to: ${newClass}`);

          $('.et_pb_menu__logo img').attr('src', 'http://cimne.local/wp-content/uploads/2024/09/logo-color-cimne-web.png');
          $('.et_pb_fullwidth_menu_0_tb_header .et_pb_menu__icon.et_pb_menu__search-button').css('color', '#004996');
          $('.mobile-menu button.et_pb_menu__search-button ').css('border', '#004996 solid 1px');
          $('#page-container .mobile-menu').css('background-color' , '#fff');
        }
      }
    });
  });
});



