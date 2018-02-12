$( document ).ready(function() {
    console.log( "ready!" );
    console.log(document.cookie);
    var arrLang= {
      'en': {
        'Hola': 'Good day'
      },
      'es': {
        'Hola': 'Buen día'
      },
      'ht': {
        'Hola': 'Bonjour'
      },
      'pt': {
        'Hola': 'OI!'
      }
    };
    function getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length == 2) return parts.pop().split(";").shift();
    };

    $('.lang').each(function(index,element){
      $(this).text(arrLang[getCookie("lang")][$(this).attr('key')]);
    });

    $('.translate').click(function(event) {
      var lang= $(this).attr('id');
      var langPreferent = "lang="+lang;
      document.cookie = langPreferent;
      console.log(getCookie("lang"));
      $('.lang').each(function(index,element){
        $(this).text(arrLang[lang][$(this).attr('key')]);
      });
      event.preventDefault();
    });
});
