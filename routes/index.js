var express = require('express');
var router = express.Router();
var fs = require('fs');
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var cookieParser = require('cookie-parser')

var $ = jQuery = require('jquery')(window);

router.use(cookieParser())

 // s3 handling
var AWS = require('aws-sdk');
var s3 = new AWS.S3();

/* Get user details from s3 */

var dataUsers
var mainImg 

/* var getData = function(page, callback){
	s3.getObject({Bucket: 'pappdata', Key: 'data_papp.json'}, function(err, fileContent) {
		if (err) console.log(err, err.stack); // an error occurred
		else {
	      const data = JSON.parse(fileContent.Body)
	      dataUsers = data
	      mainImg = dataUsers['main-image']
	      if(page != ''){
	      	callback(page)
	  	  }
		}
	});
}

getData('');
*/

router.get('/', function(req, res, next) {

// Decide if user already login before

	var selectedUser = req.cookies.user
	var teamBalance = 0;
	var teamReports = [];

/*
// Calculate teams balance
	function getTeamBal() {
		var keys = Object.keys(dataUsers.users);
		for (var i = 0; i < keys.length ;++i) {
			var key = keys[i]
			var val = dataUsers.users[key].balance;
			teamBalance += val
		};
	};

	getTeamBal();
*/
	
/*	
// Last reports
	function lastReports() {
		var keys = Object.keys(dataUsers.users);
		for (var i = 0; i < keys.length ;++i) {
			var key = keys[i]
			var val = dataUsers.users[key].reports;
			for (var k = 0; k < val.length ; ++k) {
				var reportAll = {};
				reportAll.name = dataUsers.users[key].name;
				reportAll.val = dataUsers.users[key].reports[k].report

				// var h = padZero(new Date(dataUsers.users[key].reports[k].timestamp).getHours() );
				// var m = padZero(new Date(dataUsers.users[key].reports[k].timestamp).getMinutes() );

				// function padZero(n) {
				//   if (n < 10) return '0' + n;
				//   return n;
				// }

				// var output = h + ':' + m;

				reportAll.time = new Date(dataUsers.users[key].reports[k].timestamp)
				reportAll.img = dataUsers.users[key].image
				teamReports.push(reportAll)
			}
		};

		function compare(a,b) {
		  if (a.time > b.time)
		    return -1;
		  if (a.time < b.time)
		    return 1;
		  return 0;
		}

		teamReports.sort(compare);
	}

	getData('', getTeamBal)
	lastReports()
*/
	console.log('the cookie is ' + req.cookies.user)

	var page
	var pageRender = function(pageName) {
		console.log('rendering: ' + pageName)
		res.render(pageName, {
			title: 'Vegas 2019',
			users : dataUsers.users,
			selectedUser : dataUsers.users[selectedUser],
			teamBalance : teamBalance,
			teamReports : teamReports,
			mainImg: mainImg
	  	});
	  	console.log('Done pageRender')
	};

	if((selectedUser !== '' ) && (selectedUser !== undefined)){
		page = 'index'
		getData(page, pageRender)
	}
	else {
		page = 'login'
		console.log('ELSE the user is: ' + selectedUser)
		getData(page, pageRender)
	}
});


/* GET report */
router.get('/report', function(req, res, next) {
/*
	var calBal = function(page) {
		var date = new Date();
		var timestamp = date.getTime();
		var userName = req.cookies.user 
		var report = Number(req.query.report)

		var currentBal = Number(dataUsers.users[userName].balance)
		var newBal = (currentBal + report)

		console.log('report for: ' + userName)

		dataUsers.users[userName].balance = newBal
		dataUsers.users[userName].reports.push({timestamp,report})
*/
		//let data = JSON.stringify(dataUsers);  

		// fs.writeFileSync('./data_papp.json', data);
/*
		s3.putObject({Bucket: 'pappdata', Key: 'data_papp.json', Body: data}, function(err, data) {

	       if (err) {
	           console.log(err)
	       } else {
	           console.log("Successfully uploaded data to myBucket/myKey");
	       }

	    });

		res.send({status:'success', recReport: report})

		// console.log('Start rendering success ' + page)
		// res.render(page, {
		// 	title: 'Papp'
	 //  	});
		
	}
	
	getData('success',calBal)

});
*/
/* GET success page */
router.get('/success', function(req, res, next) {
	res.render('success', {
		title: 'You are fish!'
  	});
  	console.log('Done rendering success')
});


module.exports = router;


























