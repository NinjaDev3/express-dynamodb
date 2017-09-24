var AWS = require('aws-sdk');

var config = require('../configs/aws-config.json');
var movies = require('../models/tables/moviesTable');

if( config.env === 'dev' ) {
	var aws_config = {
		"apiVersion": "2012-08-10",
		"accessKeyId": config.dev.accessKeyId,
		"secretAccessKey": config.dev.secretAccessKey,
		"region": config.dev.region,
		"endpoint": config.dev.endpoint
	}
}

var dynamodb = new AWS.DynamoDB( aws_config );

module.exports = function() {

	// create table
	movies.createTable( dynamodb );

	// function to  list all the tables from dynamodb
	var listAllTable    =function(){

		dynamodb.listTables({}, function(err, data) {
			if (err) console.log(err); // an error occurred
			else console.error(data); // successful response
		});

	};
	//listAllTable();

	// function to delete a table from dynamodb
	var deleteTable =function(table){

		dynamodb.deleteTable({TableName :table}, function(err, data) {
			if (err) console.log(err); // an error occurred
			else console.log(data); // successful response
		});

	};
	//deleteTable('appointments');

};


