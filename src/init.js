var csv = require("fast-csv");
var fs = require("fs");



function batchInit() {
  console.log("iniitalizing");
  var stream = fs.createReadStream("../paymo_input/batch_payment.csv");
  var csvStream = csv({"headers": true}).on("data", function( data){

    console.log(data);
    var user1 = data[" id1"].split(" ")[1]*1;
    var user2 = data[" id2"].split(" ")[1]*1;

    //var payment = {"amount": data.amount};
    /*
    var userPayload = {
      "query": "CREATE (n:User {id: {id} }) RETURN n",
      "params": {
        "id": ""
      },
      "method": "POST",
      "to": "/node"
    };
    */
    var userPayload = {
      "method": "POST",
      "to": "/node",
      "body": {},
      "id": 0
    };

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
