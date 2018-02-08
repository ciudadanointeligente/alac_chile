module.exports=function(req,res,ok){
  
  if (req.session.authenticated) {return ok();}
  res.redirect('/session/new');
  return;
}
