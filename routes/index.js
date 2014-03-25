
/*
 * GET home page.
 */
var crypto = require('crypto');

exports.index = function(req, res){
	if (req.device.type === 'phone' || req.device.type === 'tablet') {
		return res.render('index_mobile', { hash: req.params.hash || '' });
	}
	// res.render('index', { hash: req.params.hash});
	res.render('index', { hash: crypto.randomBytes(2).toString('hex')});
};