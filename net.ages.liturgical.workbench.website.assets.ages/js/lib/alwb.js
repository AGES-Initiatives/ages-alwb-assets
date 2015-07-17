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
    Android: function() {
        return (navigator.userAgent.match(/Android/i) != null);
    },
    AndroidPhone: function() {
        return (
        		    (navigator.userAgent.match(/Android/i) != null)
        		&& (navigator.userAgent.match(/Mobile/i) != null)
        				);
    },
    BlackBerry: function() {
        return (navigator.userAgent.match(/BlackBerry/i) != null);
    },
    iOS: function() {
        return (navigator.userAgent.match(/iPhone|iPad|iPod/i) != null);
    },
    iPhone: function() {
        return (navigator.userAgent.match(/iPhone/i) != null);
    },
    iPad: function() {
        return (navigator.userAgent.match(/iPad/i) != null);
    },
    iPod: function() {
        return (navigator.userAgent.match(/iPod/i) != null);
    },
    Opera: function() {
        return (navigator.userAgent.match(/Opera Mini/i) != null);
    },
    Windows: function() {
        return (navigator.userAgent.match(/IEMobile/i) != null);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

if (typeof alwbTooltips != 'undefined') {
	$(".tip-audio1").attr("title",alwbTooltips.l1.Audio);
	$(".tip-byzantine1").attr("title",alwbTooltips.l1.Byzantine);
	$(".tip-western1").attr("title",alwbTooltips.l1.Western);
	$(".tip-audio2").attr("title",alwbTooltips.l2.Audio);
	$(".tip-byzantine2").attr("title",alwbTooltips.l2.Byzantine);
	$(".tip-western2").attr("title",alwbTooltips.l2.Western);	
}

function swapLang(myRow) {
	$(myRow.cells).toggle();
}

function stopSwap(myRow) {
	$("tr:has(.media-group)").removeAttr("onclick","swapLang(this)");
}

function resumeSwap(myRow) {
    $("tr:has(.media-group)").attr("onclick","swapLang(this)");
}

function hideAllLeft () {
$("td").css("display","");
$("div.media-group-empty").css("display","");
$("div.media-group-empty").addClass("m-g-e");
$("tr:has(p.chant,p.heirmos,p.hymn,p.hymnlinefirst,p.hymnlinemiddle,p.hymnlinelast,p.prayer,p.prayerzero,p.verse,p.versecenter,p.inaudible,p.dialog,p.dialogzero,p.reading,p.readingzero,p.readingcenter,p.readingcenterzero,p.rubric,.media-group)").attr("onclick","swapLang(this)");
$(".media-icon,i,li").attr("onmousedown","stopSwap(this)");
$(".media-icon,i,li").attr("onmouseout","resumeSwap(this)");
$("td:even").css("background-color","#FFF7E6");
$("td:even").css("display","none");
$("td").css("border","0");

// Added
$('.fa-columns.ages-col-picker').show();
$('.fa-caret-square-o-right.ages-col-picker').hide();
$('.fa-caret-square-o-left.ages-col-picker').show();

displayingBilingual = false;
}

function hideAllRight() {
$("td").css("display","");
$("div.media-group-empty").css("display","");
$("div.media-group-empty").addClass("m-g-e");
$("tr:has(p.chant,p.heirmos,p.hymn,p.hymnlinefirst,p.hymnlinemiddle,p.hymnlinelast,p.prayer,p.prayerzero,p.verse,p.versecenter,p.inaudible,p.dialog,p.dialogzero,p.reading,p.readingzero,p.readingcenter,p.readingcenterzero,p.rubric,.media-group)").attr("onclick","swapLang(this)");
$(".media-icon,i,li").attr("onmousedown","stopSwap(this)");
$(".media-icon,i,li").attr("onmouseout","resumeSwap(this)");
$("td:even").css("background-color","#FFF7E6");
$("td:odd").css("display","none");
$("td").css("border","0");

// Added
$('.fa-columns.ages-col-picker').show();
$('.fa-caret-square-o-left.ages-col-picker').hide();
$('.fa-caret-square-o-right.ages-col-picker').show();

displayingBilingual = false;
}


function showAll() {
	$("div.media-group-empty").css("display","none");
	$("tr").removeAttr("onclick");
	$(".media-icon,i,li").removeAttr("onmousedown","stopSwap(this)");
	$(".media-icon,i,li").removeAttr("onmouseout","resumeSwap(this)");
	$("td").css("display","");
	$("td").css("border","");
	$("td:even").css("background-color","#FBF0D9");

	// Added
	$('.fa-columns.ages-col-picker').hide();
	$('.fa-caret-square-o-left.ages-col-picker').show();
	$('.fa-caret-square-o-right.ages-col-picker').show();

	displayingBilingual = true;
}

$(document).ready(function(){
	$("td.leftCell span.versiondesignation").css("display","none");
	});


$.expr[':'].notext = function detectNoText(x){ return x.innerHTML && x.innerHTML.replace(/(<!--.*(?!-->))|\s+/g, '').length === 0 }

function notAvailable() {
$("p.hymn:notext").removeClass("hymn").addClass("rubric").text("(The English text of this hymn is missing, because it was either inaccessible at the time of publication or unavailable due to copyright restrictions.)").css("background-color","white");
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
function getClock(){
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
			if(nmin <= 9) {
				nmin = "0" +nmin;
			}
			$('#clockbox').text(nhour+":"+nmin+ap);
			setTimeout("getClock()", 1000);
		};

$(window).bind("load", function() {
	$("span.media-icon").attr("title","Open Lang 2 Western");
	$("span.media-icon-audio").attr("title","Open Lang 2 Audio");
 	$('.content').css('top', parseInt($('.navbar').css("height"))+10);
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
			$(".navbar-default").css("position","relative");
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
	 var newFontSize = adjustedFontSizeNum*scaler;
	 $(".content").css('font-size', newFontSize);
	 if (isMobile.any()) {
		 $("agesMenu").css("padding-top","15px");
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
		 $(".index-content").css('top', $(".agesMenu").height()+15);
	 }
}

function resizeNume(size) {
	 var byz = $(".byzscore");
	 if (byz.length > 0) {
		 byz.css('height',adjustedFontSize);
		 byz.css('width',adjustedFontSize*1.3);
	 }
}
function setFontTo(size) {
	adjustedFontSize = parseFloat(adjustedFontSize, 10)*size;
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
	$("i.ages-menu-link, ul.jqm-dropdown-menu").css("font-size",(menuFont*menuScaler+"pt"));
	 offsetContent();
}
$(window).on('resize orientationChanged', function() {
  return false;
});

$(document).ready(function(){
	$('.collapse').collapse()
	adjustedFontSize = $("body").css('font-size');
	dayBackgroundColor = $("body").css('background-color');
	dayFontColor = $("body").css('color');
	dayMenuIconColor = $("i.ages-menu-link").css('color');
	dayMenuBarColor  = $("div.agesMenu").css('background-color');
	redElements = $('*').filter(function(){ return ( $(this).css('color') == "rgb(255, 0, 0)");  });

	if (getLanguages()) {
        setLangVars();
    }

  if ($(".panel-group").length > 0) {
	  indexPage = true;
  }
  if (isMobile.any()) {
	  $(".clockbox").remove();
	  $(".agesMenu a .fa").css('font-size','12pt');
  } 	

  getClock();
  elements = $(".content");
  
  // Increase Font Size
  $(".increaseFont").click(function(){
	    setFontTo(1.2);
	    resizeNume();
    return false;
  });
  // Decrease Font Size
  $(".decreaseFont").click(function(){
	    setFontTo(0.8);
		resizeNume();
    return false;
  });

$('.dayMode').toggle(); // Added
  
$(".dayMode").click(function(){
	$("html, body, body *").css('background-color',dayBackgroundColor);
	$("p").css('color',dayFontColor);
	$(redElements).css('color','red');
	$("i.ages-menu-link *").css('color',dayMenuIconColor);
	$("div.agesMenu, div.agesMenu *").css('background-color',dayMenuBarColor);

	$('.dayMode').toggle(); // Added
	$('.nightMode').toggle(); // Added

	return false;
});

$(".nightMode").click(function(){
	$("html, body, body *").css('background-color','black');
	$("p").css('color','#FBF0D9');
	$(redElements).css('color','red');
	$("i.ages-menu-link *").css('color',dayMenuIconColor);
	$("div.agesMenu, div.agesMenu *").css('background-color',dayMenuBarColor);

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

$.fn.visible = function() {
	return this.css('visibility', 'visible');
};

$.fn.invisible = function() {
	return this.css('visibility', 'hidden');
};

$.fn.visibilityToggle = function() {
	return this.css('visibility', function(i, visibility) {
        return (visibility == 'visible') ? 'hidden' : 'visible';
    });
};

$(".versionMode").click(function(){
	$("span.versiondesignation").visibilityToggle();
	$("p.source").visibilityToggle();
	$("p.source0").visibilityToggle();
	return false;
});

$("tr:has(.collapsetop)").nextUntil("tr:has(.collapsebottom)").hide();
$("tr:has(.collapsebottom)").hide();

$("tr:has(.collapsetop)").click(function() {
	$(this).nextUntil('tr:has(.collapsebottom)').show();
	$(this).nextUntil('tr:has(.collapsebottom)').css("background-color", "#FDF6E7");
	$(this).hide();
	$(this).nextAll('tr:has(.collapsebottom):first').show();
});
$("tr:has(.collapsebottom)").click(function() {
	$(this).prevUntil('tr:has(.collapsetop)').hide();
	$(this).hide();
	$(this).prevAll('tr:has(.collapsetop):first').show();

	var show_pos = $(this).prevAll('tr:has(.collapsetop):first').position();
	window.scrollTo(0,show_pos.top-50);
});

// Added - start
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
show_media = getCookie('showmedialinks');

if (!isMobile.iPad()) {
	$('a.versionMode').after('<a href="#" class="mediaMode"><i class="fa fa-music mediaMode ages-menu-link"></i></a>');
	$('.mediaMode').click(function() {
		$('.media-group').toggle();
		var media_val = $('.media-group:first').css('display');
		setCookie('showmedialinks',media_val,100);
		return false;
	});	
	$('.media-group').toggle();
	if (show_media == "none") {
		$('.media-group').hide();
	} else if(show_media == "block") {
		$('.media-group').show();
	}
}

// Test to see if this is an extended service file
if ((window.location.href.indexOf('ma2') >= 0) || (window.location.href.indexOf('MA2') >= 0)) {
  $('body').append('<div class="pref-panel"><h2>Service Preferences</h2></div>')

  $('a.mediaMode').after('<a href="#" class="prefMode"><i class="fa fa-list-ul prefMode ages-menu-link"></i></a>');

  // Check for Eothinon Gospel
  var has_eothinon_gospel = false;
  if ( $('.bmc_eothinongospel_position1').length > 0 ) {
    has_eothinon_gospel = true;
  }

  // Determine which canons are present
  var opt_class_list = [];
  $('[class^="bmc_"]').each(function() {
    var class_name = $(this).attr('class');
    if (opt_class_list.indexOf( class_name ) == -1) {
      opt_class_list.push(class_name);
    }
  });
  //console.log(opt_class_list);
  var canon_list = [];
  for (var i = 0; i < opt_class_list.length; i++) {
    var ode1_index = opt_class_list[i].indexOf("ode1_");
    if (ode1_index >= 0) {
      canon_list.push(opt_class_list[i].substr(ode1_index+5));
    }
  };

  //var spacer_text = "<tr><td class='pref-row-spacer'></td><td></td></tr>";
  var spacer_text = "<div class='pref-spacer'></div>";

  //$(".pref-panel").append("<table id='pref-table'>");
  $(".pref-panel").append("<div class='pref-opts'></div>");
  $(".pref-opts").append("<div class='pref-instructions'><p>"+
      "The pre-selected default preferences will display the Matins service as it is in the regular Matins file. Use this panel to choose which parts of the canon to display, and also the position of the Eothinon Gospel,"+
      " Kontakia and Katavasias, and whether or not to display end litanies and dismissal. Certain selections will make others inaccesible, to prevent mistakes. "+
      " Once you have "+
      " selected your preferences, click Apply. You will then be taken to the text of the service. If you want to change "+
      "your preferences, click on the Preferences Button on the right hand corner of the left frame.</p>" +
      "<br><p>If you want to print the customized service as it appears in " +
      "your browser in the left frame, turn off the media icons using the music button on the blue toolbar. "+
      "Choose your bilingual or English only preference. Click on the printer button that will appear on the "+
      "right hand corner of the left frame. Bilingual texts will print in two columns. English only text will print in a "+
      "single column, filling the page. The iPad app does not yet support printing of the customized text.</p></div>");

  $(".pref-opts").append('<div class="pref-closer">Apply</div>');

  // Eothinon Gospel
  if (has_eothinon_gospel) {
    var gospel_label1 = $('.bmc_eothinongospel_position1:first').text();
    //$(".pref-panel").append("<tr><td><label for='radio-eothinon-1'>"+gospel_label1+"</label></td>"
    //+ "<td><input id='radio-eothinon-1' type='radio' name='radio-eothinon'></td></tr>");
    //$(".pref-panel").append(spacer_text);
    $('.pref-opts').append("<div class='pref-left'><label for='radio-eothinon-1'>"+gospel_label1+"</label></div>"
          + "<div class='pref-right'><input id='radio-eothinon-1' type='radio' name='radio-eothinon'></div>"
          + spacer_text);
  }

  // Ode 1
  //$(".pref-panel").append( ode_to_html(canon_list,1) );
  //$(".pref-panel").append(spacer_text);
  $(".pref-opts").append( ode_to_html(canon_list,1) + spacer_text );
  // Ode 3
  $(".pref-opts").append( ode_to_html(canon_list,3) + spacer_text );

  // Short litany after Ode 3
  $(".pref-opts").append( short_litany_html(3) + spacer_text );

  // Kontakion and Mid-ode Kathisma
  var kathisma_label = $('.bmc_ode3_kathisma:first').text();
  var kontak_label2 = $('.bmc_kontakion_position2:first').text();
  /*$(".pref-panel").append("<tr><td><label for='cb-kontakion-2'>"+kontak_label2+"</label></td>"
    + "<td><input id='cb-kontakion-2' type='checkbox'></td></tr>");
  $(".pref-panel").append("<tr><td><label for='cb-midode-kathisma'>"+kathisma_label+"</label></td>"
    + "<td><input id='cb-midode-kathisma' type='checkbox'></td></tr>");
  $(".pref-panel").append(pref-spacer_text);*/

  if (kontak_label2 != '')
    $(".pref-opts").append("<div class='pref-left'><label for='cb-kontakion-2'>"+kontak_label2+"</label></div>"
        + "<div class='pref-right'><input id='cb-kontakion-2' type='checkbox'></div>");
  if (kathisma_label != '')
    $(".pref-opts").append("<div class='pref-left'><label for='cb-midode-kathisma'>"+kathisma_label+"</label></div>"
        + "<div class='pref-right'><input id='cb-midode-kathisma' type='checkbox'></div>"
        + spacer_text);

  // Ode 4
  $(".pref-opts").append( ode_to_html(canon_list,4) + spacer_text );
  //$(".pref-opts").append(spacer_text);

  // Ode 5
  $(".pref-opts").append( ode_to_html(canon_list,5) + spacer_text );
  //$(".pref-opts").append(spacer_text);

  // Odd 6
  $(".pref-opts").append( ode_to_html(canon_list,6) + spacer_text );
  //$(".pref-opts").append(spacer_text);

  // Short litany after Ode 6
  $(".pref-opts").append( short_litany_html(6) + spacer_text );
  //$(".pref-panel").append(spacer_text);

  // Kontakion and Synaxarion
  var kontak_label1 = $('.bmc_kontakion_position1:first').text();
  //$(".pref-panel").append("<tr><td><label for='cb-kontakion-1'>"+kontak_label1+"</label></td>"
  //  + "<td><input id='cb-kontakion-1' type='checkbox'></td></tr>");
  //$(".pref-panel").append(spacer_text);
  if (kontak_label1 != '') {
    $(".pref-opts").append("<div class='pref-left'><label for='cb-kontakion-1'>"+kontak_label1+"</label></div>"
        + "<div class='pref-right'><input id='cb-kontakion-1' type='checkbox'></div>" + spacer_text);  
  }

  var extended_synax_label = $('.bmc_synaxarion_extended:first').text();
  if (extended_synax_label != '')
    $(".pref-opts").append("<div class='pref-left'><label for='cb-extended_synaxarion'>"+extended_synax_label+"</label></div>"
        + "<div class='pref-right'><input id='cb-extended_synaxarion' type='checkbox'></div>" + spacer_text );
  

  // Ode 7
  $(".pref-opts").append( ode_to_html(canon_list,7) + spacer_text);

  // Ode 8
  $(".pref-opts").append( ode_to_html(canon_list,8) + spacer_text);

  var kontak_label12 = $('.bmc_kontakion_position12:first').text();
  //$(".pref-panel").append("<tr><td><label for='cb-kontakion-12'>"+kontak_label12+"</label></td>"
  //  + "<td><input id='cb-kontakion-12' type='checkbox'></td></tr>");
  if (kontak_label12 != '') {
    $(".pref-opts").append("<div class='pref-left'><label for='cb-kontakion-12'>"+kontak_label12+"</label></div>"
      + "<div class='pref-right'><input id='cb-kontakion-12' type='checkbox'></div>");  
  }
  

  // Katavasias 1-8
  $(".pref-opts").append("<div class='pref-left'><label for='cb-katavasias1345678'>Katavasias 1345678</label></div>"
        + "<div class='pref-right'><input id='cb-katavasias1345678' type='checkbox'></div>"
        + spacer_text);


  // Eothinon Gospel
  if (has_eothinon_gospel) {
    var gospel_label2 = $('.bmc_eothinongospel_position2:first').text();
    $(".pref-opts").append("<div class='pref-left'><label for='radio-eothinon-2'>"+gospel_label2+"</label></div>"
          + "<div class='pref-right'><input id='radio-eothinon-2' type='radio' name='radio-eothinon'></div>"
          + spacer_text);
  }

  // Ode 9
  var mag_label1 = $('.bmc_magnificat_modeokatavasia:first').text();
  var mag_label2 = $('.bmc_magnificat_modeofcanon:first').text();
  if (mag_label1 != '')
    $(".pref-opts").append("<div class='pref-left'><label for='radio-mag-katavasia'>" + mag_label1 + "</label></div>"
        + "<div class='pref-right'><input type='radio' name='radio-magnificat' id='radio-mag-katavasia'></div>");
  
  if (mag_label2 != '')
    $(".pref-opts").append("<div class='pref-left'><label for='radio-mag-modeofcanon'>" + mag_label2 + "</label></div>"
        + "<div class='pref-right'><input type='radio' name='radio-magnificat' id='radio-mag-modeofcanon'></div>"
        + spacer_text);

  $(".pref-opts").append( ode_to_html(canon_list,9) );
  $(".pref-opts").append(spacer_text);

  var dismissal_label1 = $('.bmc_matins_end_no_dismissal:first').text();
  var dismissal_label2 = $('.bmc_matins_end_before_dismissal:first').text();
  var dismissal_label3 = $('.bmc_matins_close:first').text();

  if (dismissal_label1 != '')
    $(".pref-opts").append("<div class='pref-left'><label for='cb-dismissal1'>"+dismissal_label1+"</label></div>"
      + "<div class='pref-right'><input type='checkbox' id='cb-dismissal1'></div>");
  if (dismissal_label2 != '')
    $(".pref-opts").append("<div class='pref-left'><label for='cb-dismissal2'>"+dismissal_label2+"</label></div>"
      + "<div class='pref-right'><input type='checkbox' id='cb-dismissal2'></div>");
  if (dismissal_label3 != '')
    $(".pref-opts").append("<div class='pref-left'><label for='cb-dismissal3'>"+dismissal_label3+"</label></div>"
      + "<div class='pref-right'><input type='checkbox' id='cb-dismissal3'></div>");

  $(".pref-opts").append("<div class='pref-closer'>Apply</div>");

  // Add print and services preference links
  if (!isMobile.iPad())
    $(".content").prepend('<p class="print-btn"><a href="#" class="print-service"><i class="fa fa-print" title="Print this frame"></i></a></p>');
  $(".content").prepend('<p class="print-btn"><a href="#" class="prefMode"><i class="fa fa-list-ul prefMode" title="Open service preferences"></i></a></p>');

  // Bind click functions for Eothinon Gospels
  $("#radio-eothinon-1, #radio-eothinon-2").click(function() {
    show_eothinon(this.id.slice(-1));
  });

  // Bind click functions for Kontakion
  $("#cb-kontakion-1, #cb-kontakion-2, #cb-kontakion-12").click(function() {
    var kNum = this.id.split('-')[2];
    show_kontakion(kNum, this.checked);
    if (kNum == 12) {
      show_kontakion(1, false);
      show_kontakion(2, false);
      $("#cb-kontakion-1").prop("checked",false);
      $("#cb-kontakion-2").prop("checked",false);
    } else if ((kNum == 1) || (kNum == 2)) {
      show_kontakion(12, false);
      $("#cb-kontakion-12").prop("checked", false);
    }
  });

  // Bind click functions for canon odes
  $('[id^="cb-ode"]').click(function() {
    //console.log("CB clicked: "+this.id + " - " + this.checked);
    if (this.checked) {
      $('tr:has(p.bmc_'+this.id.slice(3)+')').nextUntil('tr:has(p.emc_'+this.id.slice(3)+')').show();
    } else {
      $('tr:has(p.bmc_'+this.id.slice(3)+')').nextUntil('tr:has(p.emc_'+this.id.slice(3)+')').hide();
    }

    if (this.id.indexOf('_katavasia') >= 0) {
      var test_katavasia = check_ode_katavasia();
      if (test_katavasia) {
        $('#cb-katavasias1345678').prop('checked',false);
        $('tr:has(p.bmc_odes1345678_katavasia)').nextUntil('tr:has(p.emc_odes1345678_katavasia)').hide();
        $("#cb-katavasias1345678").attr('disabled',true);
      } else {
        $('#cb-katavasias1345678').attr('disabled',false);
      }
    }
  });

  // Bind click function for midode Kathisma
  $("#cb-midode-kathisma").click(function() {
    if (this.checked) {
      $("tr:has(p.bmc_ode3_kathisma)").nextUntil('tr:has(p.emc_ode3_kathisma)').show();
    } else {
      $("tr:has(p.bmc_ode3_kathisma)").nextUntil('tr:has(p.emc_ode3_kathisma)').hide();
    }
  });

  // Bind click function for katavasia1345678
  $("#cb-katavasias1345678").click(function() {
    if (this.checked) {
      $("tr:has(p.bmc_odes1345678_katavasia)").nextUntil('tr:has(p.emc_odes1345678_katavasia)').show();
    } else {
      $('tr:has(p.bmc_odes1345678_katavasia)').nextUntil('tr:has(p.emc_odes1345678_katavasia)').hide();
    }
  });

  // Bind click function for magnificat
  $("#radio-mag-katavasia, #radio-mag-modeofcanon").click(function() {
    if (this.id == "radio-mag-katavasia") {
      $("tr:has(p.bmc_magnificat_modeokatavasia)").nextUntil("tr:has(p.emc_magnificat_modeofkatavasia)").show();
      $("tr:has(p.bmc_magnificat_modeofcanon)").nextUntil("tr:has(p.emc_magnificat_modeofcanon)").hide();
    } else if (this.id == "radio-mag-modeofcanon") {
      $("tr:has(p.bmc_magnificat_modeofcanon)").nextUntil("tr:has(p.emc_magnificat_modeofcanon)").show();
      $("tr:has(p.bmc_magnificat_modeokatavasia)").nextUntil("tr:has(p.emc_magnificat_modeofkatavasia)").hide();
    }
  });

  // Bind click functions for showing and hiding Service Preferences panel
  $('.prefMode').click(function(ev) {
    ev.preventDefault();
    $(".pref-panel").show();
  });
  $('.pref-closer').click(function() {
    $(".pref-panel").hide();
  });

  // Bind click functions for dismissal options
  $('#cb-dismissal1').click(function() {
    if (this.checked) {
      $('tr:has(p.bmc_matins_end_no_dismissal)').nextUntil('tr:has(p.emc_matins_end_no_dismissal)').show();
      $('tr:has(p.bmc_matins_end_before_dismissal)').nextUntil('tr:has(p.emc_matins_end_before_dismissal)').hide();
      $('tr:has(p.bmc_matins_dismissal)').nextUntil('tr:has(p.emc_matins_dismissal)').hide();
      $('tr:has(p.bmc_matins_close)').nextUntil('tr:has(p.emc_matins_close)').hide();
      if ($('#cb-dismissal2').prop('checked'))
        $('#cb-dismissal2').click();
      if ($('#cb-dismissal3').prop('checked'))
        $('#cb-dismissal3').click();
    } else {
      $('tr:has(p.bmc_matins_end_no_dismissal)').nextUntil('tr:has(p.emc_matins_end_no_dismissal)').hide();
    }
  });
  $('#cb-dismissal2').click(function() {
    if (this.checked) {
      $('tr:has(p.bmc_matins_end_before_dismissal)').nextUntil('tr:has(p.emc_matins_end_before_dismissal)').show();
      $('tr:has(p.bmc_matins_dismissal)').nextUntil('tr:has(p.emc_matins_dismissal)').show();
      // Hide dismissal 1 if it's visible
      if ($('#cb-dismissal1').prop('checked')) {
        $('#cb-dismissal1').click();
      }
    } else {
      $('tr:has(p.bmc_matins_end_before_dismissal)').nextUntil('tr:has(p.emc_matins_end_before_dismissal)').hide();
      $('tr:has(p.bmc_matins_dismissal)').nextUntil('tr:has(p.emc_matins_dismissal)').hide();
    }
  });
  $('#cb-dismissal3').click(function() {
    if (this.checked) {
      $('tr:has(p.bmc_matins_close)').nextUntil('tr:has(p.emc_matins_close)').show();  
    } else {
      $('tr:has(p.bmc_matins_close)').nextUntil('tr:has(p.emc_matins_close)').hide();
    }
    if ($('#cb-dismissal1').prop('checked'))
      $('#cb-dismissal1').click();
  });

  // Make it look like a default service
  hide_all_canons();
  show_kontakion(1,false);
  show_kontakion(2,false);
  $("#cb-kontakion-12").click();
  $("#radio-eothinon-2").click();
  $("#cb-katavasias1345678").click();
  $("#radio-mag-katavasia").click();
  $("#cb-ode9_katavasia").click();
  $('#cb-ode9_katavasia').prop('disabled',true);
  $('tr:has(p.bmc_matins_end_no_dismissal)').nextUntil('tr:has(p.emc_matins_end_no_dismissal)').hide();
  $('tr:has(p.bmc_matins_end_before_dismissal)').nextUntil('tr:has(p.emc_matins_end_before_dismissal)').hide();
  $('tr:has(p.bmc_matins_dismissal)').nextUntil('tr:has(p.emc_matins_dismissal)').hide();
  $('tr:has(p.bmc_matins_close)').nextUntil('tr:has(p.emc_matins_close)').hide();

  $('.pref-panel').show();

  $(".print-service").click(function(ev) {
    ev.preventDefault();
    window.print();
  });

  $("tr:has(p[class^='bmc_'])").hide();
  $("tr:has(p[class^='emc_'])").hide();
  $("body").append('<div class="page-num-footer"></div>');
}
	

function hide_all_canons() {
	//console.log("Hiding all canons");
	$('tr:has([class^="bmc_ode"])').each(function() {
		$(this).nextUntil('tr:has([class^="emc_ode"])').hide();
	});
}

function ode_to_html(canon_list, ode_num) {
	var out_html = "";
	for (var i=0;i<canon_list.length;i++) {
    var p_label = $(".bmc_ode"+ode_num+"_"+canon_list[i]+":first").text();
		var cb_id = "cb-ode"+ode_num+"_"+canon_list[i];
    out_html += "<div class='pref-left'><label for='"+cb_id+"'>"+p_label+"</label></div>"
        + "<div class='pref-right'><input id='"+cb_id+"' type='checkbox'></div>";
	}
	return out_html;
}

function short_litany_html(ode_num) {
  var p_label = $('.bmc_ode'+ode_num+'_litany:first').text();
  var out_html = "<div class='pref-left'><label for='cb-ode"+ode_num+"_litany'>" + p_label + "</label></div>"
        + "<div class='pref-right'><input id='cb-ode"+ode_num+"_litany' type='checkbox'></div>";
	return out_html;
}


// Show selected eothinon Gospel reading, hide the other
function show_eothinon(num) {
	var show_gospel = num;
	var hide_gospel = num == 1 ? 2 : 1;
	$("tr:has(p.bmc_eothinongospel_position"+show_gospel+")").nextUntil("tr:has(p.emc_eothinongospel_position"+show_gospel+")")
		.show();
	$("tr:has(p.bmc_eothinongospel_position"+hide_gospel+")").nextUntil("tr:has(p.emc_eothinongospel_position"+hide_gospel+")")
		.hide(); 

}

function show_kontakion(num, showhide) {
	//console.log("Showing Kontakion: " + num);
	var show_kontak = num;
	//var hide_kontak = num == 1 ? 2 : 1;
  if (showhide)
	  $("tr:has(p.bmc_kontakion_position"+show_kontak+")").nextUntil("tr:has(p.emc_kontakion_position"+show_kontak+")").show();
  else
    $("tr:has(p.bmc_kontakion_position"+show_kontak+")").nextUntil("tr:has(p.emc_kontakion_position"+show_kontak+")").hide();
	//$("tr:has(p.bmc_kontakion_position"+hide_kontak+")").nextUntil("tr:has(p.emc_kontakion_position"+hide_kontak+")").hide();
}


function check_ode_katavasia() {
  var ode_katavasia_shown = false;
  $('input[type=checkbox]').filter('[id$="katavasia"]').each(function() {
    if (this.id.indexOf('ode9') < 0)
      if (this.checked) {
        ode_katavasia_shown = true;
      }
  });
  //console.log("Are any ode katavasia checked: "+ode_katavasia_shown);
  return ode_katavasia_shown;
}


$('a.mediaMode').attr('data-toggle','tooltip');
$('a.mediaMode').attr('data-placement','bottom');
$('a.mediaMode').attr('title','Show/Hide media links')
$('[data-toggle="tooltip"]').tooltip({
	delay : {
		"hide" : 5000
	}
});
$('a.mediaMode').tooltip('show');
$('a.mediaMode').trigger('mouseout');

notAvailable();
  
 });