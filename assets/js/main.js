$( document ).ready(function() {
    console.log( "ready!" );
    $('.idioma').click(function(event) {
      event.preventDefault();
      //alert( "Handler for .click() called." );

      // var full_url = "http://localhost:1337/lang/HT";
      // $.ajax({
      //   type: 'GET',
      //   url: full_url,
      //   dataType: 'json',
      //   headers: {
      //     'Accept': 'application/json',
      //     'from': 'my@domain.com',
      //     'accept-language': 'ht'
      //   }
      // });
      // console.log('ajx success');
      // window.location.reload(true);

      // $.get({
      //        url: '/lang/HT',
      //        data: {},
      //        headers: {
      //                    // 'Accept': 'text/html',
      //                    // 'from': 'my@domain.com',
      //                    'accept-language': 'ht'
      //                  },
      //        success: function( data ){
      //           alert("success");
      //           $('html').html( data );
      //        })
      // });
      var jqxhr = $.get({
                      url: "/lang/HT"
                      headers: {
                               'Accept-Language': 'ht'
                             }
                    }, function(data) {
        // alert( data );
         alert( "success" );
      })
        .done(function(data) {
          // alert( "second success" );
          $('html').html( data );
        })
        .fail(function() {
          alert( "error" );
        })
        .always(function() {
          alert( "finished" );
        });
    });
});
