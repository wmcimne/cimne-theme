jQuery(function($){

  /*--------------------------------------------------------------
    Menu pantalla de escritorio
  ----------------------------------------------------------------*/

  $(function() {
    //
    // Inserta los dropdowns creados a los items del menú primer nivel
    $('.dropdown-menu').each(function (i) {
      i = i + 1;
      let $dropdown = $('.dropdown-menu-' + i);
      let $mainMenuItem = $('.first-level-' + i + '>a');

      $dropdown.insertAfter($mainMenuItem);
    });

    // On hover behaviour - controla que valores css asignar a la barra de menú
    if ($('body').hasClass('home')) {
      onHoverBehaviour.homeNoHoverParams();
      $('.et-menu-nav li').hover(() => onHoverBehaviour.homeHoverParams(), () => onHoverBehaviour.homeNoHoverParams());
      $('#main-bar').hover(() => onHoverBehaviour.homeHoverParams(), () => onHoverBehaviour.homeNoHoverParams());
    } else {
      $('.et-menu-nav li').hover(() => onHoverBehaviour.noHomeHoverParams(), () => onHoverBehaviour.noHomeNoHoverParams());
      $('#main-bar').hover(() => onHoverBehaviour.noHomeHoverParams(), () => onHoverBehaviour.noHomeNoHoverParams());
    }

    // Position behaviour - Controla la ocultación de la barra superior del menú y la posición de los dropdowns al hacer scroll  
    window.onscroll = function () {
      const dropdowns = document.querySelectorAll('.dropdown-menu');
      $('body').hasClass('home') ? homePositionParams(dropdowns) : noHomePositionParams(dropdowns);
    }
  });


 /*--------------------------------------------------------------
    Menu pantalla mobile
  ----------------------------------------------------------------*/

  $(function() {

    let index, arrowElement;

    // Muestra el submenú con efecto desplazamiento lateral
    $('li[class*="-arrow-"]').click(function (event) {
      event.preventDefault(); // parece que hay dos clics en el mismo item de la lista y da un error de jq. Investigar como elimiar el click by default
      // Mantiene el menú 1er nivel visible
      $('.mobile_menu_bar').click();

      arrowElement = event.target.parentNode.parentNode;
      index = getStringInClassNameList(arrowElement, '-arrow-');
      $('.content-tab').eq(index).animate({ left: "0px", top: "80px" });
    });

    // Oculta el submenú con efecto desplazamiento lateral
    $('.submenu-arrow').click(function () {
      $('.content-tab').eq(index).animate({ left: "1000px", top: "80px" });
    });
    $('.mobile_menu_bar').click(function () {
      $('.content-tab').eq(index).animate({ left: "1000px", top: "80px" });
    });

    // Método que dispa un evento cuando se cambia la clase de un elemento usando jQuery
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

      (isHome && isOpened) ? mobileTabsBehaviour.isHomeIsOpen() :
        (isHome && !isOpened) ? mobileTabsBehaviour.isHomeIsNotOpen() :
          (!isHome && isOpened) ? mobileTabsBehaviour.isNotHomeIsOpen() :
            (!isHome && !isOpened) ? mobileTabsBehaviour.isNotHomeIsNotOpen() :
              null;
    });
  });



  /*--------------------------------------------------------------
    Nav tabs: Controla un sistema de tabs
  ----------------------------------------------------------------
    Para no usar DIVI tabs module
  
    -xxx-nav-item-n: id of the item
    -xxx-nav-tab-n: id of the tab
  
    Where:
  
    -xxx: name of the Nav tabs
    -nav-item: menu nav item
    -nav-tab: menu nav tab
    -n: number of the item/tab
  
  */

  $(function() {
    $('[id$="nav-item-1"]').addClass('nav-item-active');
    $('[id$="nav-tab-1"]').addClass('show-nav-tab');
    $('[id*="nav-tab"]').not('[id$="nav-tab-1"]').addClass('hide-nav-tab');
    const stringPositionRemovingItemPlusNumber = -7;

    $('[id*="nav-item"]').click(function () {

      let selector = $(this).attr('id').replace('item', 'tab');
      let clusterSelect = $('#' + selector);
      let tabNameSelected = $(this).attr('id').slice(0, stringPositionRemovingItemPlusNumber);

      $('[id*="' + tabNameSelected + '-tab"]').removeClass('show-nav-tab');
      $('[id*="' + tabNameSelected + '-tab"]').addClass('hide-nav-tab');
      clusterSelect.addClass('show-nav-tab');
      $('[id*="' + tabNameSelected + '-item"]').removeClass('nav-item-active');
      $(this).addClass('nav-item-active');

    });
  });


  /*------------------------------------------------------------------------------
    Gestiona la visibilidad de las secciones de proyectos. Navegación y filtrado

    *Adaptar a otras listas como publicaciones, etc
  -------------------------------------------------------------------------------*/
  
  let projectItems =  document.getElementById('project-items');

  if (document.body.contains(projectItems)) {
    
    const allProjectItems = document.querySelectorAll('.projects-nav-item');


    projectItems.addEventListener('click', (event) => {

      if (event.target.closest('#ongoing-projects-item') && !event.target.closest('#ongoing-projects-item').classList.contains('nav-item-active')) {

        allProjectItems.forEach(tab => tab.classList.toggle('nav-item-active'));
        document.documentElement.style.setProperty('--display-ongoing-projects', 'block');
        document.documentElement.style.setProperty('--display-finished-projects', 'none');
      }
      if (event.target.closest("#finished-projects-item") && !event.target.closest('#finished-projects-item').classList.contains('nav-item-active')) {

        allProjectItems.forEach(tab => tab.classList.toggle('nav-item-active'));
        document.documentElement.style.setProperty('--display-ongoing-projects', 'none');
        document.documentElement.style.setProperty('--display-finished-projects', 'block');
      }
    });
  } else {
    console.log('projectItems not found');
  }

  /*--------------------------------------------------------------
    Formas y efectos en imagenes
  ----------------------------------------------------------------*/

  $(function() {
    !!document.querySelector('.img-square-container') ? addSquareFormToImg() : null;
    !!document.querySelector('#section-news') ? addRectangleFormToImg() : null;
  });

  const addRectangleFormToImg = () => {

    console.log('addRectangleFormToImg');

    let container = document.querySelector('#section-news');
    let article = container.querySelectorAll('article');
    let category, image;

    article.forEach(function (element) {
      category = getStringInClassNameList(element, 'tag');
      image = element.querySelector('img');
      $(image).before('<div class="rectangle"><span class="rectangle-text">' + category + '</span></div>');
    });
  }

  const addSquareFormToImg = () => {
    console.log('addSquareFormToImg');

    $('.img-square-container.square-form-cross img').after('<img src="http://cimne.local/wp-content/uploads/2024/09/square-turquoise-cross-desktop.png" alt="square-cross-form" class="square-form-img">');
    $('.img-square-container.square-form-arrow-left.blue img').after('<img src="http://cimne.local/wp-content/uploads/2024/09/square-blue-arrow-right-desktop.png" alt="square-arrow-form" class="square-form-img">');
    $('.img-square-container.square-form-arrow-left.turquoise img').after('<img src="http://cimne.local/wp-content/uploads/2024/09/square-turquoise-arrow-right-desktop.png" alt="square-arrow-form" class="square-form-img">');
  }

  const getStringInClassNameList = (element, keyWord) => {

    console.log(`getStringInClassNameList: ${element} keyword: ${keyWord}`);

    let classNameList = element.className.split(' ');
    let catchedString = '';
    console.log('Language is: ' + document.documentElement.lang);

    for (value of classNameList) {
      
      if (value.includes(keyWord)) {
        classText = value.split('-');
        // console.log(`value: ${value} - classNameList: ${classNameList} - classText: ${classText}`);
        // console.log('-1: ' + classText[classText.length - 1]);
        // console.log('-2: ' + classText[classText.length - 2]);
        
        document.documentElement.lang.includes('en') ?  catchedString = classText[classText.length - 1] : catchedString = classText[classText.length - 2];
        //catchedString = classText[classText.length - 1];
        console.log(`catchedString: ${catchedString}`);
      }
    }
    
    return catchedString;
  }


  /*--------------------------------------------------------------
    Funciones Auxiliares
  ----------------------------------------------------------------*/
  
  // posición y comportamiento de la barra y dropdowns en función de si es home o no 
  const homePositionParams = (dropdowns) => {

    console.log('homePositionParams');

    let topBar = document.getElementById('top-bar');
    let mainBar = document.getElementById('main-bar');
    let coords = topBar.getBoundingClientRect();
    let topBarHeight = topBar.offsetHeight;
    let mainBarHeight = mainBar.offsetHeight;
    let dropdownsTopPosition = topBarHeight + mainBarHeight + coords.top + 'px';

    dropdowns.forEach((element) => {
      element.style.top = dropdownsTopPosition;
    })
  }

  const noHomePositionParams = (dropdowns) => {

    console.log('noHomePositionParams');

    let topBar = document.getElementById('top-bar');
    let mainBar = document.getElementById('main-bar');
    let currentScrollPos = window.window.scrollY;
    let topBarHeight = topBar.offsetHeight;
    let mainBarTopPosition = "";

    if (currentScrollPos > topBarHeight) {
      topBar.style.display = 'none';
      mainBar.style.top = '0px';
      mainBarTopPosition = '104px';
    } else {
      topBar.style.display = 'block';
      mainBar.style.top = '40px';
      mainBarTopPosition = '144px';
    }
    dropdowns.forEach((element) => {
      element.style.top = mainBarTopPosition;
    })
  }
  

  // valores css de la barra de menú en función de si es home / es hover 
  const onHoverBehaviour = {
    homeHoverParams: () => {
      console.log('onHoverBehaviour: homeHoverParams');

      $('#main-bar').css('background-color', '#004996');
    },
    homeNoHoverParams: () => {
      console.log('onHoverBehaviour: homeNoHoverParams');

      $('#main-bar').css('background-color', 'transparent');
      $('[id^="menu-main-right"] li a').css({ 'border-color': '#fff', 'color': '#fff' });
      $('#main-bar button.et_pb_menu__search-button').css({ 'border-color': '#fff', 'color': '#fff' });
    },
    noHomeHoverParams: () => {
      console.log('onHoverBehaviour: noHomeHoverParams');

      $('#main-bar').css('background-color', '#004996');
      $('.category-menu-left li.first-level>a').css('color', '#fff');
      $('.et_pb_menu__logo img').attr('src', 'http://cimne.local/wp-content/uploads/2024/09/logo-blanco-cimne-web.png');
      $('[id^="menu-main-right"] li a, .category-menu-right button.et_pb_menu__search-button').css({ 'border-color': '#fff', 'color': '#fff' });
  
    },
    noHomeNoHoverParams: () => {
      console.log('onHoverBehaviour: noHomeNoHoverParams');

      $('#main-bar').css('background-color', '#fff');
      $('.category-menu-left li.first-level>a').css('color', '#004996');
      $('.et_pb_menu__logo img').attr('src', 'http://cimne.local/wp-content/uploads/2024/09/logo-color-cimne-web.png');
      $('[id^="menu-main-right"] li a, .category-menu-right button.et_pb_menu__search-button').css({ 'border-color': '#02A0A5', 'color': '#02A0A5' });

    }
  }
  
  // Update Mobile Menu Styles Features
  const mobileTabsBehaviour = {

  

    isHomeIsOpen: () => {
      console.log('mobileTabsBehaviour: isHomeIsOpen');
      
      $('#page-container .mobile-menu').css({'position' : 'fixed', 'background-color': '#004996'});
    },
    isHomeIsNotOpen: () => {
      console.log('mobileTabsBehaviour: isHomeIsNotOpen');

      $('#page-container .mobile-menu').css({'position' : 'relative','background-color': 'transparent'});
    },
    isNotHomeIsOpen: () => {
      console.log('mobileTabsBehaviour: isNotHomeIsOpen');

      $('.et_pb_menu__logo img').attr('src', 'http://cimne.local/wp-content/uploads/2024/09/logo-blanco-cimne-web.png');
      $('.mobile-menu button.et_pb_menu__search-button ').css({'border': '#fff solid 1px', 'color': '#fff'});
      $('#page-container .mobile-menu').css('background-color', '#004996');
    },
    isNotHomeIsNotOpen: () => {
      console.log('mobileTabsBehaviour: isNotHomeIsNotOpen');

      $('.et_pb_menu__logo img').attr('src', 'http://cimne.local/wp-content/uploads/2024/09/logo-color-cimne-web.png');
      $('.mobile-menu button.et_pb_menu__search-button ').css({'border': '#004996 solid 1px', 'color': '#004996'});
      $('#page-container .mobile-menu').css('background-color', '#fff');
    }
  }
});






