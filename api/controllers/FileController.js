/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

//BEGIN UPLOAD
//OK
	upload: function(req, res, id) {
    if (req.method === 'GET')
        return res.json({ 'status': 'GET not allowed' });

    var uploadFile = req.file('uploadFile');
    console.log(uploadFile);
		uploadFile.upload({ dirname: '../../assets/archivos/'+id }, function onUploadComplete(err, files) {

		    if (err) return res.serverError(err);
		});
}
//END UPLOAD


};
