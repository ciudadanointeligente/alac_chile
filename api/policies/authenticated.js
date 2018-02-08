module.exports=function(req,res,ok){
  if (req.session.authenticated) {
    return ok();
  }
  console.log("*****DEBES INICIAR SESION*******")
  res.redirect('session/new');
  return;
}
