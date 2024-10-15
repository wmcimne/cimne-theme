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
      

    // controla que valores css asignar a la barra de menú
    if ( $('body').hasClass('home') ) {
      homeNoHoverParams();
      $('#main-bar').hover( () => homeHoverParams() , () => homeNoHoverParams() );
    }else{
      console.log(window.scrollY);
      $('#main-bar').hover( () => noHomeHoverParams(), () => noHomeNoHoverParams() );
    }
    
    // Controla la ocultación de la barra superior del menú y la posición de los dropdowns al hacer scroll

 
    
    window.onscroll = function() {

      let el = document.querySelector('#top-bar');
      let coords = el.getBoundingClientRect();

      console.log("element top: " + coords.top);

      let dropdownsTopPosition = 144+coords.top +'px';

      console.log("dropdownsTopPosition: " + dropdownsTopPosition);

      let currentScrollPos = window.window.scrollY;
      let topBarHeight = document.getElementById('top-bar').offsetHeight;
      let submenuTabHeight = document.querySelector('.dropdown-menu').offsetHeight;
      console.log(submenuTabHeight);
      const dropdowns = document.querySelectorAll('.dropdown-menu');

      for (let i = 0; i < dropdowns.length; i++) {
        dropdowns[i].style.top = dropdownsTopPosition;
      }

      // if (currentScrollPos > topBarHeight) {
      //   document.getElementById('top-bar').style.display = 'none';
      //   document.getElementById('main-bar').style.top = '0px';
      //   for (let i = 0; i < dropdowns.length; i++) {
      //     dropdowns[i].style.top = '104px';
      //   }
      // } else {
      //   document.getElementById('top-bar').style.display = 'block';
      //   document.getElementById('main-bar').style.top = '40px';
      //   for (let i = 0; i < dropdowns.length; i++) {
      //       //dropdowns[i].style.top = '144px';
      //       dropdowns[i].style.top = dropdownsTopPosition;
      //   }
      // }
    }
  });
});

/*  Funciones Auxiliares:   */
// valores css de la barra de menú en función de si is home / is hover 
const homeHoverParams = () => {
  // $('body').css('overflow-y' , 'clip');
  console.log('HOME HOVER');
  $('#main-bar').css('background-color', '#004996');
}
const homeNoHoverParams = () => {
  // $('body').css('overflow-y' , 'scroll');
  console.log('HOME NO HOVER');
  $('#main-bar').css('position', 'relative');
  $('#main-bar').css('background-color', 'transparent');
  $('.et_pb_menu__logo img').attr('src', 'http://cimne.local/wp-content/uploads/2024/09/logo-blanco-cimne-web.png');
  $('#menu-main-right li a').css({ 'border-color': '#fff', 'color': '#fff' });
  $('.category-menu-right button.et_pb_menu__search-button').css({ 'border-color': '#fff', 'color': '#fff' });
}
const noHomeHoverParams = () => {
  
  console.log('NO HOME HOVER');
  $('#main-bar').css('background-color', '#004996');
  $('.category-menu-left li.first-level>a').css('color', '#fff');
  $('.et_pb_menu__logo img').attr('src', 'http://cimne.local/wp-content/uploads/2024/09/logo-blanco-cimne-web.png');
  $('#menu-main-right li a').css({ 'border-color': '#fff', 'color': '#fff' });
  $('.category-menu-right button.et_pb_menu__search-button').css({ 'border-color': '#fff', 'color': '#fff' });
}
const noHomeNoHoverParams = () => {
  console.log('NO HOME NO HOVER');
  $('#main-bar').css('background-color', '#fff');
  $('.category-menu-left li.first-level>a').css('color', '#004996');
  $('.et_pb_menu__logo img').attr('src', 'http://cimne.local/wp-content/uploads/2024/09/logo-color-cimne-web.png');
  $('#menu-main-right li a').css({ 'border-color': '#02A0A5', 'color': '#02A0A5' });
  $('.category-menu-right button.et_pb_menu__search-button').css({ 'border-color': '#004996', 'color': '#004996' });
}

const menuBarBeahavior = () => {
  
}

/*

 Mobile menu

*/

