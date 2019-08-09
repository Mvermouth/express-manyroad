var express = require('express');
var router = express.Router();
const fs = require('fs')
const axios = require('axios')

router.post('/', function(req, res, next) {
	var paramsStr = JSON.stringify(req.body);
	var apisJSON = fs.readFileSync(`${__dirname}/../configs/urls.json`);
    var apis = JSON.parse(apisJSON);
	var urls = [];
	var evals = "";
	for(var i = 0;i < apis.length;i++){
		evals = eval(`axios.post('${apis[i].url}',${paramsStr})`);
		urls.push(evals);
	}
	if(!urls || urls.length < 1) res.send("config fail");
	axios.all(urls).then(axios.spread(function(acct, perms){
		console.log(acct);
		console.log(perms);
		res.send("success");
	})).catch(function(err){
		console.log(err);
		res.send("http fail");
	});	
});

module.exports = router;
