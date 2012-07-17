/**
 * IMDB to CouchPotato
 * Author: Fafoulon
 * Email:  contactflow@gmail.com
 * Web:    http://couchpotato.fafoulon.fr
 * (c) Copyright 2012. All Right Reserved
 */


var cpLocation;


lib = (function(){
    var _public = {}
    var osd = function(id, year){
        var navbar, newElement;
        //var year = document.getElementsByTagName('h1')[0].getElementsByTagName('a')[0].text
        if (id.substring(0,2)!="tt")
        	id="tt"+id;
        var iFrame = create('iframe', {
          src : cpLocation + "/movie/imdbAdd/?id=" + id + '&year=' + year,
          frameborder : 0,
          scrolling : 'no'
        })
        if (cpLocation == 'http://x.x.x.x:5000') var addToText = '&nbsp;<br><center>No server set (in preferences)</center><br>';
        else
        	var addToText = '<a class="addTo" href="#"></a>'
        var popupId = 'mmPopup'
        
        var popup = create('div', {
          id : popupId,
          innerHTML : addToText
        });
        var addButton = create('a', {
            innerHTML: '<img src="' + movieImg + '" />Add to CouchPotato',
            id: 'addTo',
            onclick: function(){
                popup.innerHTML = '';
                popup.appendChild(create('a', {
                    innerHTML: '<img src="' + closeImg + '" />',
                    id: 'closeBtn',
                    onclick: function(){
                        popup.innerHTML = '';
                        popup.appendChild(addButton);
                    }
                }));
            popup.appendChild(iFrame);
          }
        }) //create
       if (cpLocation != 'http://x.x.x.x:5000') popup.appendChild(addButton);
        
        document.body.parentNode.insertBefore(popup, document.body);
    } //end osd
    
    _public.osd = osd
    return _public
})();

imdb = (function(){
    function isMovie(){
     if (location.href.indexOf("imdb.com/title/tt") >= 0) {
        var series = document.getElementsByTagName('h5')
        for (var i = 0; i < series.length; i++) {
            if (series[i].innerHTML == 'Seasons:') {
                return false;
            }
        }
        return true;
      }
      return false;
    }
    
    function getId(){
        return 'tt' + location.href.replace(/[^\d+]+/g, '');
    }
    
    function getYear(){
        try {
            return document.getElementsByTagName('h1')[0].getElementsByTagName('a')[0].text;
        } catch (e) {
            var spans = document.getElementsByTagName('h1')[0].getElementsByTagName('span');
            var pattern = /^\((TV|Video) ([0-9]+)\)$/;
            for (var i = 0; i < spans.length; i++) {
                if (spans[i].innerHTML.search(pattern)) {
                    return spans[i].innerHTML.match(pattern)[1];
                }
            }
        }
    }
    
    var constructor = function(){
        if(isMovie()){
            lib.osd(getId(), getYear());    
        }
    }
    
    return constructor;
})();

sharethetv = (function(){
    
    function isMovie(){
        var pattern = /movies\/[^/]+\/?$/;
        matched = location.href.match(pattern);
        return null != matched;
    }
    
    function getId(){
        var pattern = /imdb\.com\/title\/tt(\d+)/;
        var html = document.getElementsByTagName('html')[0].innerHTML;
        var imdb_id = html.match(pattern)[1];
        return imdb_id;
        
    }
    
    function getYear(){
        var pattern = /(\d+)[^\d]*$/;
        var html = document.getElementsByTagName('html')[0].innerHTML;
        var year = html.match(pattern)[1];
        return year;
        
    }
    
    function constructor(){
        if(isMovie()){
            lib.osd(getId(), getYear());    
        }
    }
    return constructor;
})();

moviemeter = (function(){
    
    function isMovie(){
        var pattern = /[^/]+\/?$/;
        var html = document.getElementsByTagName('h1')[0].innerHTML
    matched = location.href.match(pattern);
        return null != matched;
    }
    
    function getId(){
        var pattern = /imdb\.com\/title\/tt(\d+)/;
        var html = document.getElementsByTagName('html')[0].innerHTML;
        var imdb_id = html.match(pattern)[1];
        return imdb_id;
        
    }
    
    function getYear(){
        var pattern = /(\d+)[^\d]*$/;
        var html = document.getElementsByTagName('h1')[0].innerHTML;
        var year = html.match(pattern)[1];
        return year;
        
    }
    
    function constructor(){
        if(isMovie()){
            lib.osd(getId(), getYear());    
        }
    }
    return constructor;
})();

whiwa = (function(){
    
    function isMovie(){
        var pattern = /[^/]+\/?$/;
        var html = document.getElementsByTagName('h3')[0].innerHTML
    matched = location.href.match(pattern);
        return null != matched;
    }
    
    function getId(){
        var pattern = /imdb\.com\/title\/tt(\d+)/;
        var html = document.getElementsByTagName('html')[0].innerHTML;
        var imdb_id = html.match(pattern)[1];
        return imdb_id;
        
    }
    
    function getYear(){
        var pattern = /(\d+)[^\d]*$/;
        var html = document.getElementsByTagName('h3')[0].innerHTML;
        var year = html.match(pattern)[1];
        return year;
        
    }
    
    function constructor(){
        if(isMovie()){
            lib.osd(getId(), getYear());    
        }
    }
    return constructor;
})();

