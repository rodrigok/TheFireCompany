
/*
 * GET home page.
 */

exports.index = function(req, res){
	if (req.device.type === 'phone' || req.device.type === 'tablet') {
		return res.render('index_mobile', { title: 'Express' });
	}
	res.render('index', { title: 'Express' });
};