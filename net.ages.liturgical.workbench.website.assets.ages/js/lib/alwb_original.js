var resized = false;
var originalFontSize;
var adjustedFontSize;
var elements;
var alertShown = false;
var maxWidth = screen.width;
var viewport = document.getElementsByName('viewport')[0];
var bilingual = (($(".leftCell").length > 0) && ($(".RightCell").length > 0));
var displayingBilingual = true;
var indexPage = false;
var lang1;
var lang2;
var lang1IsGreek = false;
var lang2IsGreek = false;
var dayBackgroundColor;
var dayFontColor;
var dayMenuIconColor;
var dayMenuBarColor;
var redElements;


var isMobile = {
  Android: function () {
    return (navigator.userAgent.match(/Android/i) != null);
  },
  AndroidPhone: function () {
    return (
      (navigator.userAgent.match(/Android/i) != null)
      && (navigator.userAgent.match(/Mobile/i) != null)
    );
  },
  BlackBerry: function () {
    return (navigator.userAgent.match(/BlackBerry/i) != null);
  },
  iOS: function () {
    return (navigator.userAgent.match(/iPhone|iPad|iPod/i) != null);
  },
  iPhone: function () {
    return (navigator.userAgent.match(/iPhone/i) != null);
  },
  iPad: function () {
    return (navigator.userAgent.match(/iPad/i) != null);
  },
  iPod: function () {
    return (navigator.userAgent.match(/iPod/i) != null);
  },
  Opera: function () {
    return (navigator.userAgent.match(/Opera Mini/i) != null);
  },
  Windows: function () {
    return (navigator.userAgent.match(/IEMobile/i) != null);
  },
  any: function () {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

if (typeof alwbTooltips != 'undefined') {
  $(".tip-audio1").attr("title", alwbTooltips.l1.Audio);
  $(".tip-byzantine1").attr("title", alwbTooltips.l1.Byzantine);
  $(".tip-western1").attr("title", alwbTooltips.l1.Western);
  $(".tip-audio2").attr("title", alwbTooltips.l2.Audio);
  $(".tip-byzantine2").attr("title", alwbTooltips.l2.Byzantine);
  $(".tip-western2").attr("title", alwbTooltips.l2.Western);
}

function swapLang(myRow) {
  $(myRow.cells).toggle();
}

function stopSwap(myRow) {
  $("tr:has(.media-group)").removeAttr("onclick", "swapLang(this)");
}

function resumeSwap(myRow) {
  $("tr:has(.media-group)").attr("onclick", "swapLang(this)");
}

function hideAllLeft() {
  $("td").css("display", "");
  $("div.media-group-empty").css("display", "");
  $("div.media-group-empty").addClass("m-g-e");
  $("tr:has(p.alttext,p.chant,p.heirmos,p.hymn,p.hymnlinefirst,p.hymnlinemiddle,p.hymnlinelast,p.prayer,p.prayerzero,p.verse,p.versecenter,p.inaudible,p.dialog,p.dialogzero,p.reading,p.readingzero,p.readingcenter,p.readingcenterzero,p.rubric,.media-group,.dialogafteractor,p.iambiccanon1,p.iambiccanon234,p.iambiccanon5)").attr("onclick", "swapLang(this)");
  $(".media-icon,i,li").attr("onmousedown", "stopSwap(this)");
  $(".media-icon,i,li").attr("onmouseout", "resumeSwap(this)");
  $("td:even").css("background-color", "#FFF7E6");
  $("td:even").css("display", "none");
  $("td").css("border", "0");

  // Added
  $('.fa-columns.ages-col-picker').show();
  $('.fa-caret-square-o-right.ages-col-picker').hide();
  $('.fa-caret-square-o-left.ages-col-picker').show();

  displayingBilingual = false;
}

function hideAllRight() {
  $("td").css("display", "");
  $("div.media-group-empty").css("display", "");
  $("div.media-group-empty").addClass("m-g-e");
  $("tr:has(p.alttext,p.chant,p.heirmos,p.hymn,p.hymnlinefirst,p.hymnlinemiddle,p.hymnlinelast,p.prayer,p.prayerzero,p.verse,p.versecenter,p.inaudible,p.dialog,p.dialogzero,p.reading,p.readingzero,p.readingcenter,p.readingcenterzero,p.rubric,.media-group,.dialogafteractor,p.iambiccanon1,p.iambiccanon234,p.iambiccanon5)").attr("onclick", "swapLang(this)");
  $(".media-icon,i,li").attr("onmousedown", "stopSwap(this)");
  $(".media-icon,i,li").attr("onmouseout", "resumeSwap(this)");
  $("td:even").css("background-color", "#FFF7E6");
  $("td:odd").css("display", "none");
  $("td").css("border", "0");

  // Added
  $('.fa-columns.ages-col-picker').show();
  $('.fa-caret-square-o-left.ages-col-picker').hide();
  $('.fa-caret-square-o-right.ages-col-picker').show();

  displayingBilingual = false;
}

function editTextIndex() {
  $(document).ready(function () {
    $.ajax({
      url: "indexmodifier.json",
      success: function (data) {
        $.each(data, function (index, value) {
          try {
            var type = $("a.index-file-link").attr("href");
            var newType =
              type.substring(4, 8) +
              type.substring(9, 11) +
              type.substring(12, 14);

            if (newType.includes(index)) {
              var x = document.getElementsByClassName("index-service-day");

              $.each(value, function (i, v) {
                for (var i = 0; i < x.length; i++) {
                  console.log(x[i].textContent);
                  if (x[i].textContent == v.prevText && newType == index) {
                    x[i].innerHTML = v.altText;
                  }
                }
              });
            }
          } catch (e) { }
        });
      }
    });
  });
}

editTextIndex();

function showAll() {
  $("div.media-group-empty").css("display", "none");
  $("tr").removeAttr("onclick");
  $(".media-icon,i,li").removeAttr("onmousedown", "stopSwap(this)");
  $(".media-icon,i,li").removeAttr("onmouseout", "resumeSwap(this)");
  $("td").css("display", "");
  $("td").css("border", "");
  $("td:even").css("background-color", "#FBF0D9");

  // Added
  $('.fa-columns.ages-col-picker').hide();
  $('.fa-caret-square-o-left.ages-col-picker').show();
  $('.fa-caret-square-o-right.ages-col-picker').show();

  displayingBilingual = true;
}

//This function is handled by pref.generation.ares
//$(document).ready(function(){
//	$("td.leftCell span.versiondesignation").css("display","none");
//	});


$.expr[':'].notext = function detectNoText(x) { return x.innerHTML && x.innerHTML.replace(/(<!--.*(?!-->))|\s+/g, '').length === 0 }

function notAvailable() {
  $('p.hymn:has(span.dummy)').removeClass("hymn").addClass("notavailable").text("This text was inaccessible at the time of publication or unavailable due to copyright restrictions.").css("background-color", "white");
}

//This version of the script displays the versiondesgination
//function notAvailable() {
//		$('p.hymn > span.dummy').removeClass("hymn").addClass("notavailable").text("This text was //inaccessible at the time of publication or unavailable due to copyright //restrictions.").css("background-color","white");
//		}

$.expr[':'].noValue = function detectNoValue(x) {
  if ($(x).find("div.media-group").length > 0) {
    return false;
  } else if ($(x).text().trim().length === 0) {
    return true;
  } else {
    return false;
  }
};

function hideEmptyRows() {
  $("tr:noValue").css("display", "none");
}


function setViewPort() {
  viewport.setAttribute('content', 'width = ' + screen.width + ', user-scalable=yes');
}

function getLanguages() {
  return $("title").data("language");
}

function setLangVars() {
  if (indexPage) {
    lang1IsGreek = false;
    lang2IsGreek = false;
    bilingual = false;
  } else {
    var langs = getLanguages();
    if (langs.indexOf("-") > -1) {
      var parts = langs.split("-");
      lang1 = parts[0];
      if (parts.length > 0) {
        lang2 = parts[1];
      } else {
        lang2 = "";
      }
      lang1IsGreek = (lang1.indexOf("Greek") > -1);
      lang2IsGreek = (lang2.indexOf("Greek") > -1);
    } else {
      lang1 = langs;
      lang1IsGreek = (lang1.indexOf("Greek") > -1);
      lang2 = "";
    }
  }
}

function showInfo() {
  alert(
    "Device=" + navigator.userAgent
    + "\nscreen.height=" + screen.height
    + "\nscreen.width=" + screen.width
    + '\nwindow.height=' + jQuery(window).height()
    + " \nwindow.width=" + jQuery(window).width()
  );
}


function getClock() {
  d = new Date();
  nhour = d.getHours();
  nmin = d.getMinutes();
  if (nhour == 0) {
    ap = " AM";
    nhour = 12;
  } else if (nhour <= 11) {
    ap = " AM";
  } else if (nhour == 12) {
    ap = " PM";
  } else if (nhour >= 13) {
    ap = " PM";
    nhour -= 12;
  }
  if (nmin <= 9) {
    nmin = "0" + nmin;
  }
  $('#clockbox').text(nhour + ":" + nmin + ap);
  setTimeout("getClock()", 1000);
};

$(window).bind("load", function () {
  $("span.media-icon").attr("title", "Open Lang 2 Western");
  $("span.media-icon-audio").attr("title", "Open Lang 2 Audio");
  $('.content').css('top', parseInt($('.navbar').css("height")) + 10);
  $('#accordion').on('show.bs.collapse', function () {
    if (active) $('#accordion .in').collapse('hide');
  });
  $('body').on('touchstart.dropdown', '.dropdown-menu', function (e) {
    e.stopPropagation();
  });

});

function scaleFont() {
  //	alert(navigator.userAgent);
  var tabletScalerLandscapeAccordion = 1;
  var tabletScalerPortraitAccordion = 1;

  var phoneScalerLandscapeAccordion = 1;
  var phoneScalerPortraitAccordion = 1;

  var tabletScalerLandscape = 1.5;
  var tabletScalerPortrait = 1.5;

  var phoneScalerLandscape = 2.5;
  var phoneScalerPortrait = 3;

  var phoneScalerLandscapeMonolingual = 1.5;
  var phoneScalerPortraitMonolingual = 1.0;

  // Android
  var androidTabletScalerLandscapeAccordion = 1;
  var androidTabletScalerPortraitAccordion = 1;

  var androidPhoneScalerLandscapeAccordion = 1;
  var androidPhoneScalerPortraitAccordion = 1;

  var androidTabletScalerLandscape = 1.2;
  var androidTabletScalerPortrait = 1.5;

  var androidPhoneScalerLandscape = 3.0;
  var androidPhoneScalerPortrait = 3.0;

  var scaler = 1;
  var portrait = (window.innerHeight > window.innerWidth);

  if (isMobile.Android()) {
    if (portrait) {
      scaler = androidPhoneScalerPortrait;
    } else {
      scaler = androidPhoneScalerLandscape;
    }
  } else if (isMobile.iOS()) {
    if (isMobile.iPhone()) {
      $(".navbar-default").css("position", "relative");
      if (portrait) {
        if (displayingBilingual) {
          scaler = phoneScalerPortrait;
        } else {
          scaler = phoneScalerPortraitMonolingual;
        }
      } else {
        if (displayingBilingual) {
          scaler = phoneScalerLandscape;
        } else {
          scaler = phoneScalerLandscapeMonolingual;
        }
      }
    } else if (isMobile.iPad()) {
      if (portrait) {
        scaler = tabletScalerPortrait;
      } else {
        scaler = tabletScalerLandscape;
      }
    }
  } else if (isMobile.any()) {
    if (portrait) {
      scaler = phoneScalerPortrait;
    } else {
      scaler = phoneScalerLandscape;
    }
  }
  adjustedFontSize = elements.css('font-size');
  var adjustedFontSizeNum = parseFloat(adjustedFontSize, 10);
  var newFontSize = adjustedFontSizeNum * scaler;
  $(".content").css('font-size', newFontSize);
  if (isMobile.any()) {
    $("agesMenu").css("padding-top", "15px");
  }
  if (isMobile.AndroidPhone()) {
    $(".index-content").css('font-size', "300%");
    $(".panel-title").css('font-size', "150%");
  }
  resized = true;
  originalFontSize = newFontSize;
  adjustedFontSize = newFontSize;
  resizeNume();
  setViewPort();
  resizeMenuIcons();
  offsetContent();
  return false;
}

function offsetContent() {
  $(".content").css('top', $(".agesMenu").height());
  if (indexPage) {
    $(".index-content").css('top', $(".agesMenu").height() + 15);
  }
}

function resizeNume(size) {
  var byz = $(".byzscore");
  if (byz.length > 0) {
    byz.css('height', adjustedFontSize);
    byz.css('width', adjustedFontSize * 1.3);
  }
}
function setFontTo(size) {
  adjustedFontSize = parseFloat(adjustedFontSize, 10) * size;
  elements.css('font-size', adjustedFontSize);
  //	resizeMenuIcons();
}

function resizeMenuIcons() {
  var menuFont = 25;
  var portrait = (window.innerHeight > window.innerWidth);
  var menuScaler = 1.0;

  if (isMobile.Android()) {
    if (portrait) {
      menuScaler = 2;
    } else {
      menuScaler = 1.5;
    }
  } else if (isMobile.iOS()) {
    if (isMobile.iPhone()) {
      if (indexPage) {
        if (portrait) {
          menuScaler = 1;
        } else {
          menuScaler = .7;
        }
      } else {
        if (displayingBilingual) {
          if (portrait) {
            menuScaler = 3;
          } else {
            menuScaler = 2;
          }
        } else {
          if (portrait) {
            menuScaler = 1.5;
          } else {
            menuScaler = .9;
          }
        }
      }
    } else if (isMobile.iPad()) {
      if (portrait) {
        menuScaler = 1;
      } else {
        menuScaler = .7;
      }
    }
  } else { // desktop
    if (indexPage) {
      if (portrait) {
        menuScaler = .5;
      } else {
        menuScaler = .5;
      }
    } else {
      if (displayingBilingual) {
        if (portrait) {
          menuScaler = .5;
        } else {
          menuScaler = .5;
        }
      } else {
        if (portrait) {
          menuScaler = .5;
        } else {
          menuScaler = .5;
        }
      }
    }
  }
  $("i.ages-menu-link, ul.jqm-dropdown-menu").css("font-size", (menuFont * menuScaler + "pt"));
  offsetContent();
}
$(window).on('resize orientationChanged', function () {
  return false;
});

$(document).ready(function () {
  $('.collapse').collapse();
  adjustedFontSize = $("body").css('font-size');
  dayBackgroundColor = $("body").css('background-color');
  dayFontColor = $("body").css('color');
  dayMenuIconColor = $("i.ages-menu-link").css('color');
  dayMenuBarColor = $("div.agesMenu").css('background-color');
  redElements = $('*').filter(function () { return ($(this).css('color') == "rgb(255, 0, 0)"); });

  /* Remove Content from Dropdown Menu */
  $('div#jqm-dropdown-pages > ul > li:eq(10)').remove(); // help
  $('div#jqm-dropdown-pages > ul > li:eq(9)').remove(); // hr
  $('div#jqm-dropdown-pages > ul > li:eq(8)').remove(); // browser info link
  $('div#jqm-dropdown-pages > ul > li:eq(7)').remove(); // hr
  $('div#jqm-dropdown-pages > ul > li:eq(6)').remove(); // donate link

  if (getLanguages()) {
    setLangVars();
  }

  if ($(".panel-group").length > 0) {
    indexPage = true;
  }
  if (isMobile.any()) {
    $(".clockbox").remove();
    $(".agesMenu a .fa").css('font-size', '12pt');
  }

  getClock();
  elements = $(".content");

  // Increase Font Size
  $(".increaseFont").click(function () {
    setFontTo(1.2);
    resizeNume();
    return false;
  });
  // Decrease Font Size
  $(".decreaseFont").click(function () {
    setFontTo(0.8);
    resizeNume();
    return false;
  });

  $('.dayMode').toggle(); // Added

  $(".dayMode").click(function () {
    $("html, body, body *").css('background-color', dayBackgroundColor);
    $("p").css('color', dayFontColor);
    $(redElements).css('color', 'red');
    $("i.ages-menu-link *").css('color', dayMenuIconColor);
    $("div.agesMenu, div.agesMenu *").css('background-color', dayMenuBarColor);

    $('.dayMode').toggle(); // Added
    $('.nightMode').toggle(); // Added

    return false;
  });

  $(".nightMode").click(function () {
    $("html, body, body *").css('background-color', 'black');
    $("p").css('color', '#FBF0D9');
    $(redElements).css('color', 'red');
    $("i.ages-menu-link *").css('color', dayMenuIconColor);
    $("div.agesMenu, div.agesMenu *").css('background-color', dayMenuBarColor);

    $('.dayMode').toggle(); // Added
    $('.nightMode').toggle(); // Added

    return false;
  });


  if ($('title').data('language')) {
    var lang_array = $('title').data('language').split('-');
    if (lang_array.length == 2) {
      if (displayingBilingual) {
        $('.fa-columns.ages-col-picker').hide();
      }
    }
  }

  $.fn.visible = function () {
    return this.css('visibility', 'visible');
  };

  $.fn.invisible = function () {
    return this.css('visibility', 'hidden');
  };

  $.fn.visibilityToggle = function () {
    return this.css('visibility', function (i, visibility) {
      return (visibility == 'visible') ? 'hidden' : 'visible';
    });
  };

  $(".versionMode").click(function () {
    $("span.versiondesignation").visibilityToggle();
    $("p.source").visibilityToggle();
    $("p.source0").visibilityToggle();
    return false;
  });

  /*******************
  // --- 1. Core Scrolling Function ---
  /**
   * NOTE: The function 'scrollToTop()' is assumed to be defined elsewhere in this same file.
   * We are removing its definition here to prevent duplication, but the call in setupTopModeButtonListener 
   * will work because it is available in the global scope (or module scope if using modules).
   */


  // --- 2. Button Insertion Function (Simplified) ---
  /**
   * Inserts the 'topMode' button immediately after the element with the class 'versionMode'.
   */
  function insertTopModeButton() {
    // Find the existing element to insert after.
    const existingElement = document.querySelector('.versionMode');

    // Define the HTML for the new button, now including the 'title' attribute for the hover tooltip.
    const newButtonHTML = `
        <a href="#" class="topMode" title="Scroll to Top">
            <i class="fa fa-arrow-up topMode ages-menu-link"></i>
        </a>
    `;

    // Insert the new HTML after the existing element, if found.
    if (existingElement) {
      existingElement.insertAdjacentHTML('afterend', newButtonHTML.trim());
    }
  }
  // --- 3. Setup and Event Listener Binding ---
  /**
   * Finds the newly inserted button and attaches the click event listener 
   * to execute the existing scrollToTop() function.
   */
  function setupTopModeButtonListener() {
    // 1. Call the function to ensure the button is in the DOM.
    insertTopModeButton();

    // 2. Find the new button using its class selector.
    const topButton = document.querySelector('.topMode');

    // 3. Attach the event listener.
    if (topButton) {
      // When clicked, prevent the default anchor action and call the existing scrollToTop() function.
      topButton.addEventListener('click', (event) => {
        event.preventDefault();
        // Call the function that already exists in your script
        scrollToTop();
      });
    }
  }
  // --- Execute Setup (Using 'document ready' pattern) ---
  (function () {
    if (document.readyState === 'loading') {
      // If the document is still loading, wait for the DOMContentLoaded event.
      document.addEventListener('DOMContentLoaded', setupTopModeButtonListener);
    } else {
      // If the script is loaded after the DOM is ready, execute immediately.
      setupTopModeButtonListener();
    }
  })();

  /************************************************ */

  // function setCookie(cname, cvalue, exdays) {
  //     var d = new Date();
  //     d.setTime(d.getTime() + (exdays*24*60*60*1000));
  //     var expires = "expires="+d.toUTCString();
  //     document.cookie = cname + "=" + cvalue + "; " + expires;
  // }
  // function getCookie(cname) {
  //     var name = cname + "=";
  //     var ca = document.cookie.split(';');
  //     for(var i=0; i<ca.length; i++) {
  //         var c = ca[i];
  //         while (c.charAt(0)==' ') c = c.substring(1);
  //         if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
  //     }
  //     return "";
  // }
  // show_media = getCookie('showmedialinks');
  // show_media = "block";

  // if (!isMobile.iPad()) {
  //   // $('a.versionMode').after('<a href="#" class="mediaMode"><i class="fa fa-music mediaMode ages-menu-link"></i></a>');
  //   // $('.mediaMode').click(function() {
  //   //   $('.media-group').toggle();
  //   //   var media_val = $('.media-group:first').css('display');
  //   //   setCookie('showmedialinks',media_val,100);
  //   //   return false;
  //   // });	
  //   $('.media-group').toggle();
  //   if (show_media == "none") {
  //     $('.media-group').hide();
  //   } else if(show_media == "block") {
  //     $('.media-group').show();
  //   }
  // }

  // Test to see if this is an extended service file
  if ((window.location.href.indexOf('ma2') >= 0) || (window.location.href.indexOf('MA2') >= 0)) {
    $('body').append('<div class="pref-panel"><h2>Service Preferences</h2></div>')

    $('a.versionMode').after('<a href="#" class="prefMode"><i class="fa fa-list-ul prefMode ages-menu-link"></i></a>');

    // Check for Eothinon Gospel
    var has_eothinon_gospel = false;
    if ($('.bmc_eothinongospel_position1').length > 0) {
      has_eothinon_gospel = true;
    }

    // Determine which canons are present
    var opt_class_list = [];
    var opt_list = [];
    $('[class^="bmc_"]').each(function () {

      var class_name = $(this).attr('class');
      var class_text = $(this).text();
      if (opt_class_list.indexOf(class_name) == -1) {
        opt_class_list.push(class_name);
        opt_list.push({ class: class_name, text: class_text });
      }
    });

    var canon_list = [];
    for (var i = 0; i < opt_class_list.length; i++) {
      var ode1_index = opt_class_list[i].indexOf("ode1_");
      if (ode1_index >= 0) {
        canon_list.push(opt_class_list[i].substr(ode1_index + 5));
      }
    };

    var spacer_text = "<div class='pref-spacer'></div>";

    $(".pref-panel").append("<div class='pref-opts'></div>");
    $(".pref-opts").append("<div class='pref-instructions'><p>" +
      "The pre-selected default preferences will display the Matins service as it is in the regular Matins file. Use this panel to choose which parts of the canon to display, and also the position of the Eothinon Gospel," +
      " Kontakia and Katavasias, and whether or not to display end litanies and dismissal. Certain selections will make others inaccesible, to prevent mistakes. " +
      " Once you have " +
      " selected your preferences, click Apply. You will then be taken to the text of the service. If you want to change " +
      "your preferences, click on the Preferences Button on the right hand corner of the left frame.</p>" +
      "<br><p>If you want to print the customized service as it appears in " +
      "your browser in the left frame, turn off the media icons using the music button on the blue toolbar. " +
      "Choose your bilingual or English only preference. Click on the printer button that will appear on the " +
      "right hand corner of the left frame. Bilingual texts will print in two columns. English only text will print in a " +
      "single column, filling the page. The iPad app does not yet support printing of the customized text.</p></div>");

    $(".pref-opts").append('<div class="pref-closer">Apply</div>');

    var prev_ode = null; var cur_ode = null;
    opt_list.forEach(function (item) {
      var className = item.class;
      var dispText = item.text;
      if (className.indexOf('bmc_eothinongospel_position1') == 0) {
        var gospel_label1 = $('.bmc_eothinongospel_position1:first').text();
        $('.pref-opts').append("<div class='pref-left'><label for='radio-eothinon-1'>" + gospel_label1 + "</label></div>"
          + "<div class='pref-right'><input id='radio-eothinon-1' type='radio' name='radio-eothinon'></div>");
      } else if (className.indexOf('bmc_eothinongospel_position2') == 0) {
        var gospel_label2 = $('.bmc_eothinongospel_position2:first').text();
        $(".pref-opts").append("<div class='pref-left'><label for='radio-eothinon-2'>" + gospel_label2 + "</label></div>"
          + "<div class='pref-right'><input id='radio-eothinon-2' type='radio' name='radio-eothinon'></div>");

      } else if (className.indexOf('bmc_magnificat') == 0) {
        if (className.indexOf('modeofcanon') >= 0) {
          $(".pref-opts").append(spacer_text + "<div class='pref-left'><label for='radio-mag-modeofcanon'>" + dispText + "</label></div>"
            + "<div class='pref-right'><input id='radio-mag-modeofcanon' type='radio' name='radio-magnificat'></div>");
        } else if (className.indexOf('modeokatavasia') >= 0) {
          $(".pref-opts").append(spacer_text + "<div class='pref-left'><label for='radio-mag-katavasia'>" + dispText + "</label></div>"
            + "<div class='pref-right'><input id='radio-mag-katavasia' type='radio' name='radio-magnificat'></div>"
            + spacer_text);
        }
      } else {
        var idx = className.indexOf('ode');
        if (idx > 0) {
          cur_ode = className.slice(idx + 3, idx + 4);
        }
        if ((cur_ode !== prev_ode) || (className.indexOf('litany') >= 0)) {
          $(".pref-opts").append(spacer_text);
        }

        prev_ode = cur_ode;

        if (className.indexOf('matins_end_no_dismissal') >= 0) {
          $hr = $('<hr>').css({ 'border': '1px solid #555', 'width': '80%' });
          $('.pref-opts').append($hr);
        }

        if (className !== 'bmc_matins_dismissal') {
          $('.pref-opts').append(make_checkbox(className, dispText));
        }

        if ((className == "bmc_ode3_litany") ||
          (className == "bmc_ode6_litany") ||
          (className == "bmc_ode8_katavasia")) {
          $(".pref-opts").append(spacer_text);
        }
      }
    });

    function make_checkbox(className, dispText) {
      var cb_id = "cb_" + className.slice(4);
      var out_html = "<div class='pref-left'><label for='" + cb_id + "'>" + dispText + "</label></div>"
        + "<div class='pref-right'><input id='" + cb_id + "' type='checkbox'></div>";
      var $cb = $("<input>", { type: 'checkbox', id: cb_id });
      var $right = $("<div></div>").addClass('pref-right').append($cb);
      var $left = $('<div></div>').addClass('pref-left');
      var $label = $('<label></label>').text(dispText).attr('for', cb_id);
      $left.append($label);
      var $container = $('<div></div>').append($left).append($right);
      return $container;
    }

    $(".pref-opts").append("<div class='pref-closer'>Apply</div>");

    // Add print and services preference links
    if (!isMobile.iPad())
      $(".content").prepend('<p class="print-btn"><a href="#" class="print-service"><i class="fa fa-print" title="Print this frame"></i></a></p>');
    $(".content").prepend('<p class="print-btn"><a href="#" class="prefMode"><i class="fa fa-list-ul prefMode" title="Open service preferences"></i></a></p>');

    // Bind click functions for Eothinon Gospels
    $("#radio-eothinon-1, #radio-eothinon-2").click(function () {
      show_eothinon(this.id.slice(-1));
    });

    // Bind click functions for Kontakion
    $('#cb_kontakion_position1, #cb_kontakion_position2, #cb_kontakion_position12').click(function () {
      var kNum = parseInt(this.id.split('_')[2].slice(8));
      show_kontakion(kNum, this.checked);
      if (kNum == 12) {
        show_kontakion(1, false);
        show_kontakion(2, false);
        $("#cb_kontakion_position1").prop("checked", false);
      } else if ((kNum == 1) || (kNum == 2)) {
        //} else if (kNum == 1) {
        show_kontakion(12, false);
        $("#cb_kontakion_position12").prop("checked", false);
      }
    });

    // Bind click functions for canon odes
    $('[id^="cb_ode"]').click(function () {
      if (this.checked) {
        $('tr:has(p.bmc_' + this.id.slice(3) + ')').nextUntil('tr:has(p.emc_' + this.id.slice(3) + ')').show();
      } else {
        $('tr:has(p.bmc_' + this.id.slice(3) + ')').nextUntil('tr:has(p.emc_' + this.id.slice(3) + ')').hide();
      }

      if (this.id.indexOf('_katavasia') >= 0) {
        var test_katavasia = check_ode_katavasia();
        if (test_katavasia) {
          $('#cb_odes1345678_katavasia').prop('checked', false);
          $('tr:has(p.bmc_odes1345678_katavasia)').nextUntil('tr:has(p.emc_odes1345678_katavasia)').hide();
          $("#cb_odes1345678_katavasia").attr('disabled', true);
        } else {
          $('#cb_odes1345678_katavasia').attr('disabled', false);
        }
      }
    });

    // Bind click function for midode Kathisma
    $("#cb_ode3_kathisma").click(function () {
      if (this.checked) {
        $("tr:has(p.bmc_ode3_kathisma)").nextUntil('tr:has(p.emc_ode3_kathisma)').show();
      } else {
        $("tr:has(p.bmc_ode3_kathisma)").nextUntil('tr:has(p.emc_ode3_kathisma)').hide();
      }
    });

    // Bind click function for katavasia1345678
    $("#cb_odes1345678_katavasia").click(function () {
      if (this.checked) {
        $("tr:has(p.bmc_odes1345678_katavasia)").nextUntil('tr:has(p.emc_odes1345678_katavasia)').show();
      } else {
        $('tr:has(p.bmc_odes1345678_katavasia)').nextUntil('tr:has(p.emc_odes1345678_katavasia)').hide();
      }
    });

    // Bind click function for magnificat
    $("#radio-mag-katavasia, #radio-mag-modeofcanon").click(function () {
      if (this.id == "radio-mag-katavasia") {
        $("tr:has(p.bmc_magnificat_modeokatavasia)").nextUntil("tr:has(p.emc_magnificat_modeofkatavasia)").show();
        $("tr:has(p.bmc_magnificat_modeofcanon)").nextUntil("tr:has(p.emc_magnificat_modeofcanon)").hide();
      } else if (this.id == "radio-mag-modeofcanon") {
        $("tr:has(p.bmc_magnificat_modeofcanon)").nextUntil("tr:has(p.emc_magnificat_modeofcanon)").show();
        $("tr:has(p.bmc_magnificat_modeokatavasia)").nextUntil("tr:has(p.emc_magnificat_modeofkatavasia)").hide();
      }
    });

    // Bind click functions for showing and hiding Service Preferences panel
    $('.prefMode').click(function (ev) {
      ev.preventDefault();
      $(".pref-panel").show();
    });
    $('.pref-closer').click(function () {
      $(".pref-panel").hide();
    });

    // Bind click functions for dismissal options
    $('#cb_matins_end_no_dismissal').click(function () {
      if (this.checked) {
        $('tr:has(p.bmc_matins_end_no_dismissal)').nextUntil('tr:has(p.emc_matins_end_no_dismissal)').show();
        $('tr:has(p.bmc_matins_end_before_dismissal)').nextUntil('tr:has(p.emc_matins_end_before_dismissal)').hide();
        $('tr:has(p.bmc_matins_dismissal)').nextUntil('tr:has(p.emc_matins_dismissal)').hide();
        $('tr:has(p.bmc_matins_close)').nextUntil('tr:has(p.emc_matins_close)').hide();
        if ($('#cb_matins_end_before_dismissal').prop('checked'))
          $('#cb_matins_end_before_dismissal').click();
      } else {
        $('tr:has(p.bmc_matins_end_no_dismissal)').nextUntil('tr:has(p.emc_matins_end_no_dismissal)').hide();
      }
    });
    $('#cb_matins_end_before_dismissal').click(function () {
      if (this.checked) {
        $('tr:has(p.bmc_matins_end_before_dismissal)').nextUntil('tr:has(p.emc_matins_end_before_dismissal)').show();
        $('tr:has(p.bmc_matins_dismissal)').nextUntil('tr:has(p.emc_matins_dismissal)').show();
        // Hide dismissal 1 if it's visible
        if ($('#cb_matins_end_no_dismissal').prop('checked')) {
          $('#cb_matins_end_no_dismissal').click();
        }
      } else {
        $('tr:has(p.bmc_matins_end_before_dismissal)').nextUntil('tr:has(p.emc_matins_end_before_dismissal)').hide();
        $('tr:has(p.bmc_matins_dismissal)').nextUntil('tr:has(p.emc_matins_dismissal)').hide();
      }
    });
    $('#cb_matins_close').click(function () {
      console.log("cb clicked!");
      if (this.checked) {
        $('tr:has(p.bmc_matins_close)').nextUntil('tr:has(p.emc_matins_close)').show();
      } else {
        $('tr:has(p.bmc_matins_close)').nextUntil('tr:has(p.emc_matins_close)').hide();
      }
    })

    // Make it look like a default service
    hide_all_canons();
    show_kontakion(1, false);
    show_kontakion(2, false);
    $("#cb_kontakion_position12").click();
    $("#radio-eothinon-2").click();
    $("#cb_odes1345678_katavasia").click();
    $("#cb_ode9_katavasia").click();
    $('#cb_ode9_katavasia').prop('disabled', true);
    $('tr:has(p.bmc_matins_end_no_dismissal)').nextUntil('tr:has(p.emc_matins_end_no_dismissal)').hide();
    $('tr:has(p.bmc_matins_end_before_dismissal)').nextUntil('tr:has(p.emc_matins_end_before_dismissal)').hide();
    $('tr:has(p.bmc_matins_dismissal)').nextUntil('tr:has(p.emc_matins_dismissal)').hide();
    $('tr:has(p.bmc_matins_close)').nextUntil('tr:has(p.emc_matins_close)').hide();
    $('tr:has(p.bmc_magnificat_modeokatavasia)').nextUntil('tr:has(p.emc_magnificat_modeofkatavasia)').hide();
    $('tr:has(p.bmc_magnificat_modeofcanon)').nextUntil('tr:has(p.emc_magnificat_modeofcanon)').hide();
    $("#radio-mag-katavasia").click();

    $('.pref-panel').show();

    $(".print-service").click(function (ev) {
      ev.preventDefault();
      window.print();
    });

    $("tr:has(p[class^='bmc_'])").hide();
    $("tr:has(p[class^='emc_'])").hide();
    $("body").append('<div class="page-num-footer"></div>');
  }


  function hide_all_canons() {
    $('tr:has([class^="bmc_ode"])').each(function () {
      $(this).nextUntil('tr:has([class^="emc_ode"])').hide();
    });
  }

  function short_litany_html(ode_num) {
    if ($('.bmc_ode' + ode_num + '_litany').length > 0) {
      var p_label = $('.bmc_ode' + ode_num + '_litany:first').text();
      var out_html = "<div class='pref-left'><label for='cb-ode" + ode_num + "_litany'>" + p_label + "</label></div>"
        + "<div class='pref-right'><input id='cb-ode" + ode_num + "_litany' type='checkbox'></div>";
      return out_html;
    }
    return "";
  }


  // Show selected eothinon Gospel reading, hide the other
  function show_eothinon(num) {
    var show_gospel = num;
    var hide_gospel = num == 1 ? 2 : 1;
    $("tr:has(p.bmc_eothinongospel_position" + show_gospel + ")").nextUntil("tr:has(p.emc_eothinongospel_position" + show_gospel + ")")
      .show();
    $("tr:has(p.bmc_eothinongospel_position" + hide_gospel + ")").nextUntil("tr:has(p.emc_eothinongospel_position" + hide_gospel + ")")
      .hide();

  }

  function show_kontakion(num, showhide) {
    var show_kontak = num;
    if (showhide)
      $("tr:has(p.bmc_kontakion_position" + show_kontak + ")").nextUntil("tr:has(p.emc_kontakion_position" + show_kontak + ")").show();
    else
      $("tr:has(p.bmc_kontakion_position" + show_kontak + ")").nextUntil("tr:has(p.emc_kontakion_position" + show_kontak + ")").hide();
  }


  function check_ode_katavasia() {
    var ode_katavasia_shown = false;
    $('input[type=checkbox]').filter('[id$="katavasia"]').each(function () {
      if ((this.id.indexOf('ode9') < 0) && (this.checked) && (this.id.indexOf('odes1345678') < 0)) {
        ode_katavasia_shown = true;
      }
    });
    return ode_katavasia_shown;
  }


  // $('a.mediaMode').attr('data-toggle','tooltip');
  // $('a.mediaMode').attr('data-placement','bottom');
  // $('a.mediaMode').attr('title','Show/Hide media links')
  // $('[data-toggle="tooltip"]').tooltip({
  //   delay : {
  //     "hide" : 5000
  //   }
  // });
  // $('a.mediaMode').tooltip('show');
  // $('a.mediaMode').trigger('mouseout');

  if ($('.services-index-table').length > 0) { // Service index page
    var monthStr;
    switch (new Date().getMonth()) {
      case 0:
        monthStr = "January";
        break;
      case 1:
        monthStr = "February";
        break;
      case 2:
        monthStr = "March";
        break;
      case 3:
        monthStr = "April";
        break;
      case 4:
        monthStr = "May";
        break;
      case 5:
        monthStr = "June";
        break;
      case 6:
        monthStr = "July";
        break;
      case 7:
        monthStr = "August";
        break;
      case 8:
        monthStr = "September";
        break;
      case 9:
        monthStr = "October";
        break;
      case 10:
        monthStr = "November";
        break;
      case 11:
        monthStr = "December";
    }
    var yearStr = new Date().getFullYear();
    var dateString = monthStr + " " + yearStr;

    $('.index-month').each(function () {
      if ($(this).text() == dateString) {
        $("html, body").scrollTop($(this).offset().top - 50);
      }
    });
  }

  notAvailable();
  hideEmptyRows();

});


$(document).ready(function () {
  convertClassToId();
  //hideClassesForParish();
  insertVespersTOB();
  insertLiturgyTOB();
  insertMatinsOrdinary();
  insertMatinsTOB();
  convertClassToId();
});

// function insertVespersTOB() {
//   const pageTitle = document.title;
//   const validEndings = ['.ve', '.ve1', '.ve2', '.ve3', '.ve4', '.ve5', '.ve6', '.ve7', '.ve8', '.ve9', '.vl', '.vl2', '.pl1', '.pl5'];
//   const targetTableId = "biTable"; // Define target ID once
//   const newDivId = "LoB";

//   // 1. Check if the page title matches any valid ending
//   if (!validEndings.some(ending => pageTitle.endsWith(ending))) {
//     // Page is not a Vespers service, exit early.
//     return false;
//   }

//   console.log(`Document is a Vespers. Running content insertion script.`);

//   // --- Content Insertion Script ---

//   // 2. Define the HTML content template outside the main logic
//   const quickLinksHTML = `
//     <p class="lobTitle">Quick Links</p>
//     <p class="bookmarklink"><a href="#" onclick="scrollToBkmrk01(); return false;">Lord, I have cried</a></p>
//     <p class="bookmarklink"><a href="#" onclick="scrollToBkmrk02(); return false;">Gladsome Light</a></p>
//     <p class="bookmarklink"><a href="#" onclick="scrollToBkmrk03(); return false;">Readings</a></p>
//     <p class="bookmarklink"><a href="#" onclick="scrollToBkmrk04(); return false;">Litanies</a></p>
//     <p class="bookmarklink"><a href="#" onclick="scrollToBkmrk05(); return false;">Aposticha</a></p>
//     <p class="bookmarklink"><a href="#" onclick="scrollToBkmrk06(); return false;">Pre-festal Canon</a></p>
//     <p class="bookmarklink"><a href="#" onclick="scrollToBkmrk07(); return false;">Akathist</a></p>
//     <p class="bookmarklink"><a href="#" onclick="scrollToBkmrk08(); return false;">Paraklesis</a></p>
//     <p class="bookmarklink"><a href="#" onclick="scrollToBkmrk09(); return false;">Trisagion - Apolytikia</a></p>
//   `;

//   function addDivBeforeTable() {
//     // Step 1: Get a reference to the table using its ID
//     const table = document.getElementById(targetTableId);

//     // 3. Add existence check: If the table isn't found, stop here.
//     if (!table) {
//       console.warn(`Target table with ID '${targetTableId}' not found. Aborting content insertion.`);
//       return false;
//     }

//     // Step 2: Create the new div element
//     const newDiv = document.createElement("div");

//     // Step 3 & 4: Set ID and optional classes
//     newDiv.id = newDivId;
//     //newDiv.classList.add("bookmarkDivStyle"); // Uncomment if you decide to use this class

//     // Step 5: Add content from the extracted template
//     newDiv.innerHTML = quickLinksHTML;

//     // Step 6: Get the parent element of the table and insert the new div
//     const parent = table.parentNode;
//     parent.insertBefore(newDiv, table);

//     return true; // Indicate success
//   }

//   // Call the function to run the code
//   const insertionSuccess = addDivBeforeTable();

//   // You can decide to return the success status
//   return insertionSuccess;
// }

function insertVespersTOB() {
  // --- Constants ---
  const VALID_ENDINGS = ['.ve', '.ve1', '.ve2', '.ve3', '.ve4', '.ve5', '.ve6', '.ve7', '.ve8', '.ve9', '.vl', '.vl2', '.pl1', '.pl5'];
  const TARGET_TABLE_ID = "biTable";
  const NEW_DIV_ID = "LoB";
  const pageTitle = document.title;

  // 1. Initial Validation
  if (!VALID_ENDINGS.some(ending => pageTitle.endsWith(ending))) {
    return false;
  }

  console.log(`Document is a Vespers. Running content insertion script.`);

  // ----------------------------------------------
  // --- Core Utility Functions (Encapsulated) ---
  // ----------------------------------------------

  /**
   * Extracts the service date (month/day) from the <title> tag content and 
   * infers the year by comparing it to the file generation date.
   */
  function getServiceDate() {
    const titleElement = document.querySelector('title');

    if (!titleElement) {
        console.error("Could not find the <title> element in the document.");
        return null;
    }
    
    // 1. Extract the File Generation Date/Time from data-timestamp
    const timestamp = titleElement.getAttribute('data-timestamp');
    if (!timestamp) { return null; }
    
    const parts = timestamp.split('.');
    if (parts.length < 3) { return null; }

    const fileGenerationDate = new Date(
      parseInt(parts[0], 10), 
      parseInt(parts[1], 10) - 1, 
      parseInt(parts[2], 10), 
      12, 0, 0 
    );
    const fileGenerationYear = fileGenerationDate.getFullYear();

    // 2. Extract the Month and Day from title tag content (e.g., 'se.m08.d05.ve')
    const filenameContent = titleElement.textContent;
    const dateMatch = filenameContent ? filenameContent.match(/m(\d{2})\.d(\d{2})/) : null;

    if (!dateMatch || dateMatch.length < 3) {
      console.error(`Could not parse month/day from title content: ${filenameContent}`);
      return null;
    }

    const serviceMonthIndex = parseInt(dateMatch[1], 10) - 1; 
    const serviceDay = parseInt(dateMatch[2], 10);
    
    // 3. Infer the Service Year
    let serviceYear = fileGenerationYear;
    let initialServiceDate = new Date(serviceYear, serviceMonthIndex, serviceDay, 12, 0, 0);

    // If the service date has already passed in the file generation year, assume next year.
    if (initialServiceDate < fileGenerationDate) {
      serviceYear += 1;
      console.log(`Service date before generation date. Inferring year ${serviceYear}.`);
    } else {
        console.log(`Service year inferred as ${serviceYear}.`);
    }

    // 4. Create the final and accurate Date object
    const finalServiceDate = new Date(serviceYear, serviceMonthIndex, serviceDay, 12, 0, 0);
    console.log(`Final Service Liturgical Date: ${finalServiceDate.toDateString()}`);
    return finalServiceDate;
  }
  
  /**
   * Checks the liturgical date against special requirements for conditional links.
   * @returns {Object} An object containing the active link(s) keyed by their bookmark number.
   */
  function isSpecialDay() {
    const liturgicalDate = getServiceDate();
    if (!liturgicalDate) { return {}; }
    
    const month = liturgicalDate.getMonth();      
    const day = liturgicalDate.getDate();         
    const dayOfWeek = liturgicalDate.getDay();    
    
    const specialLinks = {}; 
    const isNotSunday = (dayOfWeek !== 0); 
    const isSaturday = (dayOfWeek === 6);

    // 1. Pre-festal Canon (Bkmrk06: Jan 2-5 OR Dec 20-24, NOT Sunday)
    const isPreCanonJan = (month === 0) && (day >= 2 && day <= 5) && isNotSunday;
    const isPreCanonDec = (month === 11) && (day >= 20 && day <= 24) && isNotSunday;
    if (isPreCanonJan || isPreCanonDec) { specialLinks['Bkmrk06'] = 'Pre-festal Canon'; }
    
    // 2. Akathist (Bkmrk07: Mar 25 OR Mar 26, AND is a Saturday)
    const isMarch = (month === 2);
    const isDate25or26 = (day === 25 || day === 26);
    const isAkathistDay = isMarch && isDate25or26 && isSaturday;
    if (isAkathistDay) { specialLinks['Bkmrk07'] = 'Akathist'; }
    
    // 3. Paraklesis (Bkmrk08: Aug 2-5, NOT Sunday)
    const isParaklesisDay = (month === 7) && (day >= 2 && day <= 5) && isNotSunday;
    if (isParaklesisDay) { specialLinks['Bkmrk08'] = 'Paraklesis'; }

    return specialLinks; 
  }

  /**
   * Generates the HTML string for the conditional links, ensuring they are ordered 6, 7, 8.
   * Since only one link will ever be active, this guarantees Bkmrk06 is checked before Bkmrk07, etc.
   * @returns {string} The HTML string for the optional links.
   */
  function getOptionalLinksHTML() {
    const activeLinks = isSpecialDay(); 
    let optionalLinks = '';
    
    const linkMap = {
        'Bkmrk06': `<p class="bookmarklink"><a href="#" onclick="scrollToBkmrk06(); return false;">Pre-festal Canon</a></p>`,
        'Bkmrk07': `<p class="bookmarklink"><a href="#" onclick="scrollToBkmrk07(); return false;">Akathist</a></p>`,
        'Bkmrk08': `<p class="bookmarklink"><a href="#" onclick="scrollToBkmrk08(); return false;">Paraklesis</a></p>`,
    };
    
    // Explicitly iterate through the desired order: Bkmrk06, Bkmrk07, Bkmrk08
    const orderedKeys = ['Bkmrk06', 'Bkmrk07', 'Bkmrk08'];

    orderedKeys.forEach(key => {
        // If the date condition was met for this bookmark number
        if (activeLinks.hasOwnProperty(key)) {
            optionalLinks += linkMap[key];
        }
    });
    
    return optionalLinks;
  }
  
  // ----------------------------------------------
  // --- Insertion Logic ---
  // ----------------------------------------------

  const bkmrk09HTML = `<p class="bookmarklink"><a href="#" onclick="scrollToBkmrk09(); return false;">Trisagion - Apolytikia</a></p>`;
  
  // Base links (Bkmrk 01 through 05)
  const baseLinksHTML = `
    <p class="lobTitle">Quick Links</p>
    <p class="bookmarklink"><a href="#" onclick="scrollToBkmrk01(); return false;">Lord, I have cried</a></p>
    <p class="bookmarklink"><a href="#" onclick="scrollToBkmrk02(); return false;">Entrance | Gladsome Light</a></p>
    <p class="bookmarklink"><a href="#" onclick="scrollToBkmrk03(); return false;">Prokeimenon | Readings</a></p>
    <p class="bookmarklink"><a href="#" onclick="scrollToBkmrk04(); return false;">Litanies</a></p>
    <p class="bookmarklink"><a href="#" onclick="scrollToBkmrk05(); return false;">Aposticha</a></p>
  `;

  function addDivBeforeTable() {
    const table = document.getElementById(TARGET_TABLE_ID);

    if (!table) {
      console.warn(`Target table with ID '${TARGET_TABLE_ID}' not found. Aborting content insertion.`);
      return false;
    }

    const newDiv = document.createElement("div");
    newDiv.id = NEW_DIV_ID;

    const optionalLinks = getOptionalLinksHTML();
    
    // Construct the final HTML: Bkmrk01-05 + Conditional Links (6, 7, 8 in order) + Bkmrk09
    newDiv.innerHTML = baseLinksHTML + optionalLinks + bkmrk09HTML;

    const parent = table.parentNode;
    parent.insertBefore(newDiv, table);

    return true;
  }

  // Execute the content insertion
  const insertionSuccess = addDivBeforeTable();
  return insertionSuccess;
}






function insertLiturgyTOB() {

  const pageTitle = document.title;
  const validEndings = ['.li', '.li1', '.li4', '.li6', '.li9'];

  //Service is a liturgy
  //if (pageTitle.endsWith('.li')) {
  if (validEndings.some(ending => pageTitle.endsWith(ending))) {
    console.log(`Document is a Divine Liturgy. Running content insertion script.`);

    // --- Content Insertion Script ---
    // Function to create and insert the div before the table
    function addDivBeforeTable() {
      // Step 1: Get a reference to the table using its ID
      const table = document.getElementById("biTable");

      // Step 2: Create the new div element
      const newDiv = document.createElement("div");

      // Step 3: Add the new ID to the div
      newDiv.id = "LoB";

      // Step 4: Add the new class to the div
      //newDiv.classList.add("bookmarkDivStyle");

      // Step 5: Add content to the new div using innerHTML with a template literal
      // const currentPath used when href is a link to one bookmark and not the onclick
      // const currentPath = document.location.origin + document.location.pathname;

      newDiv.innerHTML = `<p class="lobTitle">Quick Links</p>
<p class="bookmarklink"><a href="#" onclick="scrollToBkmrk03(); return false;">Small Entrance</a></p>
<p class="bookmarklink"><a href="#" onclick="scrollToBkmrk04(); return false;">Epistle Reading</a></p>
<p class="bookmarklink"><a href="#" onclick="scrollToBkmrk05(); return false;">Gospel Reading</a></p>
<p class="bookmarklink"><a href="#" onclick="scrollToBkmrk06(); return false;">Great Entrance</a></p>
<p class="bookmarklink"><a href="#" onclick="scrollToBkmrk07(); return false;">The Creed</a></p>
<p class="bookmarklink"><a href="#" onclick="scrollToBkmrk08(); return false;">Lord's Prayer</a></p>
<p class="bookmarklink"><a href="#" onclick="scrollToBkmrk09(); return false;">Memorial Service</a></p>
`;
      // Step 6: Get the parent element of the table and insert the new div
      const parent = table.parentNode;
      parent.insertBefore(newDiv, table);
    }

    // Call the function to run the code
    addDivBeforeTable();

    //convertClassToId();
    return; //stop b/c li is finished processing
  }//end if
}//end li

function insertMatinsOrdinary() {

  const pageTitle = document.title;
  const validEndings = ['.ma', '.ma2', '.ma3', '.ma4', '.ma5', '.ma6', '.ma9'];

  if (validEndings.some(ending => pageTitle.endsWith(ending))) {
    console.log(`Document is a Matins. Running insertMatinsOrdinary script.`);

    removeHtmlLinkBeforeTable();

    //Given a list of dates, return the most recent date that has passed
    function mostRecentPastDate(dates) {
      //const today = new Date();
      let mostRecent = null;

      for (const dateStr of dates) {
        const [month, day, year] = dateStr.split('-').map(Number);
        const date = new Date(year, month - 1, day);

        if (date < today && (!mostRecent || date > mostRecent)) {
          mostRecent = date;
        }
      }

      // Return formatted as mm/dd/yyyy or null if none found
      if (mostRecent) {
        const mm = String(mostRecent.getMonth() + 1).padStart(2, '0');
        const dd = String(mostRecent.getDate()).padStart(2, '0');
        const yyyy = mostRecent.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
      }

      return null;
    }

    //given two dates, one in mm/dd/yyyy, the other as a date, return the number of days between them
    function daysBetweenDates(date1Str, todayDate) {
      // Helper to parse mm/dd/yyyy into a Date object
      function parseDate(mmddyyyy) {
        const [month, day, year] = mmddyyyy.split('/').map(Number);
        return new Date(year, month - 1, day); // JavaScript months are 0-based
      }

      const date1 = parseDate(date1Str);
      const date2 = todayDate;

      // Calculate absolute difference in milliseconds, then convert to days
      const diffMs = Math.abs(date1 - date2);
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

      return diffDays;
    };

    // 1. Define the target HTML structure (using a selector that targets the key elements).
    //const targetSelector = 'tr > td:is(.leftCell, .rightCell) > p.mixed > span.kvp[data-key="miscellanea_gr_US_goa|misc.horizontal_line.solid1"]';
    const matinsOrdinaryPaschal =
      `<tr>
	<td class='leftCell'>
	<p class='designation'><span class='kvp' data-key='ho.ho03_gr_GR_cog|hoMA.MatinsOrdinary.title'>Ἀρχὴ τοῦ Ὄρθρου</span> 
	</p>
	</td>
	<td class='rightCell'>
	<p class='designation'><span class='kvp' data-key='ho.ho03_en_US_dedes|hoMA.MatinsOrdinary.title'>Beginning of Matins</span> </p>
	</td>
	</tr>
	<tr>
	<td class='leftCell'>
	<p class='break'>&#xA0;&#xA0;&#xA0;</p>
	</td>
	<td class='rightCell'>
	<p class='break'>&#xA0;&#xA0;&#xA0;</p>
	</td>
	</tr>
	<tr>
	<td class='leftCell'><p class='actor'><span class='kvp' data-key='actors_gr_GR_cog|ac.Priest'>ΙΕΡΕΥΣ</span> 
	</p></td>
	<td class='rightCell'><p class='actor'><span class='kvp' data-key='actors_en_US_goa|ac.Priest'>PRIEST</span> </p></td>
	</tr>
	<tr>
	<td class='leftCell'><p class='dialog'><span class='kvp' data-key='prayers_gr_US_goa|pr.enarxis01.text'>Εὐλογητὸς ὁ Θεὸς ἡμῶν πάντοτε, νῦν καὶ ἀεὶ καὶ εἰς τοὺς αἰῶνας τῶν αἰώνων.</span> 
	</p></td>
	<td class='rightCell'><p class='dialog'><span class='kvp' data-key='prayers_en_US_goa|pr.enarxis01.text'>Blessed is our God always, now and ever and to the ages of ages.</span> </p></td>
	</tr>
	<tr>
	<td class='leftCell'><p class='dialogwithactor'><span class='actorwithdialog'><span class='kvp' data-key='actors_gr_GR_cog|ac.IL.Choir'>ΧΟΡΟΣ:</span> 
	</span> 
	<span class='kvp' data-key='prayers_gr_US_goa|pr.res04.text'>Ἀμήν.</span> 
	</p></td>
	<td class='rightCell'><p class='dialogwithactor'><span class='actorwithdialog'><span class='kvp' data-key='actors_en_US_goa|ac.IL.Choir'>CHOIR:</span> </span> <span class='kvp' data-key='prayers_en_US_goa|pr.res04.text'>Amen.</span> </p></td>
	</tr>
	<tr>
	<td class='leftCell'><p class='actor'><span class='kvp' data-key='actors_gr_GR_cog|ac.Priest'>ΙΕΡΕΥΣ</span> 
	</p></td>
	<td class='rightCell'><p class='actor'><span class='kvp' data-key='actors_en_US_goa|ac.Priest'>PRIEST</span> </p></td>
	</tr>
			<tr>
			<td class='leftCell'>
			<p class='mode'><span class='kvp' data-key='miscellanea_gr_GR_cog|misc.Mode5'>Ἦχος πλ. αʹ.</span> 
			</p>
			</td>
			<td class='rightCell'>
			<p class='mode'><span class='kvp' data-key='miscellanea_en_US_dedes|misc.Mode5'>Mode pl. 1.</span> </p>
			</td>
			</tr>
			<tr>
			<td class='leftCell'><p class='source0'><span class='kvp' data-key='titles_gr_GR_cog|ti.sourcePentecostarion'>Τοῦ Πεντηκοσταρίου - - -</span> 
			</p></td>
			<td class='rightCell'><p class='source0'><span class='kvp' data-key='titles_en_US_dedes|ti.sourcePentecostarion'>From Pentecostarion - - -</span> </p></td>
			</tr>
			<tr>
			<td class='leftCell'><p class='hymn'><span class='kvp' data-key='pe.d071_gr_GR_cog|peMA.Troparion.text'>Χριστὸς ἀνέστη ἐκ νεκρῶν, θανάτῳ θάνατον πατήσας, καὶ τοῖς ἐν τοῖς μνήμασι, ζωὴν χαρισάμενος.</span> 
			</p></td>
			<td class='rightCell'><p class='hymn'><span class='kvp' data-key='pe.d071_en_US_goa|peMA.Troparion.text'>Christ is risen from the dead, by death trampling down upon death, and to those in the tombs He has granted life.</span> <span class="versiondesignation">[GOA<span class='key' data-key='properties_en_US_goa|version.designation' hidden='hidden'></span>]</span>
			</p></td>
			</tr>
	<tr>
	<td class='leftCell'><p class='actor'><span class='kvp' data-key='actors_gr_GR_cog|ac.Choir'>ΧΟΡΟΣ</span> 
	</p></td>
	<td class='rightCell'><p class='actor'><span class='kvp' data-key='actors_en_US_goa|ac.Choir'>CHOIR</span> </p></td>
	</tr>
			<tr>
			<td class='leftCell'>
			<p class='mode'><span class='kvp' data-key='miscellanea_gr_GR_cog|misc.Mode5'>Ἦχος πλ. αʹ.</span> 
			</p>
			</td>
			<td class='rightCell'>
			<p class='mode'><span class='kvp' data-key='miscellanea_en_US_dedes|misc.Mode5'>Mode pl. 1.</span> </p>
			</td>
			</tr>
			<tr>
			<td class='leftCell'><p class='source0'><span class='kvp' data-key='titles_gr_GR_cog|ti.sourcePentecostarion'>Τοῦ Πεντηκοσταρίου - - -</span> 
			</p></td>
			<td class='rightCell'><p class='source0'><span class='kvp' data-key='titles_en_US_dedes|ti.sourcePentecostarion'>From Pentecostarion - - -</span> </p></td>
			</tr>
			<tr>
			<td class='leftCell'><p class='hymn'><span class='kvp' data-key='pe.d071_gr_GR_cog|peMA.Troparion.text'>Χριστὸς ἀνέστη ἐκ νεκρῶν, θανάτῳ θάνατον πατήσας, καὶ τοῖς ἐν τοῖς μνήμασι, ζωὴν χαρισάμενος.</span> 
			</p></td>
			<td class='rightCell'><p class='hymn'><span class='kvp' data-key='pe.d071_en_US_goa|peMA.Troparion.text'>Christ is risen from the dead, by death trampling down upon death, and to those in the tombs He has granted life.</span> <span class="versiondesignation">[GOA<span class='key' data-key='properties_en_US_goa|version.designation' hidden='hidden'></span>]</span>
			</p></td>
			</tr>
			<tr>
			<td class='leftCell'><p class='hymn'><span class='kvp' data-key='pe.d071_gr_GR_cog|peMA.Troparion.text'>Χριστὸς ἀνέστη ἐκ νεκρῶν, θανάτῳ θάνατον πατήσας, καὶ τοῖς ἐν τοῖς μνήμασι, ζωὴν χαρισάμενος.</span> 
			</p></td>
			<td class='rightCell'><p class='hymn'><span class='kvp' data-key='pe.d071_en_US_goa|peMA.Troparion.text'>Christ is risen from the dead, by death trampling down upon death, and to those in the tombs He has granted life.</span> <span class="versiondesignation">[GOA<span class='key' data-key='properties_en_US_goa|version.designation' hidden='hidden'></span>]</span>
			</p></td>
			</tr>
	<tr>
	<td class='leftCell'><p class='actor'><span class='kvp' data-key='actors_gr_GR_cog|ac.Reader'>ΑΝΑΓΝΩΣΤΗΣ</span> 
	</p></td>
	<td class='rightCell'><p class='actor'><span class='kvp' data-key='actors_en_US_goa|ac.Reader'>READER</span> </p></td>
	</tr>`;
    const matinsOrdinaryAscension =
      `<tr>
<td class='leftCell'>
<p class='designation'><span class='kvp' data-key='ho.ho03_gr_GR_cog|hoMA.MatinsOrdinary.title'>Ἀρχὴ τοῦ Ὄρθρου</span> 
</p>
</td>
<td class='rightCell'>
<p class='designation'><span class='kvp' data-key='ho.ho03_en_US_dedes|hoMA.MatinsOrdinary.title'>Beginning of Matins</span> </p>
</td>
</tr>
<tr>
<td class='leftCell'>
<p class='break'>&#xA0;&#xA0;&#xA0;</p>
</td>
<td class='rightCell'>
<p class='break'>&#xA0;&#xA0;&#xA0;</p>
</td>
</tr>
<tr>
<td class='leftCell'><p class='actor'><span class='kvp' data-key='actors_gr_GR_cog|ac.Priest'>ΙΕΡΕΥΣ</span> 
</p></td>
<td class='rightCell'><p class='actor'><span class='kvp' data-key='actors_en_US_goa|ac.Priest'>PRIEST</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialog'><span class='kvp' data-key='prayers_gr_US_goa|pr.enarxis01.text'>Εὐλογητὸς ὁ Θεὸς ἡμῶν πάντοτε, νῦν καὶ ἀεὶ καὶ εἰς τοὺς αἰῶνας τῶν αἰώνων.</span> 
</p></td>
<td class='rightCell'><p class='dialog'><span class='kvp' data-key='prayers_en_US_goa|pr.enarxis01.text'>Blessed is our God always, now and ever and to the ages of ages.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialogwithactor'><span class='actorwithdialog'><span class='kvp' data-key='actors_gr_GR_cog|ac.IL.Reader'>ΑΝΑΓΝΩΣΤΗΣ:</span> 
</span> 
<span class='kvp' data-key='prayers_gr_US_goa|pr.res04.text'>Ἀμήν.</span> 
</p></td>
<td class='rightCell'><p class='dialogwithactor'><span class='actorwithdialog'><span class='kvp' data-key='actors_en_US_goa|ac.IL.Reader'>READER:</span> </span> <span class='kvp' data-key='prayers_en_US_goa|pr.res04.text'>Amen.</span> </p></td>
</tr>
<tr>
<td class='leftCell'>
<p class='designation'><span class='kvp' data-key='titles_gr_GR_cog|ti.Trisagion'>Τρισάγιον.</span> 
</p>
</td>
<td class='rightCell'>
<p class='designation'><span class='kvp' data-key='titles_en_US_dedes|ti.Trisagion'>Trisagion Prayers.</span> </p>
</td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='prayers_gr_US_goa|pr.HolyGod.text'>Ἅγιος ὁ Θεός, ἅγιος Ἰσχυρός, ἅγιος Ἀθάνατος, ἐλέησον ἡμᾶς.</span> 
<span class='red'><span class='kvp' data-key='rubrical_gr_GR_cog|ru.Thrice'>(3)</span> 
</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='prayers_en_US_goa|pr.HolyGod.text'>Holy God, Holy Mighty, Holy Immortal, have mercy on us.</span> <span class='red'><span class='kvp' data-key='rubrical_en_US_goa|ru.Thrice'>(3)</span> </span> </p></td>
</tr>`;
    const matinsOrdinaryNormal =
      `<tr>
<td class='leftCell'>
<p class='designation'><span class='kvp' data-key='ho.ho03_gr_GR_cog|hoMA.MatinsOrdinary.title'>Ἀρχὴ τοῦ Ὄρθρου</span> 
</p>
</td>
<td class='rightCell'>
<p class='designation'><span class='kvp' data-key='ho.ho03_en_US_dedes|hoMA.MatinsOrdinary.title'>Beginning of Matins</span> </p>
</td>
</tr>
<tr>
<td class='leftCell'>
<p class='break'>&#xA0;&#xA0;&#xA0;</p>
</td>
<td class='rightCell'>
<p class='break'>&#xA0;&#xA0;&#xA0;</p>
</td>
</tr>
<tr>
<td class='leftCell'><p class='actor'><span class='kvp' data-key='actors_gr_GR_cog|ac.Priest'>ΙΕΡΕΥΣ</span> 
</p></td>
<td class='rightCell'><p class='actor'><span class='kvp' data-key='actors_en_US_goa|ac.Priest'>PRIEST</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialog'><span class='kvp' data-key='prayers_gr_US_goa|pr.enarxis01.text'>Εὐλογητὸς ὁ Θεὸς ἡμῶν πάντοτε, νῦν καὶ ἀεὶ καὶ εἰς τοὺς αἰῶνας τῶν αἰώνων.</span> 
</p></td>
<td class='rightCell'><p class='dialog'><span class='kvp' data-key='prayers_en_US_goa|pr.enarxis01.text'>Blessed is our God always, now and ever and to the ages of ages.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialogwithactor'><span class='actorwithdialog'><span class='kvp' data-key='actors_gr_GR_cog|ac.IL.Reader'>ΑΝΑΓΝΩΣΤΗΣ:</span> 
</span> 
<span class='kvp' data-key='prayers_gr_US_goa|pr.res04.text'>Ἀμήν.</span> 
</p></td>
<td class='rightCell'><p class='dialogwithactor'><span class='actorwithdialog'><span class='kvp' data-key='actors_en_US_goa|ac.IL.Reader'>READER:</span> </span> <span class='kvp' data-key='prayers_en_US_goa|pr.res04.text'>Amen.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='actor'><span class='kvp' data-key='actors_gr_GR_cog|ac.Priest'>ΙΕΡΕΥΣ</span> 
</p></td>
<td class='rightCell'><p class='actor'><span class='kvp' data-key='actors_en_US_goa|ac.Priest'>PRIEST</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='prayers_gr_US_goa|pr.GloryToYouOurGod.text'>Δόξα σοι ὁ Θεὸς ἡμῶν, δόξα σοι.</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='prayers_en_US_goa|pr.GloryToYouOurGod.text'>Glory to You, our God, glory to You.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='prayers_gr_US_goa|pr.HeavenlyKing.text'>Βασιλεῦ οὐράνιε, Παράκλητε, τὸ Πνεῦμα τῆς ἀληθείας, ὁ πανταχοῦ παρὼν καὶ τὰ πάντα πληρῶν, ὁ θησαυρὸς τῶν ἀγαθῶν καὶ ζωῆς χορηγός, ἐλθὲ καὶ σκήνωσον ἐν ἡμῖν καὶ καθάρισον ἡμᾶς ἀπὸ πάσης κηλῖδος καὶ σῷσον, Ἀγαθέ, τὰς ψυχὰς ἡμῶν.</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='prayers_en_US_goa|pr.HeavenlyKing.text'>Heavenly King, Comforter, Spirit of Truth, present in all places and filling all things, treasury of good things and giver of life: come; take Your abode in us; cleanse us of every stain, and save our souls, O Good one.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialogwithactor'><span class='actorwithdialog'><span class='kvp' data-key='actors_gr_GR_cog|ac.IL.Reader'>ΑΝΑΓΝΩΣΤΗΣ:</span> 
</span> 
<span class='kvp' data-key='prayers_gr_US_goa|pr.res04.text'>Ἀμήν.</span> 
</p></td>
<td class='rightCell'><p class='dialogwithactor'><span class='actorwithdialog'><span class='kvp' data-key='actors_en_US_goa|ac.IL.Reader'>READER:</span> </span> <span class='kvp' data-key='prayers_en_US_goa|pr.res04.text'>Amen.</span> </p></td>
</tr>
<tr>
<td class='leftCell'>
<p class='designation'><span class='kvp' data-key='titles_gr_GR_cog|ti.Trisagion'>Τρισάγιον.</span> 
</p>
</td>
<td class='rightCell'>
<p class='designation'><span class='kvp' data-key='titles_en_US_dedes|ti.Trisagion'>Trisagion Prayers.</span> </p>
</td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='prayers_gr_US_goa|pr.HolyGod.text'>Ἅγιος ὁ Θεός, ἅγιος Ἰσχυρός, ἅγιος Ἀθάνατος, ἐλέησον ἡμᾶς.</span> 
<span class='red'><span class='kvp' data-key='rubrical_gr_GR_cog|ru.Thrice'>(3)</span> 
</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='prayers_en_US_goa|pr.HolyGod.text'>Holy God, Holy Mighty, Holy Immortal, have mercy on us.</span> <span class='red'><span class='kvp' data-key='rubrical_en_US_goa|ru.Thrice'>(3)</span> </span> </p></td>
</tr>`;
    const matinsOrdinary_part2 =
      `<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='prayers_gr_US_goa|pr.GloryToTheFather.text'>Δόξα Πατρὶ καὶ Υἱῷ καὶ ἁγίῳ Πνεύματι.</span> 
<span class='kvp' data-key='prayers_gr_US_goa|pr.BothNowAndEver.text'>Καὶ νῦν καὶ ἀεὶ καὶ εἰς τοὺς αἰῶνας τῶν αἰώνων. Ἀμήν.</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='prayers_en_US_goa|pr.GloryToTheFather.text'>Glory to the Father and the Son and the Holy Spirit.</span> <span class='kvp' data-key='prayers_en_US_goa|pr.BothNowAndEver.text'>Both now and ever and to the ages of ages. Amen.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='prayers_gr_US_goa|pr.AllHolyTrinity.text'>Παναγία Τριάς, ἐλέησον ἡμᾶς. Κύριε, ἱλάσθητι ταῖς ἁμαρτίαις ἡμῶν. Δέσποτα, συγχώρησον τὰς ἀνομίας ἡμῖν. Ἅγιε, ἐπίσκεψαι καὶ ἴασαι τὰς ἀσθενείας ἡμῶν, ἕνεκεν τοῦ ὀνόματός σου.</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='prayers_en_US_goa|pr.AllHolyTrinity.text'>All-holy Trinity, have mercy on us. Lord, forgive our sins. Master, pardon our transgressions. Holy One, visit and heal our infirmities for Your name’s sake.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='prayers_gr_US_goa|pr.res06.text'>Κύριε, ἐλέησον. Κύριε, ἐλέησον. Κύριε, ἐλέησον.</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='prayers_en_US_goa|pr.res06.text'>Lord, have mercy. Lord, have mercy. Lord, have mercy.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='prayers_gr_US_goa|pr.GloryToTheFather.text'>Δόξα Πατρὶ καὶ Υἱῷ καὶ ἁγίῳ Πνεύματι.</span> 
<span class='kvp' data-key='prayers_gr_US_goa|pr.BothNowAndEver.text'>Καὶ νῦν καὶ ἀεὶ καὶ εἰς τοὺς αἰῶνας τῶν αἰώνων. Ἀμήν.</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='prayers_en_US_goa|pr.GloryToTheFather.text'>Glory to the Father and the Son and the Holy Spirit.</span> <span class='kvp' data-key='prayers_en_US_goa|pr.BothNowAndEver.text'>Both now and ever and to the ages of ages. Amen.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='prayers_gr_US_goa|pr.OurFather.text'>Πάτερ ἡμῶν ὁ ἐν τοῖς οὐρανοῖς, ἁγιασθήτω τὸ ὄνομά σου. Ἐλθέτω ἡ βασιλεία σου. Γενηθήτω τὸ θέλημά σου, ὡς ἐν οὐρανῷ καὶ ἐπὶ τῆς γῆς. Τὸν ἄρτον ἡμῶν τὸν ἐπιούσιον δὸς ἡμῖν σήμερον. Καὶ ἄφες ἡμῖν τὰ ὀφειλήματα ἡμῶν, ὡς καὶ ἡμεῖς ἀφίεμεν τοῖς ὀφειλέταις ἡμῶν. Καὶ μὴ εἰσενέγκῃς ἡμᾶς εἰς πειρασμόν, ἀλλὰ ῥῦσαι ἡμᾶς ἀπὸ τοῦ πονηροῦ.</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='prayers_en_US_goa|pr.OurFather.text'>Our Father, who art in heaven, hallowed be Thy name. Thy kingdom come, Thy will be done, on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses, as we forgive those who trespass against us. And lead us not into temptation, but deliver us from evil.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='actor'><span class='kvp' data-key='actors_gr_GR_cog|ac.Priest'>ΙΕΡΕΥΣ</span> 
</p></td>
<td class='rightCell'><p class='actor'><span class='kvp' data-key='actors_en_US_goa|ac.Priest'>PRIEST</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialog'><span class='kvp' data-key='prayers_gr_US_goa|pr.exc20.text'>Ὅτι σοῦ ἐστιν ἡ βασιλεία καὶ ἡ δύναμις καὶ ἡ δόξα τοῦ Πατρὸς καὶ τοῦ Υἱοῦ καὶ τοῦ ἁγίου Πνεύματος, νῦν καὶ ἀεὶ καὶ εἰς τοὺς αἰῶνας τῶν αἰώνων.</span> 
</p></td>
<td class='rightCell'><p class='dialog'><span class='kvp' data-key='prayers_en_US_goa|pr.exc20.text'>For Thine is the kingdom and the power and the glory, of the Father and the Son and the Holy Spirit, now and ever and to ages of ages.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialogwithactor'><span class='actorwithdialog'><span class='kvp' data-key='actors_gr_GR_cog|ac.IL.Reader'>ΑΝΑΓΝΩΣΤΗΣ:</span> 
</span> 
<span class='kvp' data-key='prayers_gr_US_goa|pr.res04.text'>Ἀμήν.</span> 
</p></td>
<td class='rightCell'><p class='dialogwithactor'><span class='actorwithdialog'><span class='kvp' data-key='actors_en_US_goa|ac.IL.Reader'>READER:</span> </span> <span class='kvp' data-key='prayers_en_US_goa|pr.res04.text'>Amen.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='me.m09.d14_gr_GR_cog|meVE.Apolytikion1.text'>Σῶσον, Κύριε, τὸν λαόν σου καὶ εὐλόγησον τὴν κληρονομίαν σου, νίκας τοῖς βασιλεῦσι κατὰ βαρβάρων δωρούμενος, καὶ τὸ σὸν φυλάττων διὰ τοῦ Σταυροῦ σου πολίτευμα.</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='me.m09.d14_en_US_goa|meVE.Apolytikion1.text'>Save, O Lord, Your people and bless Your inheritance, granting victory to the faithful over the enemy, and by Your Cross protecting Your commonwealth.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='verse'><span class='kvp' data-key='prayers_gr_US_goa|pr.GloryToTheFather.text'>Δόξα Πατρὶ καὶ Υἱῷ καὶ ἁγίῳ Πνεύματι.</span> 
</p></td>
<td class='rightCell'><p class='verse'><span class='kvp' data-key='prayers_en_US_goa|pr.GloryToTheFather.text'>Glory to the Father and the Son and the Holy Spirit.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='he.a.m4_gr_GR_cog|heAU.OYpsotheisEnToStavro.text'>Ὁ ὑψωθεὶς ἐν τῷ Σταυρῷ ἑκουσίως, τῇ ἐπωνύμῳ σου καινῇ πολιτείᾳ τοὺς οἰκτιρμούς σου δώρησαι, Χριστὲ ὁ Θεός· εὔφρανον ἐν τῇ δυνάμει σου τοὺς πιστοὺς βασιλεῖς ἡμῶν, νίκας χορηγῶν αὐτοῖς κατὰ τῶν πολεμίων· τὴν συμμαχίαν ἔχοιεν τὴν σήν, ὅπλον εἰρήνης, ἀήττητον τρόπαιον.</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='he.a.m4_en_US_dedes|heAU.OYpsotheisEnToStavro.text'>You who were lifted on the cross voluntarily, * O Christ our God, bestow Your tender compassions * upon Your new community to which You gave Your name. * Cause our faithful emperors to be glad in Your power, * granting them the victories against their adversaries. * And for an ally, Lord, may they have You, * peace as their armor, the trophy invincible.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='verse'><span class='kvp' data-key='prayers_gr_US_goa|pr.BothNowAndEver.text'>Καὶ νῦν καὶ ἀεὶ καὶ εἰς τοὺς αἰῶνας τῶν αἰώνων. Ἀμήν.</span> 
</p></td>
<td class='rightCell'><p class='verse'><span class='kvp' data-key='prayers_en_US_goa|pr.BothNowAndEver.text'>Both now and ever and to the ages of ages. Amen.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='ho.ho03_gr_GR_cog|hoMA.Troparion3.text'>Προστασία φοβερὰ καὶ ἀκαταίσχυντε, μὴ παρίδῃς, Ἀγαθή, τὰς ἱκεσίας ἡμῶν, πανύμνητε Θεοτόκε· στήριξον Ὀρθοδόξων πολιτείαν, σῷζε οὓς ἐκέλευσας βασιλεύειν, καὶ χορήγει αὐτοῖς οὐρανόθεν τὴν νίκην· διότι ἔτεκες τὸν Θεόν, μόνη εὐλογημένη.</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='ho.ho03_en_US_holycross|hoMA.Troparion3.text'>O awesome and unshamable Protection, O good and praiseworthy Theotokos, do not despise our petitions; make firm the community of the Orthodox; save those whom you have called to rule; grant them victory from heaven, for you gave birth to God and are truly blessed.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='actor'><span class='kvp' data-key='actors_gr_GR_cog|ac.Priest'>ΙΕΡΕΥΣ</span> 
</p></td>
<td class='rightCell'><p class='actor'><span class='kvp' data-key='actors_en_US_goa|ac.Priest'>PRIEST</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialog'><span class='kvp' data-key='prayers_gr_US_goa|pr.pet17.text'>Ἐλέησον ἡμᾶς, ὁ Θεός, κατὰ τὸ μέγα ἔλεός σου, δεόμεθά σου, ἐπάκουσον καὶ ἐλέησον.</span> 
</p></td>
<td class='rightCell'><p class='dialog'><span class='kvp' data-key='prayers_en_US_goa|pr.pet17.text'>Have mercy on us, O God, according to Your great mercy, we pray You, hear us and have mercy.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='actor'><span class='kvp' data-key='actors_gr_GR_cog|ac.Choir'>ΧΟΡΟΣ</span> 
</p></td>
<td class='rightCell'><p class='actor'><span class='kvp' data-key='actors_en_US_goa|ac.Choir'>CHOIR</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialog'><span class='kvp' data-key='prayers_gr_US_goa|pr.res01.text'>Κύριε, ἐλέησον.</span> 
<span class='red'><span class='kvp' data-key='rubrical_gr_GR_cog|ru.Thrice'>(3)</span> 
</span> 
</p></td>
<td class='rightCell'><p class='dialog'><span class='kvp' data-key='prayers_en_US_goa|pr.res01.text'>Lord, have mercy.</span> <span class='red'><span class='kvp' data-key='rubrical_en_US_goa|ru.Thrice'>(3)</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='actor'><span class='kvp' data-key='actors_gr_GR_cog|ac.Priest'>ΙΕΡΕΥΣ</span> 
</p></td>
<td class='rightCell'><p class='actor'><span class='kvp' data-key='actors_en_US_goa|ac.Priest'>PRIEST</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialog'><span class='kvp' data-key='prayers_gr_US_goa|pr.pet18.text'>Ἔτι δεόμεθα ὑπὲρ τῶν εὐσεβῶν καὶ ὀρθοδόξων χριστιανῶν.</span> 
</p></td>
<td class='rightCell'><p class='dialog'><span class='kvp' data-key='prayers_en_US_goa|pr.pet18.text'>Again we pray for pious and Orthodox Christians.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='actor'><span class='kvp' data-key='actors_gr_GR_cog|ac.Choir'>ΧΟΡΟΣ</span> 
</p></td>
<td class='rightCell'><p class='actor'><span class='kvp' data-key='actors_en_US_goa|ac.Choir'>CHOIR</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialog'><span class='kvp' data-key='prayers_gr_US_goa|pr.res01.text'>Κύριε, ἐλέησον.</span> 
<span class='red'><span class='kvp' data-key='rubrical_gr_GR_cog|ru.Thrice'>(3)</span> 
</span> 
</p></td>
<td class='rightCell'><p class='dialog'><span class='kvp' data-key='prayers_en_US_goa|pr.res01.text'>Lord, have mercy.</span> <span class='red'><span class='kvp' data-key='rubrical_en_US_goa|ru.Thrice'>(3)</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='actor'><span class='kvp' data-key='actors_gr_GR_cog|ac.Priest'>ΙΕΡΕΥΣ</span> 
</p></td>
<td class='rightCell'><p class='actor'><span class='kvp' data-key='actors_en_US_goa|ac.Priest'>PRIEST</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialog'><span class='kvp' data-key='prayers_gr_US_goa|pr.pet19Sa.text'>Ἔτι δεόμεθα ὑπὲρ</span> 
<span class='kvp' data-key='client_gr_US_goa|cl.bishop1.rank'>τοῦ Ἀρχιεπισκόπου ἡμῶν</span> 
<span class='kvp' data-key='client_gr_US_goa|cl.bishop1.name_p'>(δεῖνος).</span> 
</p></td>
<td class='rightCell'><p class='dialog'><span class='kvp' data-key='prayers_en_US_goa|pr.pet19Sa.text'>Again we pray for</span> <span class='kvp' data-key='client_en_US_goa|cl.bishop1.rank'>our Archbishop</span> <span class='kvp' data-key='client_en_US_goa|cl.bishop1.name_p'>(name).</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='actor'><span class='kvp' data-key='actors_gr_GR_cog|ac.Choir'>ΧΟΡΟΣ</span> 
</p></td>
<td class='rightCell'><p class='actor'><span class='kvp' data-key='actors_en_US_goa|ac.Choir'>CHOIR</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialog'><span class='kvp' data-key='prayers_gr_US_goa|pr.res01.text'>Κύριε, ἐλέησον.</span> 
<span class='red'><span class='kvp' data-key='rubrical_gr_GR_cog|ru.Thrice'>(3)</span> 
</span> 
</p></td>
<td class='rightCell'><p class='dialog'><span class='kvp' data-key='prayers_en_US_goa|pr.res01.text'>Lord, have mercy.</span> <span class='red'><span class='kvp' data-key='rubrical_en_US_goa|ru.Thrice'>(3)</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='actor'><span class='kvp' data-key='actors_gr_GR_cog|ac.Priest'>ΙΕΡΕΥΣ</span> 
</p></td>
<td class='rightCell'><p class='actor'><span class='kvp' data-key='actors_en_US_goa|ac.Priest'>PRIEST</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialog'><span class='kvp' data-key='prayers_gr_US_goa|pr.exc11.text'>Ὅτι ἐλεήμων καὶ φιλάνθρωπος Θεὸς ὑπάρχεις, καὶ σοὶ τὴν δόξαν ἀναπέμπομεν, τῷ Πατρὶ καὶ τῷ Υἱῷ καὶ τῷ ἁγίῳ Πνεύματι, νῦν καὶ ἀεὶ καὶ εἰς τοὺς αἰῶνας τῶν αἰώνων.</span> 
</p></td>
<td class='rightCell'><p class='dialog'><span class='kvp' data-key='prayers_en_US_goa|pr.exc11.text'>For You are merciful and benevolent God, and to You we offer up glory, to the Father and the Son and the Holy Spirit, now and ever and to the ages of ages.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='actor'><span class='kvp' data-key='actors_gr_GR_cog|ac.Choir'>ΧΟΡΟΣ</span> 
</p></td>
<td class='rightCell'><p class='actor'><span class='kvp' data-key='actors_en_US_goa|ac.Choir'>CHOIR</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialog'><span class='kvp' data-key='prayers_gr_US_goa|pr.res04.text'>Ἀμήν.</span> 
<span class='kvp' data-key='prayers_gr_US_goa|pr.InTheNameOfLordBless_father.text'>Ἐν ὀνόματι Κυρίου εὐλόγησον, πάτερ.</span> 
</p></td>
<td class='rightCell'><p class='dialog'><span class='kvp' data-key='prayers_en_US_goa|pr.res04.text'>Amen.</span> <span class='kvp' data-key='prayers_en_US_goa|pr.InTheNameOfLordBless_father.text'>In the name of the Lord, Father, bless!</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='actor'><span class='kvp' data-key='actors_gr_GR_cog|ac.Priest'>ΙΕΡΕΥΣ</span> 
</p></td>
<td class='rightCell'><p class='actor'><span class='kvp' data-key='actors_en_US_goa|ac.Priest'>PRIEST</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialog'><span class='kvp' data-key='prayers_gr_US_goa|pr.enarxis03.text'>Δόξα τῇ ἁγίᾳ καὶ ὁμοουσίῳ καὶ ζωοποιῷ καὶ ἀδιαιρέτῳ Τριάδι πάντοτε, νῦν καὶ ἀεὶ καὶ εἰς τοὺς αἰῶνας τῶν αἰώνων.</span> 
</p></td>
<td class='rightCell'><p class='dialog'><span class='kvp' data-key='prayers_en_US_goa|pr.enarxis03.text'>Glory to the holy and consubstantial and life-creating and undivided Trinity always, now and ever and to the ages of ages.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialogwithactor'><span class='actorwithdialog'><span class='kvp' data-key='actors_gr_GR_cog|ac.IL.Choir'>ΧΟΡΟΣ:</span> 
</span> 
<span class='kvp' data-key='prayers_gr_US_goa|pr.res04.text'>Ἀμήν.</span> 
</p></td>
<td class='rightCell'><p class='dialogwithactor'><span class='actorwithdialog'><span class='kvp' data-key='actors_en_US_goa|ac.IL.Choir'>CHOIR:</span> </span> <span class='kvp' data-key='prayers_en_US_goa|pr.res04.text'>Amen.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='bkmrk01'><span class='kvp' data-key='miscellanea_gr_GR_cog|misc.bookmark'>bookmark</span> 
</p></td>
<td class='rightCell'><p class='bkmrk01'><span class='kvp' data-key='miscellanea_en_US_dedes|misc.bookmark'>bookmark</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='rubric'><span class='kvp' data-key='hi.hi04_gr_US_goa|hiMA.R101'>Εἶτα ὁ Προεστὼς ἢ ὁ Ἀναγνώστης ἀναγινώσκει εὐκρινῶς τὸν Ἑξάψαλμον, ἀκροωμένων πάντων ἐν σιωπῇ καὶ κατανύξει.</span> 
</p></td>
<td class='rightCell'><p class='rubric'><span class='kvp' data-key='hi.hi04_en_US_dedes|hiMA.R101'>Then the appointed Reader reverently reads the Six Psalms. The congregation should remain standing during this reading.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='rubric'><span class='kvp' data-key='rubrical_gr_GR_cog|ru.standing.prefix'>Ὁ λαὸς ἵσταται</span> 
<span class='kvp' data-key='rubrical_gr_GR_cog|ru.standing.matins.sixpsalms'>διὰ τὴν ἀνάγνωσιν τοῦ Ἑξαψάλμου.</span> 
</p></td>
<td class='rightCell'><p class='rubric'><span class='kvp' data-key='rubrical_en_US_dedes|ru.standing.prefix'>Stand</span> <span class='kvp' data-key='rubrical_en_US_dedes|ru.standing.matins.sixpsalms'>for the reading of the Six Psalms.</span> </p></td>
</tr>
</tr>
<tr>
<td class='leftCell'><p class='actor'><span class='kvp' data-key='actors_gr_GR_cog|ac.Reader'>ΑΝΑΓΝΩΣΤΗΣ</span> 
</p></td>
<td class='rightCell'><p class='actor'><span class='kvp' data-key='actors_en_US_goa|ac.Reader'>READER</span> </p></td>
</tr>
<tr>
<td class='leftCell'>
<p class='designation'><span class='kvp' data-key='ho.ho03_gr_GR_cog|SixPsalms.title'>Ὁ Ἐξάψαλμος.</span> 
</p>
</td>
<td class='rightCell'>
<p class='designation'><span class='kvp' data-key='ho.ho03_en_US_goa|SixPsalms.title'>The Six Psalms</span> </p>
</td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='le.go.os_gr_GR_cog|leosMA.SixPsalmsIntro1.text'>Δόξα ἐν ὑψίστοις Θεῷ καὶ ἐπὶ γῆς εἰρήνη, ἐν ἀνθρώποις εὐδοκία.</span> 
<span class='italicsred'><span class='kvp' data-key='rubrical_gr_GR_cog|ru.Thrice'>(3)</span> 
</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='le.go.os_en_US_rsv|leosMA.SixPsalmsIntro1.text'>Glory to God in the highest, and on earth peace, good will among men.</span> <span class='italicsred'><span class='kvp' data-key='rubrical_en_US_goa|ru.Thrice'>(3)</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='liturgical.verses_gr_GR_cog|psMA.sixpsalms.intro.v2.text'>Κύριε, τὰ χείλη μου ἀνοίξεις, καὶ τὸ στόμα μου ἀναγγελεῖ τὴν αἴνεσίν σου.</span> 
<span class='italicsred'><span class='kvp' data-key='rubrical_gr_GR_cog|ru.Twice'>(δίς)</span> 
</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='liturgical.verses_en_US_saas|psMA.sixpsalms.intro.v2.text'>O Lord, You shall open my lips, and my mouth will declare Your praise.</span> <span class='italicsred'><span class='kvp' data-key='rubrical_en_US_dedes|ru.Twice'>(2)</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'>
<p class='designation'><span class='kvp' data-key='ps_gr_GR_cog|psa3.title'>Ψαλμὸς Γʹ (3).</span> 
</p>
</td>
<td class='rightCell'>
<p class='designation'><span class='kvp' data-key='ps_en_US_saas|psa3.title'>Psalm 3.</span> </p>
</td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='ps_gr_GR_cog|psa3.text'>Κύριε, τί ἐπληθύνθησαν οἱ θλίβοντές με; Πολλοὶ ἐπανίστανται ἐπʼ ἐμέ. Πολλοὶ λέγουσι τῇ ψυχῇ μου· Οὐκ ἔστι σωτηρία αὐτῷ ἐν τῷ Θεῷ αὐτοῦ. Σὺ δέ, Κύριε, ἀντιλήπτωρ μου εἶ, δόξα μου καὶ ὑψῶν τὴν κεφαλήν μου. Φωνῇ μου πρὸς Κύριον ἐκέκραξα, καὶ ἐπήκουσέ μου ἐξ ὄρους ἁγίου αὐτοῦ. Ἐγὼ δὲ ἐκοιμήθην καὶ ὕπνωσα· ἐξηγέρθην, ὅτι Κύριος ἀντιλήψεταί μου. Οὐ φοβηθήσομαι ἀπὸ μυριάδων λαοῦ τῶν κύκλῳ συνεπιτιθεμένων μοι. Ἀνάστα, Κύριε, σῶσόν με ὁ Θεός μου, ὅτι σὺ ἐπάταξας πάντας τοὺς ἐχθραίνοντάς μοι ματαίως, ὀδόντας ἁμαρτωλῶν συνέτριψας. Τοῦ Κυρίου ἡ σωτηρία, καὶ ἐπὶ τὸν λαόν σου ἡ εὐλογία σου.</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='ps_en_US_saas|psa3.text'>O Lord, why do those who afflict me multiply? Many are those who rise up against me. Many are those who say to my soul, “There is no salvation for him in his God.” But You, O Lord, are my protector, my glory and the One who lifts up my head. I cried to the Lord with my voice, and He heard me from His holy hill. I lay down and slept; I awoke, for the Lord will help me. I will not be afraid of ten thousands of people who set themselves against me all around. Arise, O Lord, and save me, O my God, for You struck all those who were foolishly at enmity with me; You broke the teeth of sinners. Salvation is of the Lord, and Your blessing is upon Your people.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='liturgical.verses_gr_GR_cog|psMA.sixpsalms.ps3.end.v1.text'>Ἐγὼ ἐκοιμήθην καὶ ὕπνωσα· ἐξηγέρθην, ὅτι Κύριος ἀντιλήψεταί μου.</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='liturgical.verses_en_US_saas|psMA.sixpsalms.ps3.end.v1.text'>I lay down and slept; I awoke, for the Lord will help me.</span> <span class="versiondesignation">[SAAS<span class='key' data-key='properties_en_US_saas|version.designation' hidden='hidden'></span>]</span>
</p></td>
</tr>
<tr>
<td class='leftCell'>
<p class='designation'><span class='kvp' data-key='ps_gr_GR_cog|psa37.title'>Ψαλμὸς ΛΖʹ (37).</span> 
</p>
</td>
<td class='rightCell'>
<p class='designation'><span class='kvp' data-key='ps_en_US_saas|psa37.title'>Psalm 37 (38).</span> </p>
</td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='ps_gr_GR_cog|psa37.text'>Κύριε, μὴ τῷ θυμῷ σου ἐλέγξῃς με, μηδὲ τῇ ὀργῇ σου παιδεύσῃς με. Ὅτι τὰ βέλη σου ἐνεπάγησάν μοι, καὶ ἐπεστήριξας ἐπʼ ἐμὲ τὴν χεῖρά σου. Οὐκ ἔστιν ἴασις ἐν τῇ σαρκί μου ἀπὸ προσώπου τῆς ὀργῆς σου, οὐκ ἔστιν εἰρήνη ἐν τοῖς ὀστέοις μου ἀπὸ προσώπου τῶν ἁμαρτιῶν μου. Ὅτι αἱ ἀνομίαι μου ὑπερῇραν τὴν κεφαλήν μου, ὡσεὶ φορτίον βαρὺ ἐβαρύνθησαν ἐπʼ ἐμέ. Προσώζεσαν καὶ ἐσάπησαν οἱ μώλωπές μου ἀπὸ προσώπου τῆς ἀφροσύνης μου. Ἐταλαιπώρησα καὶ κατεκάμφθην ἕως τέλους, ὅλην τὴν ἡμέραν σκυθρωπάζων ἐπορευόμην. Ὅτι αἱ ψόαι μου ἐπλήσθησαν ἐμπαιγμάτων, καὶ οὐκ ἔστιν ἴασις ἐν τῇ σαρκί μου. Ἐκακώθην καὶ ἐταπεινώθην ἕως σφόδρα, ὠρυόμην ἀπὸ στεναγμοῦ τῆς καρδίας μου. Κύριε, ἐναντίον σου πᾶσα ἡ ἐπιθυμία μου, καὶ ὁ στεναγμός μου ἀπὸ σοῦ οὐκ ἀπεκρύβη. Ἡ καρδία μου ἐταράχθη, ἐγκατέλιπέ με ἡ ἰσχύς μου, καὶ τὸ φῶς τῶν ὀφθαλμῶν μου καὶ αὐτὸ οὐκ ἔστι μετʼ ἐμοῦ. Οἱ φίλοι μου καὶ οἱ πλησίον μου ἐξεναντίας μου ἤγγισαν καὶ ἔστησαν, καὶ οἱ ἔγγιστά μου ἀπὸ μακρόθεν ἔστησαν. Καὶ ἐξεβιάζοντο οἱ ζητοῦντες τὴν ψυχήν μου, καὶ οἱ ζητοῦντες τὰ κακά μοι ἐλάλησαν ματαιότητας, καὶ δολιότητας ὅλην τὴν ἡμέραν ἐμελέτησαν. Ἐγὼ δὲ ὡσεὶ κωφὸς οὐκ ἤκουον καὶ ὡσεὶ ἄλαλος οὐκ ἀνοίγων τὸ στόμα αὐτοῦ. Καὶ ἐγενόμην ὡσεὶ ἄνθρωπος οὐκ ἀκούων καὶ οὐκ ἔχων ἐν τῷ στόματι αὐτοῦ ἐλεγμούς. Ὅτι ἐπὶ σοί, Κύριε, ἤλπισα· σὺ εἰσακούσῃ, Κύριε ὁ Θεός μου. Ὅτι εἶπον· Μήποτε ἐπιχαρῶσί μοι οἱ ἐχθροί μου· καὶ ἐν τῷ σαλευθῆναι πόδας μου ἐπʼ ἐμὲ ἐμεγαλοῤῥημόνησαν. Ὅτι ἐγὼ εἰς μάστιγας ἕτοιμος, καὶ ἡ ἀλγηδών μου ἐνώπιόν μού ἐστι διὰ παντός. Ὅτι τὴν ἀνομίαν μου ἐγὼ ἀναγγελῶ καὶ μεριμνήσω ὑπὲρ τῆς ἁμαρτίας μου. Οἱ δὲ ἐχθροί μου ζῶσι καὶ κεκραταίωνται ὑπὲρ ἐμέ, καὶ ἐπληθύνθησαν οἱ μισοῦντές με ἀδίκως. Οἱ ἀνταποδιδόντες μοι κακὰ ἀντὶ ἀγαθῶν ἐνδιέβαλλόν με, ἐπεὶ κατεδίωκον ἀγαθωσύνην. Μὴ ἐγκαταλίπῃς με, Κύριε ὁ Θεός μου, μὴ ἀποστῇς ἀπʼ ἐμοῦ. Πρόσχες εἰς τὴν βοήθειάν μου, Κύριε τῆς σωτηρίας μου.</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='ps_en_US_saas|psa37.text'>O Lord, do not rebuke me in Your wrath, nor chasten me in Your anger. For Your arrows are fixed in me, and Your hand rests on me; there is no healing in my flesh because of Your wrath; there is no peace in my bones because of my sins. For my transgressions rise up over my head; like a heavy burden they are heavy on me. My wounds grow foul and fester because of my folly. I suffer misery, and I am utterly bowed down; I go all the day long with a sad face. For my loins are filled with mockeries, and there is no healing in my flesh. I am afflicted and greatly humbled; I roar because of the groaning of my heart. O Lord, all my desire is before You, and my groaning is not hidden from You. My heart is troubled; my strength fails me, and the light of my eyes, even this is not with me. My friends and neighbors draw near and stand against me, and my near of kin stand far off; and those who seek my soul use violence, and those who seek evil for me speak folly; and they meditate on deceit all the day long. But I like a deaf man do not hear, and I am like a mute who does not open his mouth. I am like a man who does not hear, and who has no reproofs in his mouth. For in You, O Lord, I hope; You will hear, O Lord my God. For I said, “Let not my enemies rejoice over me, for when my foot was shaken, they boasted against me.” For I am ready for wounds, and my pain is continually with me. For I will declare my transgression, and I will be anxious about my sin. But my enemies live, and are become stronger than I; and those who hate me unjustly are multiplied; those who repaid me evil for good slandered me, because I pursue righteousness; and they threw away my love as though it were a stinking corpse. Do not forsake me, O Lord; O my God, do not depart from me; give heed to help me, O Lord of my salvation.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='liturgical.verses_gr_GR_cog|psMA.sixpsalms.ps37.end.v1.text'>Μὴ ἐγκαταλίπῃς με, Κύριε· ὁ Θεός μου, μὴ ἀποστῇς ἀπʼ ἐμοῦ· πρόσχες εἰς τὴν βοήθειάν μου, Κύριε τῆς σωτηρίας μου.</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='liturgical.verses_en_US_saas|psMA.sixpsalms.ps37.end.v1.text'>Do not forsake me, O Lord; O my God, do not depart from me. Give heed to help me, O Lord of my salvation.</span> <span class="versiondesignation">[SAAS<span class='key' data-key='properties_en_US_saas|version.designation' hidden='hidden'></span>]</span>
</p></td>
</tr>
<tr>
<td class='leftCell'>
<p class='designation'><span class='kvp' data-key='ps_gr_GR_cog|psa62.title'>Ψαλμὸς ΞΒʹ (62).</span> 
</p>
</td>
<td class='rightCell'>
<p class='designation'><span class='kvp' data-key='ps_en_US_saas|psa62.title'>Psalm 62 (63).</span> </p>
</td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='ps_gr_GR_cog|psa62.text'>Ὁ Θεὸς ὁ Θεός μου, πρὸς σὲ ὀρθρίζω. Ἐδίψησέ σε ἡ ψυχή μου, ποσαπλῶς σοι ἡ σάρξ μου, ἐν γῇ ἐρήμῳ καὶ ἀβάτῳ καὶ ἀνύδρῳ. Οὕτως ἐν τῷ ἁγίῳ ὤφθην σοι τοῦ ἰδεῖν τὴν δύναμίν σου καὶ τὴν δόξαν σου. Ὅτι κρεῖσσον τὸ ἔλεός σου ὑπὲρ ζωάς· τὰ χείλη μου ἐπαινέσουσί σε. Οὕτως εὐλογήσω σε ἐν τῇ ζωῇ μου, καὶ ἐν τῷ ὀνόματί σου ἀρῶ τὰς χεῖράς μου. Ὡς ἐκ στέατος καὶ πιότητος ἐμπλησθείη ἡ ψυχή μου, καὶ χείλη ἀγαλλιάσεως αἰνέσει τὸ στόμα μου. Εἰ ἐμνημόνευόν σου ἐπὶ τῆς στρωμνῆς μου, ἐν τοῖς ὄρθροις ἐμελέτων εἰς σέ· ὅτι ἐγενήθης βοηθός μου, καὶ ἐν τῇ σκέπῃ τῶν πτερύγων σου ἀγαλλιάσομαι. Ἐκολλήθη ἡ ψυχή μου ὀπίσω σου, ἐμοῦ δὲ ἀντελάβετο ἡ δεξιά σου. Αὐτοὶ δὲ εἰς μάτην ἐζήτησαν τὴν ψυχήν μου, εἰσελεύσονται εἰς τὰ κατώτατα τῆς γῆς· παραδοθήσονται εἰς χεῖρας ῥομφαίας, μερίδες ἀλωπέκων ἔσονται. Ὁ δὲ βασιλεὺς εὐφρανθήσεται ἐπὶ τῷ Θεῷ, ἐπαινεθήσεται πᾶς ὁ ὀμνύων ἐν αὐτῷ, ὅτι ἐνεφράγη στόμα λαλούντων ἄδικα.</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='ps_en_US_saas|psa62.text'>O God, my God, I rise early to be with You; my soul thirsts for You. How often my flesh thirsts for You in a desolate, impassable, and waterless land. So in the holy place I appear before You, to see Your power and Your glory. Because Your mercy is better than life, my lips shall praise You. Thus I will bless You in my life; I will lift up my hands in Your name. May my soul be filled, as if with marrow and fatness, and my mouth shall sing praise to You with lips filled with rejoicing. If I remembered You on my bed, I meditated on You at daybreak; for You are my helper, and in the shelter of Your wings I will greatly rejoice. My soul follows close behind You; Your right hand takes hold of me. But they seek for my soul in vain; they shall go into the lowest parts of the earth. They shall be given over to the edge of the sword; they shall be a portion for foxes. But the king shall be glad in God; all who swear by Him shall be praised, for the mouth that speaks unrighteous things is stopped.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='liturgical.verses_gr_GR_cog|psMA.sixpsalms.ps62.end.v1.text'>Ἐν τοῖς ὄρθροις ἐμελέτων εἰς σέ· ὅτι ἐγενήθης βοηθός μου, καὶ ἐν τῇ σκέπῃ τῶν πτερύγων σου ἀγαλλιάσομαι.</span> 
<span class='kvp' data-key='liturgical.verses_gr_GR_cog|psMA.sixpsalms.ps62.end.v2.text'>Ἐκολλήθη ἡ ψυχή μου ὀπίσω σου, ἐμοῦ δὲ ἀντελάβετο ἡ δεξιά σου.</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='liturgical.verses_en_US_saas|psMA.sixpsalms.ps62.end.v1.text'>I meditated on You at daybreak. For You are my helper, and in the shelter of Your wings I will greatly rejoice.</span> <span class='kvp' data-key='liturgical.verses_en_US_saas|psMA.sixpsalms.ps62.end.v2.text'>My soul follows close behind You; Your right hand takes hold of me.</span> <span class="versiondesignation">[SAAS<span class='key' data-key='properties_en_US_saas|version.designation' hidden='hidden'></span>]</span>
</p></td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='prayers_gr_US_goa|pr.GloryToTheFather.text'>Δόξα Πατρὶ καὶ Υἱῷ καὶ ἁγίῳ Πνεύματι.</span> 
<span class='kvp' data-key='prayers_gr_US_goa|pr.BothNowAndEver.text'>Καὶ νῦν καὶ ἀεὶ καὶ εἰς τοὺς αἰῶνας τῶν αἰώνων. Ἀμήν.</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='prayers_en_US_goa|pr.GloryToTheFather.text'>Glory to the Father and the Son and the Holy Spirit.</span> <span class='kvp' data-key='prayers_en_US_goa|pr.BothNowAndEver.text'>Both now and ever and to the ages of ages. Amen.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='prayers_gr_US_goa|pr.Alleluia3Glory.text'>Ἀλληλούϊα. Ἀλληλούϊα. Ἀλληλούϊα. Δόξα σοι, ὁ Θεός.</span> 
<span class='italicsred'><span class='kvp' data-key='rubrical_gr_GR_cog|ru.Thrice'>(3)</span> 
</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='prayers_en_US_goa|pr.Alleluia3Glory.text'>Alleluia. Alleluia. Alleluia. Glory to You, O God.</span> <span class='italicsred'><span class='kvp' data-key='rubrical_en_US_goa|ru.Thrice'>(3)</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='prayers_gr_US_goa|pr.res01.text'>Κύριε, ἐλέησον.</span> 
<span class='italicsred'><span class='kvp' data-key='rubrical_gr_GR_cog|ru.Thrice'>(3)</span> 
</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='prayers_en_US_goa|pr.res01.text'>Lord, have mercy.</span> <span class='italicsred'><span class='kvp' data-key='rubrical_en_US_goa|ru.Thrice'>(3)</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='prayers_gr_US_goa|pr.GloryToTheFather.text'>Δόξα Πατρὶ καὶ Υἱῷ καὶ ἁγίῳ Πνεύματι.</span> 
<span class='kvp' data-key='prayers_gr_US_goa|pr.BothNowAndEver.text'>Καὶ νῦν καὶ ἀεὶ καὶ εἰς τοὺς αἰῶνας τῶν αἰώνων. Ἀμήν.</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='prayers_en_US_goa|pr.GloryToTheFather.text'>Glory to the Father and the Son and the Holy Spirit.</span> <span class='kvp' data-key='prayers_en_US_goa|pr.BothNowAndEver.text'>Both now and ever and to the ages of ages. Amen.</span> </p></td>
</tr>
<tr>
<td class='leftCell'>
<p class='designation'><span class='kvp' data-key='ps_gr_GR_cog|psa87.title'>Ψαλμὸς ΠΖʹ (87)</span> 
</p>
</td>
<td class='rightCell'>
<p class='designation'><span class='kvp' data-key='ps_en_US_saas|psa87.title'>Psalm 87 (88).</span> </p>
</td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='ps_gr_GR_cog|psa87.text'>Κύριε ὁ Θεὸς τῆς σωτηρίας μου, ἡμέρας ἐκέκραξα καὶ ἐν νυκτὶ ἐναντίον σου. Εἰσελθέτω ἐνώπιόν σου ἡ προσευχή μου, κλῖνον τὸ οὖς σου εἰς τὴν δέησίν μου. Ὅτι ἐπλήσθη κακῶν ἡ ψυχή μου, καὶ ἡ ζωή μου τῷ ᾅδῃ ἤγγισε. Προσελογίσθην μετὰ τῶν καταβαινόντων εἰς λάκκον, ἐγενήθην ὡσεὶ ἄνθρωπος ἀβοήθητος, ἐν νεκροῖς ἐλεύθερος, ὡσεὶ τραυματίαι καθεύδοντες ἐν τάφῳ, ὧν οὐκ ἐμνήσθης ἔτι, καὶ αὐτοὶ ἐκ τῆς χειρός σου ἀπώσθησαν. Ἔθεντό με ἐν λάκκῳ κατωτάτῳ, ἐν σκοτεινοῖς καὶ ἐν σκιᾷ θανάτου. Ἐπʼ ἐμὲ ἐπεστηρίχθη ὁ θυμός σου, καὶ πάντας τοὺς μετεωρισμούς σου ἐπήγαγες ἐπʼ ἐμέ. Ἐμάκρυνας τοὺς γνωστούς μου ἀπʼ ἐμοῦ, ἔθεντό με βδέλυγμα ἑαυτοῖς, παρεδόθην καὶ οὐκ ἐξεπορευόμην. Οἱ ὀφθαλμοί μου ἠσθένησαν ἀπὸ πτωχείας· ἐκέκραξα πρὸς σέ, Κύριε, ὅλην τὴν ἡμέραν, διεπέτασα πρὸς σὲ τὰς χεῖράς μου. Μὴ τοῖς νεκροῖς ποιήσεις θαυμάσια; ἢ ἰατροὶ ἀναστήσουσι καὶ ἐξομολογήσονταί σοι; Μὴ διηγήσεταί τις ἐν τῷ τάφῳ τὸ ἔλεός σου καὶ τὴν ἀλήθειάν σου ἐν τῇ ἀπωλείᾳ; Μὴ γνωσθήσεται ἐν τῷ σκότει τὰ θαυμάσιά σου καὶ ἡ δικαιοσύνη σου ἐν γῇ ἐπιλελησμένῃ; Κἀγὼ πρὸς σέ, Κύριε, ἐκέκραξα, καὶ τὸ πρωῒ ἡ προσευχή μου προφθάσει σε. Ἵνα τί, Κύριε, ἀπωθεῖς τὴν ψυχήν μου, ἀποστρέφεις τὸ πρόσωπόν σου ἀπʼ ἐμοῦ; Πτωχός εἰμι ἐγὼ καὶ ἐν κόποις ἐκ νεότητός μου, ὑψωθεὶς δὲ ἐταπεινώθην καὶ ἐξηπορήθην. Ἐπʼ ἐμὲ διῆλθον αἱ ὀργαί σου, οἱ φοβερισμοί σου ἐξετάραξάν με, ἐκύκλωσάν με ὡσεὶ ὕδωρ ὅλην τὴν ἡμέραν, περιέσχον με ἅμα. Ἐμάκρυνας ἀπʼ ἐμοῦ φίλον καὶ πλησίον, καὶ τοὺς γνωστούς μου ἀπὸ ταλαιπωρίας.</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='ps_en_US_saas|psa87.text'>O Lord God of my salvation, I cry day and night before You. Let my prayer come before You; incline Your ear to my supplication, O Lord. For my soul is filled with sorrows, and my soul draws near to Hades; I am counted among those who go down into the pit; I am like a helpless man, free among the dead, like slain men thrown down and sleeping in a grave, whom You remember no more, but they are removed from Your hand. They laid me in the lowest pit, in dark places and in the shadow of death. Your wrath rested upon me, and You brought all Your billows over me. You removed my acquaintances far from me; they made me an abomination among themselves; I was betrayed, and did not go forth. My eyes weakened from poverty; O Lord, I cry to You the whole day long; I spread out my hands to You. Will You work wonders for the dead? Or will physicians raise them up, and acknowledge You? Shall anyone in the grave describe Your mercy and Your truth in destruction? Shall Your wonders be known in darkness, and Your righteousness in a forgotten land? But I cry to You, O Lord, and in the morning my prayer shall come near to You. Why, O Lord, do You reject my soul, and turn away Your face from me? I am poor and in troubles from my youth; but having been exalted, I was humbled and brought into despair. Your fierce anger passed over me, and Your terrors greatly troubled me; they compassed me like water all the day long; they surrounded me at once. You removed far from me neighbor and friend, and my acquaintances because of my misery.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='liturgical.verses_gr_GR_cog|psMA.sixpsalms.ps87.end.v1.text'>Κύριε ὁ Θεὸς τῆς σωτηρίας μου, ἡμέρας ἐκέκραξα καὶ ἐν νυκτὶ ἐναντίον σου. Εἰσελθέτω ἐνώπιόν σου ἡ προσευχή μου, κλῖνον τὸ οὖς σου εἰς τὴν δέησίν μου.</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='liturgical.verses_en_US_saas|psMA.sixpsalms.ps87.end.v1.text'>O Lord God of my salvation, I cry day and night before You. Let my prayer come before You; incline Your ear to my supplication, O Lord.</span> <span class="versiondesignation">[SAAS<span class='key' data-key='properties_en_US_saas|version.designation' hidden='hidden'></span>]</span>
</p></td>
</tr>
<tr>
<td class='leftCell'>
<p class='designation'><span class='kvp' data-key='ps_gr_GR_cog|psa102.title'>Ψαλμὸς ΡΒʹ (102).</span> 
</p>
</td>
<td class='rightCell'>
<p class='designation'><span class='kvp' data-key='ps_en_US_saas|psa102.title'>Psalm 102 (103).</span> </p>
</td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='ps_gr_GR_cog|psa102.text'>Εὐλόγει, ἡ ψυχή μου, τὸν Κύριον, καί, πάντα τὰ ἐντός μου, τὸ ὄνομα τὸ ἅγιον αὐτοῦ. Εὐλόγει, ἡ ψυχή μου, τὸν Κύριον, καὶ μὴ ἐπιλανθάνου πάσας τὰς ἀνταποδόσεις αὐτοῦ. Τὸν εὐιλατεύοντα πάσας τὰς ἀνομίας σου, τὸν ἰώμενον πάσας τὰς νόσους σου. Τὸν λυτρούμενον ἐκ φθορᾶς τὴν ζωήν σου, τὸν στεφανοῦντά σε ἐν ἐλέει καὶ οἰκτιρμοῖς. Τὸν ἐμπιπλῶντα ἐν ἀγαθοῖς τὴν ἐπιθυμίαν σου, ἀνακαινισθήσεται ὡς ἀετοῦ ἡ νεότης σου. Ποιῶν ἐλεημοσύνας ὁ Κύριος καὶ κρῖμα πᾶσι τοῖς ἀδικουμένοις. Ἐγνώρισε τὰς ὁδοὺς αὐτοῦ τῷ Μωϋσῇ, τοῖς υἱοῖς Ἰσραὴλ τὰ θελήματα αὐτοῦ. Οἰκτίρμων καὶ ἐλεήμων ὁ Κύριος, μακρόθυμος καὶ πολυέλεος· οὐκ εἰς τέλος ὀργισθήσεται, οὐδὲ εἰς τὸν αἰῶνα μηνιεῖ. Οὐ κατὰ τὰς ἀνομίας ἡμῶν ἐποίησεν ἡμῖν, οὐδὲ κατὰ τὰς ἁμαρτίας ἡμῶν ἀνταπέδωκεν ἡμῖν, ὅτι κατὰ τὸ ὕψος τοῦ οὐρανοῦ ἀπὸ τῆς γῆς ἐκραταίωσε Κύριος τὸ ἔλεος αὐτοῦ ἐπὶ τοὺς φοβουμένους αὐτόν. Καθʼ ὅσον ἀπέχουσιν ἀνατολαὶ ἀπὸ δυσμῶν, ἐμάκρυνεν ἀφʼ ἡμῶν τὰς ἀνομίας ἡμῶν. Καθὼς οἰκτείρει πατὴρ υἱούς, ᾠκτείρησε Κύριος τοὺς φοβουμένους αὐτόν, ὅτι αὐτὸς ἔγνω τὸ πλάσμα ἡμῶν, ἐμνήσθη ὅτι χοῦς ἐσμεν. Ἄνθρωπος, ὡσεὶ χόρτος αἱ ἡμέραι αὐτοῦ· ὡσεὶ ἄνθος τοῦ ἀγροῦ, οὕτως ἐξανθήσει. Ὅτι πνεῦμα διῆλθεν ἐν αὐτῷ, καὶ οὐχ ὑπάρξει, καὶ οὐκ ἐπιγνώσεται ἔτι τὸν τόπον αὐτοῦ. Τὸ δὲ ἔλεος τοῦ Κυρίου ἀπὸ τοῦ αἰῶνος καὶ ἕως τοῦ αἰῶνος ἐπὶ τοὺς φοβουμένους αὐτόν, καὶ ἡ δικαιοσύνη αὐτοῦ ἐπὶ υἱοῖς υἱῶν, τοῖς φυλάσσουσι τὴν διαθήκην αὐτοῦ καὶ μεμνημένοις τῶν ἐντολῶν αὐτοῦ τοῦ ποιῆσαι αὐτάς. Κύριος ἐν τῷ οὐρανῷ ἡτοίμασε τὸν θρόνον αὐτοῦ, καὶ ἡ βασιλεία αὐτοῦ πάντων δεσπόζει. Εὐλογεῖτε τὸν Κύριον, πάντες οἱ Ἄγγελοι αὐτοῦ, δυνατοὶ ἰσχύϊ, ποιοῦντες τὸν λόγον αὐτοῦ, τοῦ ἀκοῦσαι τῆς φωνῆς τῶν λόγων αὐτοῦ. Εὐλογεῖτε τὸν Κύριον, πᾶσαι αἱ Δυνάμεις αὐτοῦ, λειτουργοὶ αὐτοῦ, ποιοῦντες τὸ θέλημα αὐτοῦ. Εὐλογεῖτε τὸν Κύριον, πάντα τὰ ἔργα αὐτοῦ, ἐν παντὶ τόπῳ τῆς δεσποτείας αὐτοῦ· εὐλόγει, ἡ ψυχή μου, τὸν Κύριον.</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='ps_en_US_saas|psa102.text'>Bless the Lord, O my soul, and everything within me, bless His holy name. Bless the Lord, O my soul, and forget not all His rewards: who is merciful to all your transgressions, who heals all your diseases, who redeems your life from corruption, who crowns you with mercy and compassion, who satisfies your desire with good things; and your youth is renewed like the eagle’s. The Lord shows mercies and judgment to all who are wronged. He made known His ways to Moses, the things He willed to the sons of Israel. The Lord is compassionate and merciful, slow to anger, and abounding in mercy. He will not become angry to the end, nor will He be wrathful forever; He did not deal with us according to our sins, nor reward us according to our transgressions; for according to the height of heaven from earth, so the Lord reigns in mercy over those who fear Him; as far as the east is from the west, so He removes our transgressions from us. As a father has compassion on his children, so the Lord has compassion on those who fear Him, for He knows how He formed us; He remembers we are dust. As for man, his days are like grass, as a flower of the field, so he flourishes; for the wind passes through it, and it shall not remain; and it shall no longer know its place. But the mercy of the Lord is from age to age upon those who fear Him, and His righteousness upon children’s children, to such as keep His covenant and remember His commandments, to do them. The Lord prepared His throne in heaven, and His Kingdom rules over all. Bless the Lord, all you His angels, mighty in strength, who do His word, so as to hear the voice of His words. Bless the Lord, all you His hosts, His ministers who do His will; bless the Lord, all His works, in all places of His dominion; bless the Lord, O my soul.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='liturgical.verses_gr_GR_cog|psMA.sixpsalms.ps102.end.v1.text'>Ἐν παντὶ τόπῳ τῆς δεσποτείας αὐτοῦ· εὐλόγει, ἡ ψυχή μου, τὸν Κύριον.</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='liturgical.verses_en_US_saas|psMA.sixpsalms.ps102.end.v1.text'>In all places of His dominion; Bless the Lord, O my soul.</span> <span class="versiondesignation">[SAAS<span class='key' data-key='properties_en_US_saas|version.designation' hidden='hidden'></span>]</span>
</p></td>
</tr>
<tr>
<td class='leftCell'>
<p class='designation'><span class='kvp' data-key='ps_gr_GR_cog|psa142.title'>Ψαλμὸς ΡΜΒʹ (142).</span> 
</p>
</td>
<td class='rightCell'>
<p class='designation'><span class='kvp' data-key='ps_en_US_saas|psa142.title'>Psalm 142 (143).</span> </p>
</td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='ps_gr_GR_cog|psa142.text'>Κύριε, εἰσάκουσον τῆς προσευχῆς μου, ἐνώτισαι τὴν δέησίν μου ἐν τῇ ἀληθείᾳ σου, εἰσάκουσόν μου ἐν τῇ δικαιοσύνῃ σου· καὶ μὴ εἰσέλθῃς εἰς κρίσιν μετὰ τοῦ δούλου σου, ὅτι οὐ δικαιωθήσεται ἐνώπιόν σου πᾶς ζῶν. Ὅτι κατεδίωξεν ὁ ἐχθρὸς τὴν ψυχήν μου, ἐταπείνωσεν εἰς γῆν τὴν ζωήν μου, ἐκάθισέ με ἐν σκοτεινοῖς ὡς νεκροὺς αἰῶνος· καὶ ἠκηδίασεν ἐπ᾽ ἐμὲ τὸ πνεῦμά μου, ἐν ἐμοὶ ἐταράχθη ἡ καρδία μου. Ἐμνήσθην ἡμερῶν ἀρχαίων, ἐμελέτησα ἐν πᾶσι τοῖς ἔργοις σου, ἐν ποιήμασι τῶν χειρῶν σου ἐμελέτων. Διεπέτασα πρὸς σὲ τὰς χεῖράς μου, ἡ ψυχή μου ὡς γῆ ἄνυδρός σοι. Ταχὺ εἰσάκουσόν μου, Κύριε, ἐξέλιπε τὸ πνεῦμά μου· μὴ ἀποστρέψῃς τὸ πρόσωπόν σου ἀπ᾽ ἐμοῦ, καὶ ὁμοιωθήσομαι τοῖς καταβαίνουσιν εἰς λάκκον. Ἀκουστὸν ποίησόν μοι τὸ πρωῒ τὸ ἔλεός σου, ὅτι ἐπὶ σοὶ ἤλπισα· γνώρισόν μοι, Κύριε, ὁδόν, ἐν ᾗ πορεύσομαι, ὅτι πρὸς σὲ ἦρα τὴν ψυχήν μου· ἐξελοῦ με ἐκ τῶν ἐχθρῶν μου, Κύριε· πρὸς σὲ κατέφυγον. Δίδαξόν με τοῦ ποιεῖν τὸ θέλημά σου, ὅτι σὺ εἶ ὁ Θεός μου· τὸ πνεῦμά σου τὸ ἀγαθὸν ὁδηγήσει με ἐν γῇ εὐθείᾳ. Ἕνεκεν τοῦ ὀνόματός σου, Κύριε, ζήσεις με· ἐν τῇ δικαιοσύνῃ σου ἐξάξεις ἐκ θλίψεως τὴν ψυχήν μου· καὶ ἐν τῷ ἐλέει σου ἐξολοθρεύσεις τοὺς ἐχθρούς μου· καὶ ἀπολεῖς πάντας τοὺς θλίβοντας τὴν ψυχήν μου, ὅτι ἐγὼ δοῦλός σού εἰμι.</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='ps_en_US_saas|psa142.text'>O Lord, hear my prayer; give ear to my supplication in Your truth; answer me in Your righteousness; do not enter into judgment with Your servant, for no one living shall become righteous in Your sight. For the enemy persecuted my soul; he humbled my life to the ground; he caused me to dwell in dark places as one long dead, and my spirit was in anguish within me; my heart was troubled within me. I remembered the days of old, and I meditated on all Your works; I meditated on the works of Your hands. I spread out my hands to You; my soul thirsts for You like a waterless land. Hear me speedily, O Lord; my spirit faints within me; turn not Your face from me, lest I become like those who go down into the pit. Cause me to hear Your mercy in the morning, for I hope in You; make me know, O Lord, the way wherein I should walk, for I lift up my soul to You. Deliver me from my enemies, O Lord, for to You I flee for refuge. Teach me to do Your will, for You are my God; Your good Spirit shall guide me in the land of uprightness. For Your name’s sake, O Lord, give me life; in Your righteousness You shall bring my soul out of affliction. In Your mercy You shall destroy my enemies; You shall utterly destroy all who afflict my soul, for I am Your servant.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='liturgical.verses_gr_GR_cog|psMA.sixpsalms.ps142.end.v1.text'>Εἰσάκουσόν μου, Κύριε, ἐν τῇ δικαιοσύνῃ σου· καὶ μὴ εἰσέλθῃς εἰς κρίσιν μετὰ τοῦ δούλου σου.</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='liturgical.verses_en_US_saas|psMA.sixpsalms.ps142.end.v1.text'>Answer me in Your righteousness, O Lord. Do not enter into judgment with Your servant.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='liturgical.verses_gr_GR_cog|psMA.sixpsalms.ps142.end.v1.text'>Εἰσάκουσόν μου, Κύριε, ἐν τῇ δικαιοσύνῃ σου· καὶ μὴ εἰσέλθῃς εἰς κρίσιν μετὰ τοῦ δούλου σου.</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='liturgical.verses_en_US_saas|psMA.sixpsalms.ps142.end.v1.text'>Answer me in Your righteousness, O Lord. Do not enter into judgment with Your servant.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='liturgical.verses_gr_GR_cog|psMA.sixpsalms.ps142.end.v2.text'>Τὸ πνεῦμά σου τὸ ἀγαθὸν ὁδηγήσει με ἐν γῇ εὐθείᾳ.</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='liturgical.verses_en_US_saas|psMA.sixpsalms.ps142.end.v2.text'>Your good Spirit shall guide me in the land of uprightness.</span> <span class="versiondesignation">[SAAS<span class='key' data-key='properties_en_US_saas|version.designation' hidden='hidden'></span>]</span>
</p></td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='prayers_gr_US_goa|pr.GloryToTheFather.text'>Δόξα Πατρὶ καὶ Υἱῷ καὶ ἁγίῳ Πνεύματι.</span> 
<span class='kvp' data-key='prayers_gr_US_goa|pr.BothNowAndEver.text'>Καὶ νῦν καὶ ἀεὶ καὶ εἰς τοὺς αἰῶνας τῶν αἰώνων. Ἀμήν.</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='prayers_en_US_goa|pr.GloryToTheFather.text'>Glory to the Father and the Son and the Holy Spirit.</span> <span class='kvp' data-key='prayers_en_US_goa|pr.BothNowAndEver.text'>Both now and ever and to the ages of ages. Amen.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='prayers_gr_US_goa|pr.Alleluia3Glory.text'>Ἀλληλούϊα. Ἀλληλούϊα. Ἀλληλούϊα. Δόξα σοι, ὁ Θεός.</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='prayers_en_US_goa|pr.Alleluia3Glory.text'>Alleluia. Alleluia. Alleluia. Glory to You, O God.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='prayers_gr_US_goa|pr.Alleluia3Glory.text'>Ἀλληλούϊα. Ἀλληλούϊα. Ἀλληλούϊα. Δόξα σοι, ὁ Θεός.</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='prayers_en_US_goa|pr.Alleluia3Glory.text'>Alleluia. Alleluia. Alleluia. Glory to You, O God.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='rubric'><span class='kvp' data-key='rubrical_gr_GR_cog|ru.Intoned'>(χῦμα)</span> 
</p></td>
<td class='rightCell'><p class='rubric'><span class='kvp' data-key='rubrical_en_US_dedes|ru.Intoned'>(intoned)</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='reading'><span class='kvp' data-key='prayers_gr_US_goa|pr.Alleluia3Glory.text'>Ἀλληλούϊα. Ἀλληλούϊα. Ἀλληλούϊα. Δόξα σοι, ὁ Θεός.</span> 
<span class='kvp' data-key='prayers_gr_US_goa|pr.OurHopeLord.text'>Ἡ ἐλπὶς ἡμῶν, Κύριε, δόξα σοι.</span> 
</p></td>
<td class='rightCell'><p class='reading'><span class='kvp' data-key='prayers_en_US_goa|pr.Alleluia3Glory.text'>Alleluia. Alleluia. Alleluia. Glory to You, O God.</span> <span class='kvp' data-key='prayers_en_US_goa|pr.OurHopeLord.text'>Our hope, O Lord, glory to You.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='actor'><span class='kvp' data-key='actors_gr_GR_cog|ac.Priest'>ΙΕΡΕΥΣ</span> 
</p></td>
<td class='rightCell'><p class='actor'><span class='kvp' data-key='actors_en_US_goa|ac.Priest'>PRIEST</span> </p></td>
</tr>
<td class='leftCell'><p class='dialog'><span class='dpriest'><span class='kvp' data-key='prayers_gr_US_goa|pr.pet01.text'>Ἐν εἰρήνῃ τοῦ Κυρίου δεηθῶμεν.</span> 
</span> 
</p></td>
<td class='rightCell'><p class='dialog'><span class='dpriest'><span class='kvp' data-key='prayers_en_US_goa|pr.pet01.text'>In peace let us pray to the Lord.</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialogwithactor'><span class='dwachoir'><span class='actorwithdialog'><span class='kvp' data-key='actors_gr_GR_cog|ac.IL.Choir'>ΧΟΡΟΣ:</span> 
</span> 
<span class='kvp' data-key='prayers_gr_US_goa|pr.res01.text'>Κύριε, ἐλέησον.</span> 
</span> 
</p></td>
<td class='rightCell'><p class='dialogwithactor'><span class='dwachoir'><span class='actorwithdialog'><span class='kvp' data-key='actors_en_US_goa|ac.IL.Choir'>CHOIR:</span> </span> <span class='kvp' data-key='prayers_en_US_goa|pr.res01.text'>Lord, have mercy.</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='actor'><span class='apriest'><span class='kvp' data-key='actors_gr_GR_cog|ac.Priest'>ΙΕΡΕΥΣ</span> 
</span> 
</p></td>
<td class='rightCell'><p class='actor'><span class='apriest'><span class='kvp' data-key='actors_en_US_goa|ac.Priest'>PRIEST</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialog'><span class='dpriest'><span class='kvp' data-key='prayers_gr_US_goa|pr.pet02.text'>Ὑπὲρ τῆς ἄνωθεν εἰρήνης καὶ τῆς σωτηρίας τῶν ψυχῶν ἡμῶν τοῦ Κυρίου δεηθῶμεν.</span> 
</span> 
</p></td>
<td class='rightCell'><p class='dialog'><span class='dpriest'><span class='kvp' data-key='prayers_en_US_goa|pr.pet02.text'>For the peace from above and for the salvation of our souls, let us pray to the Lord.</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialogwithactor'><span class='dwachoir'><span class='actorwithdialog'><span class='kvp' data-key='actors_gr_GR_cog|ac.IL.Choir'>ΧΟΡΟΣ:</span> 
</span> 
<span class='kvp' data-key='prayers_gr_US_goa|pr.res01.text'>Κύριε, ἐλέησον.</span> 
</span> 
</p></td>
<td class='rightCell'><p class='dialogwithactor'><span class='dwachoir'><span class='actorwithdialog'><span class='kvp' data-key='actors_en_US_goa|ac.IL.Choir'>CHOIR:</span> </span> <span class='kvp' data-key='prayers_en_US_goa|pr.res01.text'>Lord, have mercy.</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='actor'><span class='apriest'><span class='kvp' data-key='actors_gr_GR_cog|ac.Priest'>ΙΕΡΕΥΣ</span> 
</span> 
</p></td>
<td class='rightCell'><p class='actor'><span class='apriest'><span class='kvp' data-key='actors_en_US_goa|ac.Priest'>PRIEST</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialog'><span class='dpriest'><span class='kvp' data-key='prayers_gr_US_goa|pr.pet03.text'>Ὑπὲρ τῆς εἰρήνης τοῦ σύμπαντος κόσμου, εὐσταθείας τῶν ἁγίων τοῦ Θεοῦ Ἐκκλησιῶν καὶ τῆς τῶν πάντων ἑνώσεως τοῦ Κυρίου δεηθῶμεν.</span> 
</span> 
</p></td>
<td class='rightCell'><p class='dialog'><span class='dpriest'><span class='kvp' data-key='prayers_en_US_goa|pr.pet03.text'>For the peace of the whole world, for the stability of the holy churches of God, and for the unity of all, let us pray to the Lord.</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialogwithactor'><span class='dwachoir'><span class='actorwithdialog'><span class='kvp' data-key='actors_gr_GR_cog|ac.IL.Choir'>ΧΟΡΟΣ:</span> 
</span> 
<span class='kvp' data-key='prayers_gr_US_goa|pr.res01.text'>Κύριε, ἐλέησον.</span> 
</span> 
</p></td>
<td class='rightCell'><p class='dialogwithactor'><span class='dwachoir'><span class='actorwithdialog'><span class='kvp' data-key='actors_en_US_goa|ac.IL.Choir'>CHOIR:</span> </span> <span class='kvp' data-key='prayers_en_US_goa|pr.res01.text'>Lord, have mercy.</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='actor'><span class='apriest'><span class='kvp' data-key='actors_gr_GR_cog|ac.Priest'>ΙΕΡΕΥΣ</span> 
</span> 
</p></td>
<td class='rightCell'><p class='actor'><span class='apriest'><span class='kvp' data-key='actors_en_US_goa|ac.Priest'>PRIEST</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialog'><span class='dpriest'><span class='kvp' data-key='prayers_gr_US_goa|pr.pet04.text'>Ὑπὲρ τοῦ ἁγίου οἴκου τούτου καὶ τῶν μετὰ πίστεως, εὐλαβείας καὶ φόβου Θεοῦ εἰσιόντων ἐν αὐτῷ, τοῦ Κυρίου δεηθῶμεν.</span> 
</span> 
</p></td>
<td class='rightCell'><p class='dialog'><span class='dpriest'><span class='kvp' data-key='prayers_en_US_goa|pr.pet04.text'>For this holy house and for those who enter it with faith, reverence, and the fear of God, let us pray to the Lord.</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialogwithactor'><span class='dwachoir'><span class='actorwithdialog'><span class='kvp' data-key='actors_gr_GR_cog|ac.IL.Choir'>ΧΟΡΟΣ:</span> 
</span> 
<span class='kvp' data-key='prayers_gr_US_goa|pr.res01.text'>Κύριε, ἐλέησον.</span> 
</span> 
</p></td>
<td class='rightCell'><p class='dialogwithactor'><span class='dwachoir'><span class='actorwithdialog'><span class='kvp' data-key='actors_en_US_goa|ac.IL.Choir'>CHOIR:</span> </span> <span class='kvp' data-key='prayers_en_US_goa|pr.res01.text'>Lord, have mercy.</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='actor'><span class='apriest'><span class='kvp' data-key='actors_gr_GR_cog|ac.Priest'>ΙΕΡΕΥΣ</span> 
</span> 
</p></td>
<td class='rightCell'><p class='actor'><span class='apriest'><span class='kvp' data-key='actors_en_US_goa|ac.Priest'>PRIEST</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialog'><span class='dpriest'><span class='kvp' data-key='prayers_gr_US_goa|pr.pet05.text'>Ὑπὲρ τῶν εὐσεβῶν καὶ ὀρθοδόξων χριστιανῶν τοῦ Κυρίου δεηθῶμεν.</span> 
</span> 
</p></td>
<td class='rightCell'><p class='dialog'><span class='dpriest'><span class='kvp' data-key='prayers_en_US_goa|pr.pet05.text'>For pious and Orthodox Christians, let us pray to the Lord.</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialogwithactor'><span class='dwachoir'><span class='actorwithdialog'><span class='kvp' data-key='actors_gr_GR_cog|ac.IL.Choir'>ΧΟΡΟΣ:</span> 
</span> 
<span class='kvp' data-key='prayers_gr_US_goa|pr.res01.text'>Κύριε, ἐλέησον.</span> 
</span> 
</p></td>
<td class='rightCell'><p class='dialogwithactor'><span class='dwachoir'><span class='actorwithdialog'><span class='kvp' data-key='actors_en_US_goa|ac.IL.Choir'>CHOIR:</span> </span> <span class='kvp' data-key='prayers_en_US_goa|pr.res01.text'>Lord, have mercy.</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='actor'><span class='apriest'><span class='kvp' data-key='actors_gr_GR_cog|ac.Priest'>ΙΕΡΕΥΣ</span> 
</span> 
</p></td>
<td class='rightCell'><p class='actor'><span class='apriest'><span class='kvp' data-key='actors_en_US_goa|ac.Priest'>PRIEST</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialog'><span class='dpriest'><span class='kvp' data-key='prayers_gr_US_goa|pr.pet06a.text'>Ὑπὲρ</span> 
<span class='kvp' data-key='client_gr_US_goa|cl.bishop1.rank'>τοῦ Ἀρχιεπισκόπου ἡμῶν</span> 
<span class='kvp' data-key='client_gr_US_goa|cl.bishop1.name_c'>(δεῖνος),</span> 
<span class='kvp' data-key='prayers_gr_US_goa|pr.pet06b.text'>τοῦ τιμίου πρεσβυτερίου, τῆς ἐν Χριστῷ διακονίας, παντὸς τοῦ κλήρου καὶ τοῦ λαοῦ τοῦ Κυρίου δεηθῶμεν.</span> 
</span> 
</p></td>
<td class='rightCell'><p class='dialog'><span class='dpriest'><span class='kvp' data-key='prayers_en_US_goa|pr.pet06a.text'>For </span> <span class='kvp' data-key='client_en_US_goa|cl.bishop1.rank'>our Archbishop</span> <span class='kvp' data-key='client_en_US_goa|cl.bishop1.name_c'>(name),</span> <span class='kvp' data-key='prayers_en_US_goa|pr.pet06b.text'>for the honorable presbyterate, for the diaconate in Christ, and for all the clergy and the people, let us pray to the Lord.</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialogwithactor'><span class='dwachoir'><span class='actorwithdialog'><span class='kvp' data-key='actors_gr_GR_cog|ac.IL.Choir'>ΧΟΡΟΣ:</span> 
</span> 
<span class='kvp' data-key='prayers_gr_US_goa|pr.res01.text'>Κύριε, ἐλέησον.</span> 
</span> 
</p></td>
<td class='rightCell'><p class='dialogwithactor'><span class='dwachoir'><span class='actorwithdialog'><span class='kvp' data-key='actors_en_US_goa|ac.IL.Choir'>CHOIR:</span> </span> <span class='kvp' data-key='prayers_en_US_goa|pr.res01.text'>Lord, have mercy.</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='actor'><span class='apriest'><span class='kvp' data-key='actors_gr_GR_cog|ac.Priest'>ΙΕΡΕΥΣ</span> 
</span> 
</p></td>
<td class='rightCell'><p class='actor'><span class='apriest'><span class='kvp' data-key='actors_en_US_goa|ac.Priest'>PRIEST</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialog'><span class='dpriest'><span class='kvp' data-key='prayers_gr_US_goa|pr.pet07L.text'>Ὑπὲρ τοῦ εὐσεβοῦς ἡμῶν γένους, τοῦ Προέδρου, πάσης ἀρχῆς καὶ ἐξουσίας ἐν τῷ κράτει ἡμῶν, καὶ τοῦ κατὰ ξηράν, θάλασσαν, καὶ ἀέρα φιλοχρίστου ἡμῶν στρατοῦ, τοῦ Κυρίου δεηθῶμεν.</span> 
</span> 
</p></td>
<td class='rightCell'><p class='dialog'><span class='dpriest'><span class='kvp' data-key='prayers_en_US_goa|pr.pet07L.text'>For our country, the president, all those in public service, and for our armed forces everywhere, let us pray to the Lord.</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialogwithactor'><span class='dwachoir'><span class='actorwithdialog'><span class='kvp' data-key='actors_gr_GR_cog|ac.IL.Choir'>ΧΟΡΟΣ:</span> 
</span> 
<span class='kvp' data-key='prayers_gr_US_goa|pr.res01.text'>Κύριε, ἐλέησον.</span> 
</span> 
</p></td>
<td class='rightCell'><p class='dialogwithactor'><span class='dwachoir'><span class='actorwithdialog'><span class='kvp' data-key='actors_en_US_goa|ac.IL.Choir'>CHOIR:</span> </span> <span class='kvp' data-key='prayers_en_US_goa|pr.res01.text'>Lord, have mercy.</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='actor'><span class='apriest'><span class='kvp' data-key='actors_gr_GR_cog|ac.Priest'>ΙΕΡΕΥΣ</span> 
</span> 
</p></td>
<td class='rightCell'><p class='actor'><span class='apriest'><span class='kvp' data-key='actors_en_US_goa|ac.Priest'>PRIEST</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialog'><span class='dpriest'><span class='kvp' data-key='prayers_gr_US_goa|pr.pet08.text'>Ὑπὲρ τῆς Ἁγίας τοῦ Χριστοῦ Μεγάλης Ἐκκλησίας, τῆς Ἱερᾶς ἡμῶν Ἀρχιεπισκοπῆς, [τῆς Ἱερᾶς Μητροπόλεως ταύτης,] τῆς πόλεως καὶ κοινότητος ταύτης, πάσης πόλεως, χώρας καὶ τῶν πίστει οἰκούντων ἐν αὐταῖς, τοῦ Κυρίου δεηθῶμεν.</span> 
</span> 
</p></td>
<td class='rightCell'><p class='dialog'><span class='dpriest'><span class='kvp' data-key='prayers_en_US_goa|pr.pet08.text'>For the Holy and Great Church of Christ, for our Sacred Archdiocese, [for this Sacred Metropolis,] for this city and parish, for every city and land, and for the faithful who live in them, let us pray to the Lord.</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialogwithactor'><span class='dwachoir'><span class='actorwithdialog'><span class='kvp' data-key='actors_gr_GR_cog|ac.IL.Choir'>ΧΟΡΟΣ:</span> 
</span> 
<span class='kvp' data-key='prayers_gr_US_goa|pr.res01.text'>Κύριε, ἐλέησον.</span> 
</span> 
</p></td>
<td class='rightCell'><p class='dialogwithactor'><span class='dwachoir'><span class='actorwithdialog'><span class='kvp' data-key='actors_en_US_goa|ac.IL.Choir'>CHOIR:</span> </span> <span class='kvp' data-key='prayers_en_US_goa|pr.res01.text'>Lord, have mercy.</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='actor'><span class='apriest'><span class='kvp' data-key='actors_gr_GR_cog|ac.Priest'>ΙΕΡΕΥΣ</span> 
</span> 
</p></td>
<td class='rightCell'><p class='actor'><span class='apriest'><span class='kvp' data-key='actors_en_US_goa|ac.Priest'>PRIEST</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialog'><span class='dpriest'><span class='kvp' data-key='prayers_gr_US_goa|pr.pet09.text'>Ὑπὲρ εὐκρασίας ἀέρων, εὐφορίας τῶν καρπῶν τῆς γῆς καὶ καιρῶν εἰρηνικῶν τοῦ Κυρίου δεηθῶμεν.</span> 
</span> 
</p></td>
<td class='rightCell'><p class='dialog'><span class='dpriest'><span class='kvp' data-key='prayers_en_US_goa|pr.pet09.text'>For favorable weather, for an abundance of the fruits of the earth, and for peaceful times, let us pray to the Lord.</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialogwithactor'><span class='dwachoir'><span class='actorwithdialog'><span class='kvp' data-key='actors_gr_GR_cog|ac.IL.Choir'>ΧΟΡΟΣ:</span> 
</span> 
<span class='kvp' data-key='prayers_gr_US_goa|pr.res01.text'>Κύριε, ἐλέησον.</span> 
</span> 
</p></td>
<td class='rightCell'><p class='dialogwithactor'><span class='dwachoir'><span class='actorwithdialog'><span class='kvp' data-key='actors_en_US_goa|ac.IL.Choir'>CHOIR:</span> </span> <span class='kvp' data-key='prayers_en_US_goa|pr.res01.text'>Lord, have mercy.</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='actor'><span class='apriest'><span class='kvp' data-key='actors_gr_GR_cog|ac.Priest'>ΙΕΡΕΥΣ</span> 
</span> 
</p></td>
<td class='rightCell'><p class='actor'><span class='apriest'><span class='kvp' data-key='actors_en_US_goa|ac.Priest'>PRIEST</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialog'><span class='dpriest'><span class='kvp' data-key='prayers_gr_US_goa|pr.pet10.text'>Ὑπὲρ πλεόντων, ὁδοιπορούντων, νοσούντων, καμνόντων, αἰχμαλώτων καὶ τῆς σωτηρίας αὐτῶν τοῦ Κυρίου δεηθῶμεν.</span> 
</span> 
</p></td>
<td class='rightCell'><p class='dialog'><span class='dpriest'><span class='kvp' data-key='prayers_en_US_goa|pr.pet10.text'>For those who travel by land, sea, and air, for the sick, the suffering, the captives and for their salvation, let us pray to the Lord.</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialogwithactor'><span class='dwachoir'><span class='actorwithdialog'><span class='kvp' data-key='actors_gr_GR_cog|ac.IL.Choir'>ΧΟΡΟΣ:</span> 
</span> 
<span class='kvp' data-key='prayers_gr_US_goa|pr.res01.text'>Κύριε, ἐλέησον.</span> 
</span> 
</p></td>
<td class='rightCell'><p class='dialogwithactor'><span class='dwachoir'><span class='actorwithdialog'><span class='kvp' data-key='actors_en_US_goa|ac.IL.Choir'>CHOIR:</span> </span> <span class='kvp' data-key='prayers_en_US_goa|pr.res01.text'>Lord, have mercy.</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='actor'><span class='apriest'><span class='kvp' data-key='actors_gr_GR_cog|ac.Priest'>ΙΕΡΕΥΣ</span> 
</span> 
</p></td>
<td class='rightCell'><p class='actor'><span class='apriest'><span class='kvp' data-key='actors_en_US_goa|ac.Priest'>PRIEST</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialog'><span class='dpriest'><span class='kvp' data-key='prayers_gr_US_goa|pr.pet11.text'>Ὑπὲρ τοῦ ῥυσθῆναι ἡμᾶς ἀπὸ πάσης θλίψεως, ὀργῆς, κινδύνου καὶ ἀνάγκης, τοῦ Κυρίου δεηθῶμεν.</span> 
</span> 
</p></td>
<td class='rightCell'><p class='dialog'><span class='dpriest'><span class='kvp' data-key='prayers_en_US_goa|pr.pet11.text'>For our deliverance from all affliction, wrath, danger, and distress, let us pray to the Lord.</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialogwithactor'><span class='dwachoir'><span class='actorwithdialog'><span class='kvp' data-key='actors_gr_GR_cog|ac.IL.Choir'>ΧΟΡΟΣ:</span> 
</span> 
<span class='kvp' data-key='prayers_gr_US_goa|pr.res01.text'>Κύριε, ἐλέησον.</span> 
</span> 
</p></td>
<td class='rightCell'><p class='dialogwithactor'><span class='dwachoir'><span class='actorwithdialog'><span class='kvp' data-key='actors_en_US_goa|ac.IL.Choir'>CHOIR:</span> </span> <span class='kvp' data-key='prayers_en_US_goa|pr.res01.text'>Lord, have mercy.</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='actor'><span class='apriest'><span class='kvp' data-key='actors_gr_GR_cog|ac.Priest'>ΙΕΡΕΥΣ</span> 
</span> 
</p></td>
<td class='rightCell'><p class='actor'><span class='apriest'><span class='kvp' data-key='actors_en_US_goa|ac.Priest'>PRIEST</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialog'><span class='dpriest'><span class='kvp' data-key='prayers_gr_US_goa|pr.pet12.text'>Ἀντιλαβοῦ, σῶσον, ἐλέησον καὶ διαφύλαξον ἡμᾶς, ὁ Θεός, τῇ σῇ χάριτι.</span> 
</span> 
</p></td>
<td class='rightCell'><p class='dialog'><span class='dpriest'><span class='kvp' data-key='prayers_en_US_goa|pr.pet12.text'>Help us, save us, have mercy on us, and protect us, O God, by Your grace.</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialogwithactor'><span class='dwachoir'><span class='actorwithdialog'><span class='kvp' data-key='actors_gr_GR_cog|ac.IL.Choir'>ΧΟΡΟΣ:</span> 
</span> 
<span class='kvp' data-key='prayers_gr_US_goa|pr.res01.text'>Κύριε, ἐλέησον.</span> 
</span> 
</p></td>
<td class='rightCell'><p class='dialogwithactor'><span class='dwachoir'><span class='actorwithdialog'><span class='kvp' data-key='actors_en_US_goa|ac.IL.Choir'>CHOIR:</span> </span> <span class='kvp' data-key='prayers_en_US_goa|pr.res01.text'>Lord, have mercy.</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='actor'><span class='apriest'><span class='kvp' data-key='actors_gr_GR_cog|ac.Priest'>ΙΕΡΕΥΣ</span> 
</span> 
</p></td>
<td class='rightCell'><p class='actor'><span class='apriest'><span class='kvp' data-key='actors_en_US_goa|ac.Priest'>PRIEST</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialog'><span class='dpriest'><span class='kvp' data-key='prayers_gr_US_goa|pr.pet13.text'>Τῆς παναγίας, ἀχράντου, ὑπερευλογημένης, ἐνδόξου, δεσποίνης ἡμῶν Θεοτόκου καὶ ἀειπαρθένου Μαρίας μετὰ πάντων τῶν ἁγίων μνημονεύσαντες, ἑαυτοὺς καὶ ἀλλήλους καὶ πᾶσαν τὴν ζωὴν ἡμῶν Χριστῷ τῷ Θεῷ παραθώμεθα.</span> 
</span> 
</p></td>
<td class='rightCell'><p class='dialog'><span class='dpriest'><span class='kvp' data-key='prayers_en_US_goa|pr.pet13.text'>Remembering our all-holy, immaculate, most blessed, and glorious Lady, the Theotokos and ever-virgin Mary, with all the saints, let us commend ourselves and one another and our whole life to Christ our God.</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialogwithactor'><span class='dwachoir'><span class='actorwithdialog'><span class='kvp' data-key='actors_gr_GR_cog|ac.IL.Choir'>ΧΟΡΟΣ:</span> 
</span> 
<span class='kvp' data-key='prayers_gr_US_goa|pr.res03.text'>Σοί, Κύριε.</span> 
</span> 
</p></td>
<td class='rightCell'><p class='dialogwithactor'><span class='dwachoir'><span class='actorwithdialog'><span class='kvp' data-key='actors_en_US_goa|ac.IL.Choir'>CHOIR:</span> </span> <span class='kvp' data-key='prayers_en_US_goa|pr.res03.text'>To You, O Lord.</span> </span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='actor'><span class='kvp' data-key='actors_gr_GR_cog|ac.Priest'>ΙΕΡΕΥΣ</span> 
</p></td>
<td class='rightCell'><p class='actor'><span class='kvp' data-key='actors_en_US_goa|ac.Priest'>PRIEST</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialog'><span class='kvp' data-key='prayers_gr_US_goa|pr.exc01.text'>Ὅτι πρέπει σοι πᾶσα δόξα, τιμὴ καὶ προσκύνησις, τῷ Πατρὶ καὶ τῷ Υἱῷ καὶ τῷ ἁγίῳ Πνεύματι, νῦν καὶ ἀεὶ καὶ εἰς τοὺς αἰῶνας τῶν αἰώνων.</span> 
</p></td>
<td class='rightCell'><p class='dialog'><span class='kvp' data-key='prayers_en_US_goa|pr.exc01.text'>For to You belong all glory, honor, and worship, to the Father and the Son and the Holy Spirit, now and ever and to the ages of ages.</span> </p></td>
</tr>
<tr>
<td class='leftCell'><p class='dialogwithactor'><span class='actorwithdialog'><span class='kvp' data-key='actors_gr_GR_cog|ac.IL.Choir'>ΧΟΡΟΣ:</span> 
</span> 
<span class='kvp' data-key='prayers_gr_US_goa|pr.res04.text'>Ἀμήν.</span> 
</p></td>
<td class='rightCell'><p class='dialogwithactor'><span class='actorwithdialog'><span class='kvp' data-key='actors_en_US_goa|ac.IL.Choir'>CHOIR:</span> </span> <span class='kvp' data-key='prayers_en_US_goa|pr.res04.text'>Amen.</span> </p></td>
</tr>
<tr>
<td class='leftCell'>
<p class='break'>&#xA0;&#xA0;&#xA0;</p>
</td>
<td class='rightCell'>
<p class='break'>&#xA0;&#xA0;&#xA0;</p>
</td>
</tr>`;
    const currentPath = document.location.origin + document.location.pathname;
    const today = new Date(); //parameter a string date to test other dates eg: "12/24/2025"

    const thisYear = today.getFullYear();
    const baseDates = ["02-25-2024", "02-09-2025", "02-01-2026", "02-21-2027", "02-06-2028", "01-28-2029", "02-17-2030"];
    const baseDate = mostRecentPastDate(baseDates);
    console.log(`alwb base date: ${baseDate}`);
    const daysSinceBaseDate = daysBetweenDates(baseDate, today) + 1;
    console.log(`alwb days since base date: ${daysSinceBaseDate}`);
    let replacementHTML = "";

    if (daysSinceBaseDate >= 71 && daysSinceBaseDate <= 77) {
      //no ordinary
    } else if (daysSinceBaseDate >= 78 && daysSinceBaseDate <= 108) {
      replacementHTML = matinsOrdinaryPaschal + matinsOrdinary_part2;
    } else if (daysSinceBaseDate == 109) {
      //no ordinary
    } else if (daysSinceBaseDate >= 110 && daysSinceBaseDate <= 119) {
      replacementHTML = matinsOrdinaryAscension + matinsOrdinary_part2;
    } else {
      replacementHTML = matinsOrdinaryNormal + matinsOrdinary_part2;
    }

    // Create a single jQuery selector targeting either of the two bookmark IDs
    const bookmarkSelector = '#bkmrk00, #bkmrk00R';

    // 1. Locate the first matching bookmark element.
    const targetBookmark = $(bookmarkSelector).first();

    // 2. Check if a target element was found.
    if (targetBookmark.length > 0) {
      // 3. Traverse up from the bookmark to the closest containing table row (<tr>).
      const targetRow = targetBookmark.closest('tr');

      // 4. Check if a containing row was found.
      if (targetRow.length > 0) {
        // 5. Replace the entire target row with the new HTML.
        //    (The replacementHTML variable must be defined elsewhere in your code)
        targetRow.replaceWith(replacementHTML);

        hideGreekInEnglishOnlyService();

        console.log(`Row containing bookmark (${targetBookmark.attr('id')}) has been replaced.`);
      } else {
        console.error(`Bookmark element found, but no containing <tr> was found. Replacement failed.`);
      }
    } else {
      console.error(`Neither bookmark ID ("bkmrk00" or "bkmrk00R") was found. Replacement failed.`);
    }

    console.log('Content replacement script executed.');

  }//end if
}//end insertMatinsOrdinary

function insertMatinsTOB() {

  const pageTitle = document.title;
  const validEndings = ['.ma', '.ma2', '.ma3', '.ma4', '.ma5', '.ma6', '.ma9'];

  //Service is a matins
  if (validEndings.some(ending => pageTitle.endsWith(ending))) {
    console.log("Document is a Matins. Running insertMatinsTOB script.");

    // --- Content Insertion Script ---
    // Function to create and insert the div before the table
    function addDivBeforeTable() {
      // Step 1: Get a reference to the table using its ID
      const table = document.getElementById("biTable");

      // Step 2: Create the new div element
      const newDiv = document.createElement("div");

      // Step 3: Add the new ID to the div
      newDiv.id = "LoB";

      // Step 4: Add the new class to the div
      //newDiv.classList.add("bookmarkDivStyle");

      // Step 5: Add content to the new div using innerHTML with a template literal
      // const currentPath used when href is a link to one bookmark and not the onclick
      // const currentPath = document.location.origin + document.location.pathname;

      newDiv.innerHTML = `<p class="lobTitle">Quick Links</p>
<p class="bookmarklink"><a href="#" onclick="scrollToBkmrk01(); return false;">Six Psalms</a></p>
<p class="bookmarklink"><a href="#" onclick="scrollToBkmrk02(); return false;">God is the Lord / Alleluia</a></p>
<p class="bookmarklink"><a href="#" onclick="scrollToBkmrk03(); return false;">Kathismata</a></p>
<p class="bookmarklink"><a href="#" onclick="scrollToBkmrk04(); return false;">Evlogetaria (Saturdays / Sundays)</a></p>
<p class="bookmarklink"><a href="#" onclick="scrollToBkmrk05(); return false;">Antiphons (Sundays / Feastdays)</a></p>
<p class="bookmarklink"><a href="#" onclick="scrollToBkmrk06(); return false;">Synaxarion</a></p>
<p class="bookmarklink"><a href="#" onclick="scrollToBkmrk07(); return false;">Katavasias / Heirmos</a></p>
<p class="bookmarklink"><a href="#" onclick="scrollToBkmrk08(); return false;">Gospel (Sundays / Feastdays) - Psalm 50</a></p>
<p class="bookmarklink"><a href="#" onclick="scrollToBkmrk09(); return false;">Magnificat / Ode ix</a></p>
<p class="bookmarklink"><a href="#" onclick="scrollToBkmrk10(); return false;">Exaposteilaria</a></p>
<p class="bookmarklink"><a href="#" onclick="scrollToBkmrk11(); return false;">Lauds</a></p>
<p class="bookmarklink"><a href="#" onclick="scrollToBkmrk12(); return false;">Doxology</a></p>
`;
      // Step 6: Get the parent element of the table and insert the new div
      const parent = table.parentNode;
      parent.insertBefore(newDiv, table);
    }

    // Call the function to run the code
    addDivBeforeTable();

  }//end if
}//end insertMatinsTOB

function convertClassToId() {
  //add R to bkmrk in rightCell
  appendLetterRtoRightBkmrkStyles();

  // Get all elements with a class attribute that starts with "bkmrk"
  // AND that do NOT already have an 'id' attribute defined.
  const bookmarks = document.querySelectorAll('[class^="bkmrk"]:not([id])');

  // Loop through the NodeList of elements
  bookmarks.forEach(bookmark => {
    // Convert the DOMTokenList (classList) to an array and find the
    // specific class that starts with "bkmrk".
    const oldClassName = Array.from(bookmark.classList).find(cls =>
      cls.startsWith('bkmrk')
    );

    // Only proceed if a matching class was found
    if (oldClassName) {
      // Replace the specific class (e.g., "bkmrk01") with the generic class "bkmrk".
      bookmark.classList.replace(oldClassName, 'bkmrk');

      // Set the id of the element to the unique class name.
      bookmark.id = oldClassName;
    }
  });
}

function removeHtmlLinkBeforeTable() {
  //This function is called in insertMatinsOrdinary
  // 1. Find the starting element: <p class="designation">_</p>
  // We use querySelectorAll to find all matching paragraphs and search by content.
  const paragraphs = document.querySelectorAll('p.designation');
  let startElement = null;

  for (let p of paragraphs) {
    if (p.textContent.trim() === '_') {
      startElement = p;
      break;
    }
  }

  // Check if the starting element was found
  if (!startElement) {
    console.error("Starting <p class='designation'>_</p> element not found.");
    return;
  }

  // 2. Get the Parent Element
  const parent = startElement.parentNode;
  if (!parent) return;

  // 3. Iteratively remove the starting element and the following three siblings (4 total)
  let currentElement = startElement;
  let elementsToRemove = 4; // The four <p> tags in your content block

  for (let i = 0; i < elementsToRemove; i++) {
    // Get the next element to remove *before* removing the current one
    const nextElement = currentElement ? currentElement.nextElementSibling : null;

    if (currentElement) {
      // **REMOVE** the element from the DOM
      parent.removeChild(currentElement);
    }

    // Move to the next element for the next iteration
    currentElement = nextElement;

    // Safety break if the sequence runs out early
    if (!currentElement && i < elementsToRemove - 1) {
      break;
    }
  }

  console.log('The specified content block before the table has been removed.');
}

function appendLetterRtoRightBkmrkStyles() {
  //This function is called in convertClassToId
  // Selects all elements with the class 'rightCell'
  const rightCells = document.querySelectorAll('.rightCell');

  // 1. Iterate over each element identified as a 'rightCell'
  rightCells.forEach(cell => {
    // 2. Select all elements *within* this 'rightCell'
    const allElements = cell.querySelectorAll('*');

    // 3. Iterate over all inner elements
    allElements.forEach(element => {
      // Get the current list of classes
      const classList = element.classList;

      // To safely use replace without skipping classes, 
      // we first convert the classList (DOMTokenList) to a standard Array.
      const classesArray = Array.from(classList);

      // Iterate over the classes in the array
      classesArray.forEach(className => {

        // Check if the class name STARTS WITH 'bkmrk'
        if (className.startsWith('bkmrk')) {
          // Define the new class name by appending 'R'
          const newClassName = className + 'R';

          // Use the replace() method to atomically swap the old class for the new one
          // e.g., 'bkmrk-icon' is replaced by 'bkmrk-iconR'
          classList.replace(className, newClassName);
        }
      });
    });
  });
}

function scrollToBkmrk01() {
  const firstElement = document.getElementById('bkmrk01');
  if (firstElement) {
    firstElement.scrollIntoView({ behavior: 'smooth' });
  }

  setTimeout(() => {
    const secondElement = document.getElementById('bkmrk01R');
    if (secondElement) {
      secondElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, 10);
}

function scrollToBkmrk02() {
  const firstElement = document.getElementById('bkmrk02');
  if (firstElement) {
    firstElement.scrollIntoView({ behavior: 'smooth' });
  }

  setTimeout(() => {
    const secondElement = document.getElementById('bkmrk02R');
    if (secondElement) {
      secondElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, 10);
}

function scrollToBkmrk03() {
  const firstElement = document.getElementById('bkmrk03');
  if (firstElement) {
    firstElement.scrollIntoView({ behavior: 'smooth' });
  }

  setTimeout(() => {
    const secondElement = document.getElementById('bkmrk03R');
    if (secondElement) {
      secondElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, 10);
}

function scrollToBkmrk04() {
  const firstElement = document.getElementById('bkmrk04');
  if (firstElement) {
    firstElement.scrollIntoView({ behavior: 'smooth' });
  }

  setTimeout(() => {
    const secondElement = document.getElementById('bkmrk04R');
    if (secondElement) {
      secondElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, 10);
}

function scrollToBkmrk05() {
  const firstElement = document.getElementById('bkmrk05');
  if (firstElement) {
    firstElement.scrollIntoView({ behavior: 'smooth' });
  }

  setTimeout(() => {
    const secondElement = document.getElementById('bkmrk05R');
    if (secondElement) {
      secondElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, 10);
}

function scrollToBkmrk06() {
  const firstElement = document.getElementById('bkmrk06');
  if (firstElement) {
    firstElement.scrollIntoView({ behavior: 'smooth' });
  }

  setTimeout(() => {
    const secondElement = document.getElementById('bkmrk06R');
    if (secondElement) {
      secondElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, 10);
}

function scrollToBkmrk07() {
  const firstElement = document.getElementById('bkmrk07');
  if (firstElement) {
    firstElement.scrollIntoView({ behavior: 'smooth' });
  }

  setTimeout(() => {
    const secondElement = document.getElementById('bkmrk07R');
    if (secondElement) {
      secondElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, 10);
}

function scrollToBkmrk08() {
  const firstElement = document.getElementById('bkmrk08');
  if (firstElement) {
    firstElement.scrollIntoView({ behavior: 'smooth' });
  }

  setTimeout(() => {
    const secondElement = document.getElementById('bkmrk08R');
    if (secondElement) {
      secondElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, 10);
}

function scrollToBkmrk09() {
  const firstElement = document.getElementById('bkmrk09');
  if (firstElement) {
    firstElement.scrollIntoView({ behavior: 'smooth' });
  }

  setTimeout(() => {
    const secondElement = document.getElementById('bkmrk09R');
    if (secondElement) {
      secondElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, 10);
}

function scrollToBkmrk10() {
  const firstElement = document.getElementById('bkmrk10');
  if (firstElement) {
    firstElement.scrollIntoView({ behavior: 'smooth' });
  }

  setTimeout(() => {
    const secondElement = document.getElementById('bkmrk10R');
    if (secondElement) {
      secondElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, 10);
}

function scrollToBkmrk11() {
  const firstElement = document.getElementById('bkmrk11');
  if (firstElement) {
    firstElement.scrollIntoView({ behavior: 'smooth' });
  }

  setTimeout(() => {
    const secondElement = document.getElementById('bkmrk11R');
    if (secondElement) {
      secondElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, 10);
}

function scrollToBkmrk12() {
  const firstElement = document.getElementById('bkmrk12');
  if (firstElement) {
    firstElement.scrollIntoView({ behavior: 'smooth' });
  }

  setTimeout(() => {
    const secondElement = document.getElementById('bkmrk12R');
    if (secondElement) {
      secondElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, 10);
}

function scrollToBkmrk13() {
  const firstElement = document.getElementById('bkmrk13');
  if (firstElement) {
    firstElement.scrollIntoView({ behavior: 'smooth' });
  }

  setTimeout(() => {
    const secondElement = document.getElementById('bkmrk13R');
    if (secondElement) {
      secondElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, 10);
}

function scrollToBkmrk14() {
  const firstElement = document.getElementById('bkmrk14');
  if (firstElement) {
    firstElement.scrollIntoView({ behavior: 'smooth' });
  }

  setTimeout(() => {
    const secondElement = document.getElementById('bkmrk14R');
    if (secondElement) {
      secondElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, 10);
}

function scrollToBkmrk15() {
  const firstElement = document.getElementById('bkmrk15');
  if (firstElement) {
    firstElement.scrollIntoView({ behavior: 'smooth' });
  }

  setTimeout(() => {
    const secondElement = document.getElementById('bkmrk15R');
    if (secondElement) {
      secondElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, 10);
}

function scrollToBkmrk16() {
  const firstElement = document.getElementById('bkmrk16');
  if (firstElement) {
    firstElement.scrollIntoView({ behavior: 'smooth' });
  }

  setTimeout(() => {
    const secondElement = document.getElementById('bkmrk16R');
    if (secondElement) {
      secondElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, 10);
}

function scrollToBkmrk17() {
  const firstElement = document.getElementById('bkmrk17');
  if (firstElement) {
    firstElement.scrollIntoView({ behavior: 'smooth' });
  }

  setTimeout(() => {
    const secondElement = document.getElementById('bkmrk17R');
    if (secondElement) {
      secondElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, 10);
}

function scrollToBkmrk18() {
  const firstElement = document.getElementById('bkmrk18');
  if (firstElement) {
    firstElement.scrollIntoView({ behavior: 'smooth' });
  }

  setTimeout(() => {
    const secondElement = document.getElementById('bkmrk18R');
    if (secondElement) {
      secondElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, 10);
}

function scrollToBkmrk19() {
  const firstElement = document.getElementById('bkmrk19');
  if (firstElement) {
    firstElement.scrollIntoView({ behavior: 'smooth' });
  }

  setTimeout(() => {
    const secondElement = document.getElementById('bkmrk19R');
    if (secondElement) {
      secondElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, 10);
}

function scrollToBkmrk20() {
  const firstElement = document.getElementById('bkmrk20');
  if (firstElement) {
    firstElement.scrollIntoView({ behavior: 'smooth' });
  }

  setTimeout(() => {
    const secondElement = document.getElementById('bkmrk20R');
    if (secondElement) {
      secondElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, 10);
}

function hideGreekInEnglishOnlyService() {
  // This function is called in insertMatinsOrdinary
  // Search the document for the element with the ID "bkmark02".
  const bookmarkElement = document.getElementById("bkmrk02");

  // Check if the element was NOT found (i.e., bookmarkElement is null).
  if (!bookmarkElement) {
    console.log("✅ Bookmark 'bkmrk02' was NOT found. Proceeding to hide leftCell.");

    // Finds all <td> elements with the class "leftCell" in the main document.
    const leftCells = document.querySelectorAll('td.leftCell');

    // Loops through the found elements and sets their display style to 'none'.
    leftCells.forEach(cell => {
      cell.style.display = 'none';
    });

    console.log("All 'leftCell' elements are now display: none.");

  } else {
    // This runs if the bookmark *was* found.
    console.warn("❌ Bookmark 'bkmrk02' WAS found. No 'leftCell' elements will be hidden.");
  }
}

// ====================================================================
// PARISH MENU CORE JAVASCRIPT FUNCTIONS
// This file contains all dynamic behavior for the Parish-specific view.
// ====================================================================

// NOTE: This script assumes jQuery is loaded BEFORE this file.

// Global state variable to track the currently selected language view
let activeLanguageView = 'both';

// ----------------------------------------------------
// 1. UTILITY FUNCTIONS (Hiding, Font Sizing, etc.)
// ----------------------------------------------------

function hideClassesForParish() {
  const classesToHide = ["agesMenu", "dayMode", "nightMode", "versionMode", "clockbox", "fa-bars", "media-group", "source", "source0", "source1", "nav-flex-row", "noprintdesig", "servicesourcestitle", "servicesources", "servicesourcessection"];

  classesToHide.forEach(className => {
    const elements = document.getElementsByClassName(className);
    Array.from(elements).forEach(element => {
      element.style.display = "none";
    });
  });
  console.log("Classes hidden by hideClassesForParish.");
}

function hideParishSpaceAsteriskAndBrackets() {
  const body = document.body;
  const regex = new RegExp('\\ \\*|[\\[\\]]', 'g');
  body.innerHTML = body.innerHTML.replace(regex, '');
}

/**
 * Multiplies the current font size of the main content area 
 * by a given factor (e.g., 1.2 for larger, 0.8 for smaller).
 */
function setParishFont(factor) {
  const target = $('body');
  let currentSize = parseFloat(target.css('font-size'));
  let newSize = currentSize * factor;

  // Set limits
  const MIN_SIZE = 10;
  const MAX_SIZE = 32;

  if (newSize < MIN_SIZE) {
    newSize = MIN_SIZE;
  } else if (newSize > MAX_SIZE) {
    newSize = MAX_SIZE;
  }

  target.css('font-size', newSize + 'px');
  console.log(`Font size changed to: ${newSize}px`);
}

/**
 * Toggles the visibility of the Greek/English cells within a single row.
 * This is used for the tap-to-swap feature when only one language is displayed.
 * @param {HTMLElement} rowElement - The table row (<tr>) that was clicked.
 */
function swapParishLang(rowElement) {
  const $row = $(rowElement);
  const $greekCell = $row.find("td:even");
  const $englishCell = $row.find("td:odd");

  if ($greekCell.css('display') !== 'none') {
    // Greek is visible, so hide Greek and show English
    $greekCell.css('display', 'none');
    $englishCell.css('display', '');
  } else if ($englishCell.css('display') !== 'none') {
    // English is visible, so hide English and show Greek
    $englishCell.css('display', 'none');
    $greekCell.css('display', '');
  }
}

// Prevents the row click event (swapParishLang) from firing when clicking media icons/links.
function stopParishSwap(element) {
  $(element).closest('tr').removeAttr("onclick");
}

// Re-enables the row click event after the mouse leaves the media icon/link area.
function resumeParishSwap(element) {
  $(element).closest('tr').attr("onclick", "swapParishLang(this)");
}


// NOTE: These are the core column hiding utilities.
function hideParishAllLeft() {
  // Logic to hide the LEFT (Greek) column, leaving only the RIGHT (English) column visible.

  // 1. Reset all
  $("td").css("display", "");
  $("div.media-group-empty").css("display", "");
  $("div.media-group-empty").addClass("m-g-e");

  // 2. Attach swap handlers for single-language mode
  $("tr:has(p.alttext,p.chant,p.heirmos,p.hymn,p.hymnlinefirst,p.hymnlinemiddle,p.hymnlinelast,p.prayer,p.prayerzero,p.verse,p.versecenter,p.inaudible,p.dialog,p.dialogzero,p.reading,p.readingzero,p.readingcenter,p.readingcenterzero,p.rubric,.media-group,.dialogafteractor,p.iambiccanon1,p.iambiccanon234,p.iambiccanon5)").attr("onclick", "swapParishLang(this)");
  $(".media-icon,i,li").attr("onmousedown", "stopParishSwap(this)");
  $(".media-icon,i,li").attr("onmouseout", "resumeParishSwap(this)");

  // 3. Hide the Greek columns
  //$("td:even").css("background-color", "#FFF7E6");
  $("td:even").css("display", "none");
  $("td").css("border", "0");

  console.log("Hiding all left columns (English only view, tap-to-swap enabled).");
}

function hideParishAllRight() {
  // Logic to hide the RIGHT (English) column, leaving only the LEFT (Greek) column visible.

  // 1. Reset all
  $("td").css("display", "");
  $("div.media-group-empty").css("display", "");
  $("div.media-group-empty").addClass("m-g-e");

  // 2. Attach swap handlers for single-language mode
  $("tr:has(p.alttext,p.chant,p.heirmos,p.hymn,p.hymnlinefirst,p.hymnlinemiddle,p.hymnlinelast,p.prayer,p.prayerzero,p.verse,p.versecenter,p.inaudible,p.dialog,p.dialogzero,p.reading,p.readingzero,p.readingcenter,p.readingcenterzero,p.rubric,.media-group,.dialogafteractor,p.iambiccanon1,p.iambiccanon234,p.iambiccanon5)").attr("onclick", "swapParishLang(this)");
  $(".media-icon,i,li").attr("onmousedown", "stopParishSwap(this)");
  $(".media-icon,i,li").attr("onmouseout", "resumeParishSwap(this)");

  // 3. Hide the English columns
  //$("td:even").css("background-color", "#FFF7E6");
  $("td:odd").css("display", "none");
  $("td").css("border", "0");

  console.log("Hiding all right columns (Greek only view, tap-to-swap enabled).");
}

/**
 * Executes the function to reset the column display to show both.
 * This also removes swap handlers.
 */
function showParishBothColumns() {
  // 1. Reset all display properties
  $("td").css("display", ""); // Show both columns
  //$("td").css("background-color", "#FFF7E6"); // Reapply colors as per your original code
  $("div.media-group-empty").css("display", "");

  // 2. Remove swap handlers for bilingual mode
  $("tr").removeAttr("onclick");
  $(".media-icon,i,li").removeAttr("onmousedown").removeAttr("onmouseout");

  console.log("Both columns are now displayed (default state, tap-to-swap disabled).");
}

/**
 * Scrolls the document smoothly back to the top (0, 0 position).
 */
function scrollToTop() {
  $('html, body').animate({ scrollTop: 0 }, 600);
  console.log("Scrolled document to top.");
}


// ----------------------------------------------------
// 2. MENU CREATION AND CONTROL
// ----------------------------------------------------

/**
 * Creates the menu button element and attaches its click handler.
 */
function createParishMenuButton() {
  if (document.getElementById('menu-button')) {
    return;
  }

  let menuButton = document.createElement('button');
  menuButton.id = 'menu-button';
  // Using 'fa' class as per your specific Font Awesome version
  menuButton.innerHTML = '<i class="fa fa-bars"></i>';
  menuButton.onclick = createParishMenu;
  document.body.appendChild(menuButton);

  console.log("Created menu button.");
}

function createParishMenu() {
  let existingMenu = document.getElementById('parish-menu');

  if (existingMenu) {
    console.log("Menu already exists.");
    return;
  }

  let menuDiv = document.createElement('div');
  menuDiv.className = 'parishMenu';
  menuDiv.id = 'parish-menu';

  // --- Dynamic button state generation ---
  const isBothActive = activeLanguageView === 'both';
  const isGreekActive = activeLanguageView === 'greek';
  const isEnglishActive = activeLanguageView === 'english';

  const bothClass = isBothActive ? 'active-lang' : '';
  const greekClass = isGreekActive ? 'active-lang' : '';
  const englishClass = isEnglishActive ? 'active-lang' : '';

  const bothIcon = isBothActive ? 'fa-check-square' : 'fa-language';
  const greekIcon = isGreekActive ? 'fa-check-square' : 'fa-language';
  const englishIcon = isEnglishActive ? 'fa-check-square' : 'fa-language';

  // Menu content with font controls and language toggles
  menuDiv.innerHTML = `
      <h2>Preferences</h2>
      <hr> <!-- Line break separating Heading from Font Controls -->

      <!-- FONT SIZE CONTROLS -->
      <h3>Text Size</h3>
      <div class="font-controls">
          <button class="enlargeFontBtn">
              <i class="fa fa-plus-circle"></i> Enlarge Text
          </button>
          <br>
          <button class="shrinkFontBtn">
              <i class="fa fa-minus-circle"></i> Shrink Text
          </button>
      </div>
      
      <hr> <!-- Line break separating Font Controls and Language View Group -->
      
      <!-- LANGUAGE CONTROLS: Now using three mutually exclusive buttons -->
      <h3>Language View</h3>
      <div class="lang-btn-group">
          
          <!-- Greek and English (Both) Button: Dynamic state applied -->
          <button id="view-both-btn" class="lang-view-btn ${bothClass}" onclick="setParishLanguageView('both')">
              <i class="fa ${bothIcon}"></i> Greek | English
          </button>
          <br>

          <!-- Greek Only Button: Dynamic state applied -->
          <button id="view-greek-only-btn" class="lang-view-btn ${greekClass}" onclick="setParishLanguageView('greek')">
              <i class="fa ${greekIcon}"></i> Greek
          </button>
          <br>

          <!-- English Only Button: Dynamic state applied -->
          <button id="view-english-only-btn" class="lang-view-btn ${englishClass}" onclick="setParishLanguageView('english')">
              <i class="fa ${englishIcon}"></i> English
          </button>
          <br>
          <h5>When you select one language, Greek or English, you can tap on any paragraph in the service, and it will switch to the other language.</h5>
      </div>

      <hr> <!-- Line break separating Language Controls and Navigation -->
      
      <!-- NAVIGATION CONTROLS -->
      <h3>Navigation</h3>
      <div class="nav-controls">
          <button class="scroll-top-btn" onclick="scrollToTop()">
              <i class="fa fa-arrow-up"></i> Go to Quick Links
          </button>
      </div>

      <hr> 
      
      <!-- CLOSE BUTTON -->
      <button class="closeParishMenuBtn" onclick="document.getElementById('parish-menu').remove()">
          <i class="fa fa-times"></i> Close Menu
      </button>
    `;

  document.body.appendChild(menuDiv);
  console.log("Created .parishMenu div.");
}

/**
 * Checks if a click occurred outside the menu or the open button and closes the menu.
 */
function closeParishMenuOnOutsideClick(event) {
  const menu = document.getElementById('parish-menu');
  const button = document.getElementById('menu-button');

  if (!menu) {
    return;
  }

  const clickedOutsideMenu = !menu.contains(event.target);
  const clickedNotOnButton = !button.contains(event.target);

  if (clickedOutsideMenu && clickedNotOnButton) {
    menu.remove();
    console.log("Parish Menu closed by outside click.");
  }
}


/**
 * Sets the main language view (Greek Only, English Only, or Both).
 * This function ensures only one view button is active at a time.
 * @param {string} view - 'greek', 'english', or 'both'.
 */
function setParishLanguageView(view) {
  // 1. Reset all buttons visually to inactive
  $(".lang-view-btn").removeClass('active-lang');
  // Change active icon (check-square) back to inactive icon (language)
  $(".lang-view-btn").find('.fa').removeClass('fa-check-square').addClass('fa-language');

  let targetButton;
  let viewFunction;

  // 2. Determine the target button and the corresponding view function
  if (view === 'greek') {
    targetButton = $("#view-greek-only-btn");
    viewFunction = hideParishAllRight;
  } else if (view === 'english') {
    targetButton = $("#view-english-only-btn");
    viewFunction = hideParishAllLeft;
  } else if (view === 'both') {
    targetButton = $("#view-both-btn");
    viewFunction = showParishBothColumns;
  } else {
    console.error("Invalid language view specified:", view);
    return;
  }

  // 3. Set the target button to active state (for immediate feedback)
  targetButton.addClass('active-lang');
  // Change inactive icon (language) to active icon (check-square)
  targetButton.find('.fa').removeClass('fa-language').addClass('fa-check-square');

  // 4. Update the global state
  activeLanguageView = view;

  // 5. Apply the selected view
  viewFunction();
  console.log(`Switched to ${view} view.`);
}


// ----------------------------------------------------
// 3. INITIALIZATION AND EVENT DELEGATION
// ----------------------------------------------------

$(document).ready(function () {
  // --- Event Delegation for Dynamic Buttons (Font Control) ---
  // Delegation is attached to the document for dynamically created buttons.

  // INCREASE FONT SIZE BUTTON
  $(document).on('click', '.enlargeFontBtn', function (e) {
    e.preventDefault();
    setParishFont(1.2);
  });

  // DECREASE FONT SIZE BUTTON
  $(document).on('click', '.shrinkFontBtn', function (e) {
    e.preventDefault();
    setParishFont(0.8);
  });


  // --- Conditional Initialization ---

  const requiredReferrer = 'https://dcs.goarch.org/goa/dcs/parish.html';
  const currentReferrer = document.referrer;

  if (currentReferrer === requiredReferrer) {
    console.log("Parish referrer matched. Initializing features.");

    // 1. Set default state to show both columns (tap-to-swap disabled by default)
    showParishBothColumns();

    // 2. Run initial hiding and modification functions
    hideClassesForParish();
    hideParishSpaceAsteriskAndBrackets();

    // 3. Create the menu and attach the outside click listener
    createParishMenuButton();
    $(document).on('click', closeParishMenuOnOutsideClick);

  } else {
    console.log("Parish features NOT initialized. Referrer was:", currentReferrer || "[Direct access or no referrer]");
  }
});

// ----------------------------------------------------
// END PARISH FUNCTIONS
// ----------------------------------------------------

/**
 * @function initCollapsibleRows
 * @description Initializes the behavior for a collapsible table structure.
 * It handles showing/hiding blocks of table rows based on clicks
 * on rows containing specific collapse markers (.bmc_collapse and .emc_collapse).
 * The logic implements an accordion-like functionality for table content.
 * @version 1.0.0
 */
function initCollapsibleRows() {
  // --- Initial State Setup ---
  // Hide all rows between a 'bmc_collapse' row and the next 'emc_collapse' row (the content).
  $("tr:has(.bmc_collapse)").nextUntil("tr:has(.emc_collapse)").hide();
  // Hide all 'emc_collapse' rows (the collapse markers/footers).
  $("tr:has(.emc_collapse)").hide();

  // --- Big/Main Collapse (BMC) Click Handler ---
  // When a row with a '.bmc_collapse' marker is clicked:
  $("tr:has(.bmc_collapse)").click(function () {
    // 1. Show all subsequent content rows up until the next 'emc_collapse' row.
    $(this).nextUntil('tr:has(.emc_collapse)').show();
    // 2. Apply a background color to the shown content rows for visual emphasis.
    $(this).nextUntil('tr:has(.emc_collapse)').css("background-color", "#FDF6E7");
    // 3. Hide the clicked 'bmc_collapse' row itself.
    $(this).hide();
    // 4. Show the corresponding 'emc_collapse' row (the collapse marker/footer).
    $(this).nextAll('tr:has(.emc_collapse):first').show();
  });

  // --- End/Exit Collapse (EMC) Click Handler ---
  // When a row with an '.emc_collapse' marker is clicked:
  $("tr:has(.emc_collapse)").click(function () {
    // 1. Hide all preceding content rows down to the previous 'bmc_collapse' row.
    $(this).prevUntil('tr:has(.bmc_collapse)').hide();
    // 2. Hide the clicked 'emc_collapse' row itself.
    $(this).hide();
    // 3. Show the corresponding 'bmc_collapse' row (the main opener).
    $(this).prevAll('tr:has(.bmc_collapse):first').show();

    // 4. Scroll the viewport to the newly shown 'bmc_collapse' row.
    var show_pos = $(this).prevAll('tr:has(.bmc_collapse):first').position();
    window.scrollTo(0, show_pos.top - 50);
  });
}

// --- Execution ---
// Execute the function once the entire document is ready.
$(document).ready(function () {
  initCollapsibleRows();
});


// This file assumes jQuery is loaded elsewhere on the page.

window.onload = function () {

  const frameAudioElement = document.getElementById('FrameAudio');

  if (!frameAudioElement) {
    // If the frame isn't found, stop silently.
    return;
  }

  // --- I. Helper Functions ---

  const removeButtonFromDOM = () => {
    let currentButton = document.getElementById('turnOffAudioButton');
    if (currentButton && currentButton.parentNode) {
      currentButton.parentNode.removeChild(currentButton);
    }
  };

  const createButtonInDOM = () => {
    let stopButton = document.getElementById('turnOffAudioButton');
    if (!stopButton) {
      stopButton = document.createElement('button');
      stopButton.id = 'turnOffAudioButton';
      stopButton.textContent = 'X';
      stopButton.onclick = terminateMediaSession;
      document.body.appendChild(stopButton);
    }
  };

  // --- II. Termination (Close Player) Function ---

  function terminateMediaSession() {

    if (frameAudioElement && frameAudioElement.contentWindow) {
      let frameDocument = frameAudioElement.contentDocument || frameAudioElement.contentWindow.document;
      let mediaElement = frameDocument.querySelector('video[name="media"]');

      if (mediaElement) {
        // Robust media shutdown
        mediaElement.pause();
        mediaElement.currentTime = 0;
        mediaElement.src = "";
        mediaElement.load();
      }
    }

    // Final cleanup
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = 'none';
    }

    if (frameAudioElement) {
      frameAudioElement.src = 'about:blank';
    }

    removeButtonFromDOM();
  }

  // --- III. Event Delegation (jQuery Click Handler) ---

  // Selects links ending in .mp3 and targeting FrameAudio
  const mp3LinkSelector = "a[href$='.mp3'][target='FrameAudio']";

  // Attach delegated click listener to the document body using jQuery
  $(document).on('click', mp3LinkSelector, function (event) {

    // Clear old session before starting a new one
    removeButtonFromDOM();
    if (frameAudioElement) {
      frameAudioElement.src = 'about:blank';
    }
    // Let the browser handle navigating the iframe via the link's href.
  });

  // --- IV. Iframe Load Listener ---

  frameAudioElement.addEventListener('load', () => {

    // Small delay remains a robust safeguard for DOM rendering
    setTimeout(() => {
      let frameDocument = frameAudioElement.contentDocument || frameAudioElement.contentWindow.document;
      let mediaElementInFrame = frameDocument.querySelector('video[name="media"]');

      if (mediaElementInFrame) {

        // Create the button immediately upon element discovery
        createButtonInDOM();

        // Attach the removal listeners (only on terminal pause/end)
        mediaElementInFrame.addEventListener('pause', () => {
          if (mediaElementInFrame.currentTime === 0 || mediaElementInFrame.ended) {
            removeButtonFromDOM();
          }
        });

        mediaElementInFrame.addEventListener('ended', removeButtonFromDOM);
      }
    }, 100);
  });

}; // End of window.onload


