var params = {
	TableName : "movies",
	KeySchema: [
		{ AttributeName: "year", KeyType: "HASH"},  //Partition key
		{ AttributeName: "title", KeyType: "RANGE" }  //Sort key
	],
	AttributeDefinitions: [
		{ AttributeName: "year", AttributeType: "N" },
		{ AttributeName: "title", AttributeType: "S" }
	],
	ProvisionedThroughput: {
		ReadCapacityUnits: 5,
		WriteCapacityUnits: 5
	}
};

module.exports = {
	createTable: function( db ) {

		if ( db ) {

			// check table is exists or not
			db.describeTable( { TableName: 'movies' }, function ( err, data ) {

				// create table if not exist
				if ( err ) {

					if ( err.statusCode === 400 ) {
						db.createTable( params, function ( err, data ) {

							if ( err ) {
								console.error( err ); // an error occurred
							} else {
								console.log( "movies table is created!" );
							}

						} );
					}

				} else {
					console.log( "movies table already exists!" );
				}

			});

		}
	}

};