trakt = (function(){
    var imdb_input = null;
    var year_input = null;

    function isMovie(){
        imdb_input = document.getElementById("meta-imdb-id");
        year_input = document.getElementById("meta-year");
        return (null != imdb_input) && (null != year_input);
    }
    
    function getId(){
        return imdb_input.value.substr(2);
    }
    
    function getYear(){
        return year_input.value;
        
    }
    
    function constructor(){
        if(isMovie()){
            lib.osd(getId(), getYear());    
        }
    }
    return constructor;
})();

apple = (function(){
    /*
     *  Only movies on Apple Trailers
     */
    function isMovie(){
        return true;
    }
    

  function getId(response) {
         var TMDB_API_KEY = "31582644f51aa19f8fcd9b2998e17a9d"

         var mName = document.title.substr(0, document.title.indexOf(" -")).replace(/ /g, "+");
         var url = 'http://api.themoviedb.org/2.1/Movie.search/en/xml/' + TMDB_API_KEY + '/' + mName;
    
		 safari.self.tab.dispatchMessage("crossSite", url); // ask for value
    }
    
    


    function constructor(){
       
            if(isMovie()){
                getId();    
            }
        
    }
    return constructor;
})();

tmdb = (function(){
    var obj = this;

    function isMovie(){
        return true;
    }
    
	function getId(response) {
         var TMDB_API_KEY = "31582644f51aa19f8fcd9b2998e17a9d"

         var mName = document.title.substr(0, document.title.indexOf("TMDb")-3).replace(/ /g, "+");
         var url = 'http://api.themoviedb.org/2.1/Movie.search/en/xml/' + TMDB_API_KEY + '/' + mName;
    
		 safari.self.tab.dispatchMessage("crossSite", url); // ask for value
    }

    
    
    function constructor(){

            if(isMovie()){
                getId();    
            }
    }
    return constructor;
})();

allocine = (function(){
	function isMovie(){
		var pattern = /fichefilm_gen_cfilm=\d+?\.html$/;
		matched = location.href.match(pattern);
		return null != matched;	
	}
	
	function getId(response) {
         var TMDB_API_KEY = "31582644f51aa19f8fcd9b2998e17a9d"

         var mName = document.title.substr(0, document.title.indexOf(" -")).replace(/ /g, "+");
         var url = 'http://api.themoviedb.org/2.1/Movie.search/en/xml/' + TMDB_API_KEY + '/' + mName;
    
		 safari.self.tab.dispatchMessage("crossSite", url); // ask for value
    }
	
	function constructor(){
	 		if(isMovie()){
            	getId();
       		}
	}	
	
	return constructor;
})();


metacritic = (function(){
	function isMovie(){
		return true;
	}
	
	function getId(response) {
         var TMDB_API_KEY = "31582644f51aa19f8fcd9b2998e17a9d"

         var mName = document.title.substr(0, document.title.indexOf(" Reviews")).replace(/ /g, "+");
         var url = 'http://api.themoviedb.org/2.1/Movie.search/en/xml/' + TMDB_API_KEY + '/' + mName;
    
		 safari.self.tab.dispatchMessage("crossSite", url); // ask for value
    }
	
	function constructor(){
	 		if(isMovie()){
            	getId();
       		}
	}	
	
	return constructor;
})();





    document.getElementsByClassName = function (cl) {
        var retnode = [];
        var myclass = new RegExp('\\b' + cl + '\\b');
        var elem = this.getElementsByTagName('*');
        for (var i = 0; i < elem.length; i++) {
            var classes = elem[i].className;
            if (myclass.test(classes)) retnode.push(elem[i]);
        }
        return retnode;
    };

    function create() {
        switch (arguments.length) {
        case 1:
            var A = document.createTextNode(arguments[0]);
            break;
        default:
            var A = document.createElement(arguments[0]),
                B = arguments[1];
            for (var b in B) {
                if (b.indexOf("on") == 0) A.addEventListener(b.substring(2), B[b], false);
                else if (",style,accesskey,id,name,src,href,which".indexOf("," + b.toLowerCase()) != -1) A.setAttribute(b, B[b]);
                else
                A[b] = B[b];
            }
            for (var i = 2, len = arguments.length; i < len; ++i)
            A.appendChild(arguments[i]);
        }
        return A;
    }

    function getMessage(msgEvent) {

        if (msgEvent.name == "settingValueIs") {
        	cpLocation = msgEvent.message;
        	factory = {
		        "imdb.com" : imdb, //ok
        		"sharethe.tv" : sharethetv, //ok
		        "moviemeter.nl" : moviemeter, //ok
		        "whiwa.net" : whiwa, //ok
		        "trakt.tv" : trakt, //ok
		        "trailers.apple.com" : apple, //ok
		        "themoviedb.org" : tmdb, //ok
		        "allocine.fr" : allocine, //ok
		        "metacritic.com/movie/" : metacritic
			};
    
			for (var i in factory){
			    if(location.href.indexOf(i) != -1){
			        new factory[i]();
			        break;
			    }
		    }
        }
        
        if (msgEvent.name == "crossResult") {
        	var resu= msgEvent.message.split(';');
        	 lib.osd(resu[0], resu[1]); 
        }
    }


