/*
* Metro JS for jQuery
* http://drewgreenwell.com/ 
* For details and usage info see: http://drewgreenwell.com/projects/metrojs

Copyright (C) 2012, Drew Greenwell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function () {
jQuery.fn.metrojs = {};


/* Preload Images */
// Usage: jQuery(['img1.jpg','img2.jpg']).metrojs.preloadImages(function(){ ... });
// Callback function gets called after all images are preloaded
jQuery.fn.metrojs.preloadImages = function (callback) {
    var checklist = jQuery(this).toArray();
    var $img = jQuery("<img style='display:none;'>").appendTo("body");
    jQuery(this).each(function () {
        $img.attr({ src: this }).load(function () {
            var src = jQuery(this).attr('src');
            for (var i = 0; i < checklist.length; i++) {
                if (checklist[i] == element) { checklist.splice(i, 1); }
            }
            if (checklist.length == 0) { callback(); }
        });
    });
    $img.remove();
};jQuery.fn.applicationBar = function (options) {
    /* Setup the public options for the applicationBar  */
    var stgs = typeof (jQuery.fn.metrojs.theme) != "undefined" ? jQuery.fn.metrojs.theme.defaults : {};
    jQuery.extend(stgs, jQuery.fn.applicationBar.defaults, options);
    if (typeof (jQuery.fn.metrojs.theme) != "undefined") {
        var theme = jQuery.fn.metrojs.theme;
        theme.loadDefaultTheme(stgs);
        var themeContainer = stgs.accentListContainer + " a";
        $(themeContainer).live("click", function () {
            var accent = jQuery(this).attr("class").replace("accent", "").replace(" ", "");           
            theme.applyTheme(null, accent, stgs);
            if (typeof (stgs.accentPicked) == "function")
                stgs.accentPicked(accent);
        });
        var baseContainer = stgs.baseThemeListContainer + " a";
        $(baseContainer).live("click", function () {
            var accent = jQuery(this).attr("class").replace("accent", '').replace(' ', '');
            theme.applyTheme(accent, null, stgs);
            if (typeof (stgs.themePicked) == "function")
                stgs.themePicked(accent);
        });
    }

    //this should really only run once but we can support multiple application bars
    jQuery(this).each(function () {

        var $this = jQuery(this);

        //unfortunately we have to sniff out mobile browsers because of the inconsistent implementation of position:fixed
        //most desktop methods return false positives on a mobile
        if (navigator.userAgent.match(/(Android|webOS|iPhone|iPod|BlackBerry|PIE|IEMobile)/i)) {
            $this.css({ position: 'absolute', bottom: '0px' });
        }

        $this.animateAppBar = function (isExpanded) {
            var hgt = isExpanded ? stgs.collapseHeight : stgs.expandHeight;
            if (isExpanded)
                $this.removeClass("expanded");
            else
                if (!$this.hasClass("expanded"))
                    $this.addClass("expanded");
            $this.stop().animate({ height: hgt }, { duration: stgs.duration });
        };

        $this.find("a.etc").click(function () {
            $this.animateAppBar($this.hasClass("expanded"));
        });

        if (stgs.bindKeyboard == true) {
            jQuery(document.documentElement).keyup(function (event) {
                // handle cursor keys
                if (event.keyCode == 38) {
                    // expand
                    if (!$this.hasClass("expanded")) {
                        $this.animateAppBar(false);
                    }
                } else if (event.keyCode == 40) {
                    // collapse
                    if ($this.hasClass("expanded")) {
                        $this.animateAppBar(true);
                    }
                }
            });
        }
    });
};

// default options for applicationBar, the theme defaults are merged with this object when the applicationBar function is called
jQuery.fn.applicationBar.defaults = {
    applyTheme: true,                                       // should the theme be loaded from local storage and applied to the page
    themePicked: function (tColor) { },                     // called when a new theme is chosen. the chosen theme (dark | light)
    accentPicked: function (aColor) { },                    // called when a new accent is chosen. the chosen theme (blue, mango, purple, etc.)
    loaded: function (tColor, aColor) { },                  // called if applyTheme is true onload when a theme has been loaded from local storage or overridden by options
    duration: 500,                                          // how fast should animation be performed, in milliseconds
    expandHeight: "320px",                                  // height the application bar to expand to when opened
    collapseHeight: "60px",                                 // height the application bar will collapse back to when closed
    bindKeyboard: true,                                     // should up and down keys on keyborad be bound to the application bar
    metroLightUrl: 'images/metroIcons_light.jpg',  // the url for the metro light icons (only needed if preload 'preloadAltBaseTheme' is true)
    metroDarkUrl: 'images/metroIcons.jpg',         // the url for the metro dark icons (only needed if preload 'preloadAltBaseTheme' is true)
    preloadAltBaseTheme: false                             // should the applicationBar icons be pre loaded for the alternate theme to enable fast theme switching    
};﻿})();