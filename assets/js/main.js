$( document ).ready(function() {
    console.log( "ready!" );

    var arrLang= {
      'en': {
        'Hola': 'Good day',
        'alac': 'What is alac?',
        'como': 'How does it work?',
        'buzon': 'Denunciation mailbox',
        'articulos': 'Educational articles',
        'preguntas': 'Frequent questions'
      },
      'es': {
        'Hola': 'Buen día',
        'alac': '¿Qué es alac?',
        'como': '¿Cómo funciona?',
        'buzon': 'Buzón de denuncia',
        'articulos': 'Artículos educativos',
        'preguntas': 'Preguntas frecuentes'
      },
      'ht': {
        'Hola': 'Bonjour',
        'alac': "Qu'est ce que c'est alac?",
        'como': 'Comment ça marche?',
        'buzon': 'Denonciation boîte aux lettres',
        'articulos': 'Articles éducatifs',
        'preguntas': 'Questions fréquentes'
      },
      'pt': {
        'Hola': 'OI!',
        'alac': 'O que é alac?',
        'como': 'Como funciona?',
        'buzon': 'Caixa de correio de denúncia',
        'articulos': 'Artigos educativos',
        'preguntas': 'Perguntas frequentes'
      }
    };
    function getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length == 2) return parts.pop().split(";").shift();
    };

    if (getCookie("lang") == null) {
        document.cookie = "lang=es";
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