jQuery(function($){
  $(document).ready(function() {

    // Obtén todos los elementos flecha de menú
    let  index, classNameList, arrowClassName, classText;

    // Agrega un evento de clic a cada elemento de menú
    $('li[class*="-arrow-"]').click(function(event) {
      event.preventDefault(); // parece que hay dos clics en el mismo item de la lista y da un error de jq. Investigar como elimiar el click by default

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

    // Control del estado del elemento de menú cuando cambia la clase opened/closed
    $(".mobile_nav").onClassChange((el, newClass) => {

      let isHome = $('body').hasClass('home');
      let isOpened = newClass.includes('opened');

      (isHome && isOpened) ? isHomeIsOpen() : (isHome && !isOpened) ? isHomeIsNotOpen() : (!isHome && isOpened) ? isNotHomeIsOpen() : (!isHome && !isOpened) ? isNotHomeIsNotOpen() : null;
      
    });
  });
});

/*  Funciones Auxiliares:   */
// Update Mobile Menu Styles Features
 const isHomeIsOpen = () => {
  //console.log(`.mobile_nav at homepage had its class updated to: ${newClass}`);

    $('.mobile-menu').css('position', 'fixed');
    $('#mobile-menu-container').css('background-color' , '#004996');
    $('.et_pb_menu__logo img').attr('src', 'http://cimne.local/wp-content/uploads/2024/09/logo-blanco-cimne-web.png');
    $('.et_pb_fullwidth_menu_0_tb_header .et_pb_menu__icon.et_pb_menu__search-button').css('color', '#fff');
    $('.mobile-menu button.et_pb_menu__search-button ').css('border', '#fff solid 1px');
    $('.mobile_nav.opened .mobile_menu_bar::before').css('color', '#fff');
    $('#page-container .mobile-menu').css('background-color' , '#004996');
}
const isHomeIsNotOpen = () => {
  //console.log(`.mobile_nav at homepage had its class updated to: ${newClass}`);

    $('.mobile-menu').css('position', 'relative');
    $('#mobile-menu-container').css('background-color' , 'transparent');
    $('#page-container .mobile-menu').css('background-color' , 'transparent');
}
const isNotHomeIsOpen = () => {
  //console.log(`.mobile_nav had its class updated to: ${newClass}`);

    $('.et_pb_menu__logo img').attr('src', 'http://cimne.local/wp-content/uploads/2024/09/logo-blanco-cimne-web.png');
    $('.et_pb_fullwidth_menu_0_tb_header .et_pb_menu__icon.et_pb_menu__search-button').css('color', '#fff');
    $('.mobile-menu button.et_pb_menu__search-button ').css('border', '#fff solid 1px');
    $('.mobile_nav.opened .mobile_menu_bar::before').css('color', '#fff');
    $('#page-container .mobile-menu').css('background-color' , '#004996'); 
}
const isNotHomeIsNotOpen = () => {
  //console.log(`.mobile_nav had its class updated to: ${newClass}`);

    $('.et_pb_menu__logo img').attr('src', 'http://cimne.local/wp-content/uploads/2024/09/logo-color-cimne-web.png');
    $('.et_pb_fullwidth_menu_0_tb_header .et_pb_menu__icon.et_pb_menu__search-button').css('color', '#004996');
    $('.mobile-menu button.et_pb_menu__search-button ').css('border', '#004996 solid 1px');
    $('#page-container .mobile-menu').css('background-color' , '#fff');
}

/*

  Nav tabs: Controla un sistema de tabs en lugar de usar el módulo tabs de DIVI.

  xxx-nav-item-n: id of the item
  xxx-nav-tab-n: id of the tab

  Where:

  -xxx: name of the Nav tabs
  -nav-item: menu nav item
  -nav-tab: menu nav tab
  -n: number of the item/tab

*/
jQuery(document).ready(function($) {
  
  $('[id$="nav-item-1"]').addClass('nav-item-active');
  $('[id$="nav-tab-1"]').addClass('show-nav-tab');
  $('[id*="nav-tab"]').not('[id$="nav-tab-1"]').addClass('hide-nav-tab');

  $('[id*="nav-item"]').click(function() {

        console.log($(this));
        var selector=$(this).attr('id').replace('item', 'tab');
        var clusterSelect =$('#' + selector);
        var tabNameSelected = $(this).attr('id').slice(0, -7);
        console.log(tabNameSelected);
        
        $('[id*="'+tabNameSelected+'-tab"]').removeClass('show-nav-tab');
        $('[id*="'+tabNameSelected+'-tab"]').addClass('hide-nav-tab');
        clusterSelect.addClass('show-nav-tab');
        $('[id*="'+tabNameSelected+'-item"]').removeClass('nav-item-active');
        $(this).addClass('nav-item-active');

    })
});



/*

  Formas y efectos en imagenes

*/

jQuery(function($){
  $(document).ready(function() {

      !!document.querySelector('.img-square-container') ? addSquareFormToImg() : null;
      !!document.querySelector('#section-news') ? addRectangleFormToImg() : null;
  });
});

/*  Funciones Auxiliares:   */
const addRectangleFormToImg = () => {

  let container = document.querySelector('#section-news');
  let article = container.querySelectorAll('article');
  let category, image;

  console.log(article);

  article.forEach(function(element) {
    console.log(element);
    category = getStringInClassNameList(element, 'tag');
    console.log(category);
    image = element.querySelector('img');
    console.log(image);
    $(image).before('<div class="rectangle"><span class="rectangle-text">' + category +'</span></div>');
    
  });
}

const addSquareFormToImg = () => {
  $('.img-square-container.square-form-cross img').after('<img src="http://cimne.local/wp-content/uploads/2024/09/square-turquoise-cross-desktop.png" alt="square-cross-form" class="square-form-img">');
  $('.img-square-container.square-form-arrow-left.blue img').after('<img src="http://cimne.local/wp-content/uploads/2024/09/square-blue-arrow-right-desktop.png" alt="square-arrow-form" class="square-form-img">');
  $('.img-square-container.square-form-arrow-left.turquoise img').after('<img src="http://cimne.local/wp-content/uploads/2024/09/square-turquoise-arrow-right-desktop.png" alt="square-arrow-form" class="square-form-img">');

}

const getStringInClassNameList = (element, keyWord) => {

  let classNameList = element.className.split(' ');
  let catchedString = '';
  for ( value of classNameList ) {
    if (value.includes(keyWord)) { 
      classText = value.split('-');
      catchedString = classText[classText.length - 1];
      //console.log(catchedString);
    }
  }
  return catchedString;
}

