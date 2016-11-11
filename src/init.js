var csv = require("fast-csv");
var fs = require("fs");
//var csv = require("csv");
//var d3 = require("d3");

var request = require("superagent");

if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function() 
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}
  
var db_host = "http://localhost:747i";
var db_user = "neo4j";
var db_pass = "admin";

function batchInit() {
  console.log("iniitalizing");
  console.log(process.argv)
  var batch_file = process.argv[2];
  var stream = fs.createReadStream(batch_file);
  var payload = [];


  var nTotal = 0;
  var nInvalid = 0;

  var nFailed = 0;
  var nSuccess = 0;


  var csvWStream = csv.createWriteStream({headers:true}),
    writableStream = fs.createWriteStream("clean.csv");

  writableStream.on("finish", function(){
    console.log("Written "+nTotal+" records in clean.csv");
  });
  csvWStream.pipe(writableStream);

  var csvStream = csv({   relax: true,  quote:null ,"headers": true,"trim": true, "discardUnmappedColumns": true}).on("data", function( data, err){
    //console.log(data);
    //console.log(err);
    //console.log(data);
    var user1 = data["id1"]*1;
    var user2 = data["id2"]*1;
    var amount = data["amount"];
    var userPayload = {
      "statements": [{
        "statement": "MERGE (n:User {id:"+ user1 +"}) MERGE (m:User {id:"+ user2 + "})  MERGE (n) -[r:PAID { amount: '"+ amount.trim() +"'}]-> (m)"
        }]
    };
    console.log(nTotal);
    //console.log(userPayload);
    csvWStream.write(data);
    //csvStream.pause();
    var db_post_url = db_host + "/db/data/transaction/commit";
    /*
    request.post(db_post_url)
      .auth(db_user, db_pass)
      .send(userPayload)
      .end(function(err, res){
        if(err || !res.ok){
          console.log(err);
          console.log("Error!");
          nFailed++;
        } else {
          //console.log(res)
          console.log("Successfully posted");
          nSuccess++;
        }
        csvStream.resume();
      });
    */
    //payload.push(userPayload);
    nTotal++;
  })
  .validate(function(data){
    if(data.id1 && data.id2 && data.amount && data.message != null)
      return true;
    else{
      console.log("Invalid");
      console.log(data);
      return false;
    }
  })
  .on("data-invalid", function(d){
    nInvalid++;
    console.log("Invalid");
    console.log(d);
  })
  .on("end", function(){

    console.log("done");
    console.log("Total: "+nTotal);
    console.log("Invalid: "+nInvalid);
    console.log("Successes: "+nSuccess);
    console.log("Failures: "+nFailed);
    console.log(payload);
    csvWStream.end();
  }).on("error", function(err) {
    console.log(err);
    console.log("Error!");
  });

   
  stream.pipe(csvStream);
}

if(process.argv.length != 3){
  console.log("Error: Usage node batchInit.js <filename>");

} else {
	
  batchInit();
}
    /*
    console.log(user1);

    //Create node for User1
    //user1Payload = {};
    var user1Payload = userPayload;
    //user1Payload["params"]["id"] = user1;
    user1Payload.body = {"id": user1};
    user1Payload.id = 1;

    //Create node for User2
    var user2Payload = {
      "method": "POST",
      "to": "/node",
      "body": {},
      "id": 0
    };
    //user2Payload["params"]["id"] = user2;
    user2Payload.body = {"id": user2};
    user2Payload.id = 2;


    var payLoad = [];
    payLoad.push(user1Payload);
    payLoad.push(user2Payload);
    console.log(payLoad);

    


    //Create payment relationship

  }).on("end", function(){
    console.log("done");
  }).on("error", function(err){
    console.log("Error: "+err);
  });
  stream.pipe(csvStream);
}
//
batchInit();
*/
