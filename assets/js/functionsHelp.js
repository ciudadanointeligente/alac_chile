function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
};

function getLangArray(lg){
  if (lg=='es'){
    return arrLangEs;
  }
  if (lg=='en'){
    return arrLangEn;
  }
  if (lg=='ht'){
    return arrLangHt;
  }
  if (lg=='pt'){
    return arrLangPt;
  }
};