if (window.top === window) {

    safari.self.tab.dispatchMessage("getSettingValue", "CPurl"); // ask for value
    safari.self.addEventListener("message", getMessage, false); // wait for reply

    var movieImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAZCAYAAABQDyyRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA+9JREFUeNrMVklIXFkUPVWWY5cDccIpMQ444YCi7UJ3KrpUxAkURRAFW6GdMCI0ooKuxIWCIkrc6FYMcYogrgxoEHFeRFRE42w5D/X73dv1i4pUOiGmkly4/u9779c979x7z3sKSZLwK02JX2y/BYCXwmeESybyGV0Mo6YQNTBzf38f09/fj7GxMRwcHPyQnTk5OSEpKQm5ublQqVTvxdCfXwIg9fT0YGBgAO7u7qipqUFAQACurq7Q29uLoaEhXhgdHY3q6mqo1WocHx+jpaUF8/PzPJeamor8/HwKhKWlJbS2tmJ/f5/nsrKyUFhYSK8vhG8+BmD2j7Dm5mZotVqcnp5ibW0N4eHhcHFxQUREBM7OznhsZ2cHu7u7iI2Nhb29PQOi8b29PaysrECpVCIqKgpubm4IDAzE7OwsLi8vsbW1hYyMDIrVK/yTUQDd3d2oqKjgjygFc3NzCAsLg7OzMyIjI3F+fo7V1VVsbm5ie3sbMTExsLW15acMYmFhAbe3twza1dUVwcHB0Gg0WF9fR15eHsXqNAZA3wUJCQkoKipiGilIQ0MDf2xmZsYUJicn87rp6Wmm+OLigpmglIWEhPDc4OAg+vr6cH19zSwUFBR8tVa4BhITE03aauPj4/QIE75gFMBPanmjAFT05ycxYNRU8svo6CiGh4fR2dkJoQvw8PBAXV0dfHx8cHNzw+MjIyO8Ni4uDpWVlbCxseGibWpqwuLiIs9lZ2cjJycHlpaW3DlTU1N6afhfABMTE+jq6uLgnp6eqK+v5+BU2aQTcvD4+HhUVVXB2toaJycnrAdy8MzMTNYDasnl5WUeIzA6eyWc0GiNdkFbWxvvlIKKzvxs57IYGQYnMWpsbNSLEQWibqHgBIiA2dnZIS0tDbW1taxlwm0o3YYp1zNwd3fHSlheXs4MUO+TElJaZCUsKyuDubk5q9xjJaTd02/ISkgAqR1JCw4PD+XNSiZvQysrKygUClhYWDCrpAX+/v7o6OjQiOkA4RpdGi4/Y+Cp5uDggJKSEj5HiAkCQSmU2T06OlILuadikURqbgXAt+K9khlIT0/nc+ApRqceSe63/FZQUBDa29vp9W9mICUlhU/DJ10slP/Vs6+vLx9gZNRRGxsb3JJeXl76td7e3vrPiIEPYmEEtdrk5CRR9V0AHB0dUVpaitDQUD0gOmGJEV0NUAEeGVxU3gn/CwLAS7qUSCYwUf2SOOSk4uJi+vdYuJtwtfA/6AQgpxR81N1WnIU//4EKbP7w8PBGPJ9REersTHTchaE8G3bBvs6fZHJLiwBW4vakJfr9/Py4JIx+IFNhAqf6em2QkT7hysfr/hVgAIhbr+v/xmSzAAAAAElFTkSuQmCC'
    var closeImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAA5ElEQVR42tRTQYoEIQwsl/2Bl3gQoY9eBKEf5kvyG8G7h4Z+S38gIu5lp5lZ2R7YPm1BDhZJSFWiGmPgDj5wE7cbfD4/mBkAHprUj9yTTyn9OsGIMSLG+Fxwxc8SiAi9d4QQHskjhIDeO4jorQcq5wwiQmsN3nt479FaAxEh5zxJmyZIKalSClprL1FKQUpJXZr4DBH52xqZeRhjICKw1sJaCxGBMQbMPN41GFpriAicc6i1otYK5xxEBFrraQuThGVZAADbtp2amXms6woAOI7j0gO17/t5MN+HNfEvBf//M30NAKe7aRqUOIlfAAAAAElFTkSuQmCC'

}