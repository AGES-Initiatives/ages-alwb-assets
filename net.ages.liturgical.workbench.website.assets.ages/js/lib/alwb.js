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
  
$(".dayMode").click(function(){
	$("html, body, body *").css('background-color',dayBackgroundColor);
	$("p").css('color',dayFontColor);
	$(redElements).css('color','red');
	$("i.ages-menu-link *").css('color',dayMenuIconColor);
	$("div.agesMenu, div.agesMenu *").css('background-color',dayMenuBarColor);

	return false;
});

$(".nightMode").click(function(){
	$("html, body, body *").css('background-color','black');
	$("p").css('color','#FBF0D9');
	$(redElements).css('color','red');
	$("i.ages-menu-link *").css('color',dayMenuIconColor);
	$("div.agesMenu, div.agesMenu *").css('background-color',dayMenuBarColor);
	return false;
});

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

notAvailable();
  
 });