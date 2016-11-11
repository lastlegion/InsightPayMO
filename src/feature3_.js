var csv = require("fast-csv");
var request = require("superagent");
var fs = require('fs')
    , util = require('util')
    , stream = require('stream')
    , es = require('event-stream');

var config = require("./config");

var lineNr = 0;


if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function() 
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

//Neo4J configurations
var db_host = config.db_host;
var db_user = config.db_user;
var db_pass = config.db_pass;
var db_commit_url = db_host+ "/db/data/transaction";


//Make sure command is called properly
if(process.argv.length != 4){
  console.log("Error: Usage node feature2_.js <inputfilename> <outputfilename>");
  process.exit(1);
} else {
  var inputfile = process.argv[2];
  var outputfile = process.argv[3];	
}

var wStream = fs.createWriteStream(outputfile); //write stream to write the output.txt



var s = fs.createReadStream(inputfile)
    .pipe(es.split())
    .pipe(es.mapSync(function(line){

        lineNr += 1;

        // process line here and call s.resume() when rdy
        // function below was for logging memory usage

        var data = line.split(",");
        if(data[0] && data[1] && data[2] && data[3] && lineNr!=1){
          // pause the readstream
          s.pause();


          var user1 = data[1].trim()*1;
          var user2 = data[2].trim()*1;
          var amountt =   data[3].trim();
         
          // Create Cypher Query payload
          var userPayload = {
            "statements": [{
              "statement": "MATCH (n:User {id:\""+ user1 +"\"}) -[r:PAID*1..3] -> (q:User {id:\""+user2+"\"}) RETURN n,q",  //Variable path lengths to find friend of a friend 
              "parameters" : {}
              }]
          };

          request.post(db_commit_url)
            .accept('application/json')
            .set('Content-Type', 'application/json')
            .auth("neo4j", "admin")
            .send(userPayload)
            .end(function(err, res){
              if(res.body.results){
                var relation = res.body.results[0].data;
                var relation_exists = relation.length;
                var transaction_status = "";
                if(relation_exists){  //if relation exists

                  transaction_status = "trusted";
                } else {

                  transaction_status = "unverified";
                }
                wStream.write(transaction_status + "\n");
                s.resume();

              }
            });
        }
    })
    .on('error', function(r){
        console.log(r);
        console.log('Error while reading file.');
    })
    .on('end', function(){
        console.log('Processed entire file.')
    })
);


