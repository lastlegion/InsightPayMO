# Installation
I've used Neo4J Graph databse as my backend datastore. I've used Node.js to process the data

* Install Node.js
* Install Neo4j 


## Batch Loading in Neo4J

Loading the batch file
Replace `<file_location>` with the file location of batch_payment.csv



	
	CREATE CONSTRAINT on (c:User) ASSERT c.id IS UNIQUE;

	USING PERIODIC COMMIT
	
	// Create nodes
	LOAD CSV WITH HEADERS FROM
	'<file_location>' AS line
	MERGE (u1:User {id: line.id1 })
	MERGE (u2:User {id: line.id2 })
	
	// Create relations
	USING PERIODIC COMMIT 1000
	LOAD CSV WITH HEADERS FROM "<file_location>" AS line
	MATCH (u1:User {id: line.id1 })
	MATCH (u2:User {id: line.id2 })
	MERGE (u1)-[r:PAID]->(u2)
	SET r.amount = line.amount
	

