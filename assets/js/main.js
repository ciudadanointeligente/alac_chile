$( document ).ready(function() {
    console.log( "ready!");

    var arrLang;

    if (getCookie("lenguaje") == undefined || getCookie("lenguaje")==null ) {
        document.cookie = "lenguaje=es";
    };

    arrLang = getLangArray(getCookie("lenguaje"));


    $('.lang').each(function(index,element){
      console.log( "ready!: "+getCookie("lenguaje") );
      $(this).text(arrLang[getCookie("lenguaje")][$(this).attr('key')]);
    });

    $('.translate').click(function(event) {
      var lang= $(this).attr('id');
      document.cookie = "lenguaje="+lang;
      arrLang = getLangArray(getCookie("lenguaje"));
      $('.lang').each(function(index, element){
        $(this).text(arrLang[lang][$(this).attr('key')]);
      });
      event.preventDefault();
    });
});
