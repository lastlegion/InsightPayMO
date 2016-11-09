//Solving the "Eager" issue by creating nodes first and then relations



CREATE CONSTRAINT on (c:User) ASSERT c.id IS UNIQUE;

USING PERIODIC COMMIT


// Create nodes

PROFILE LOAD CSV WITH HEADERS FROM
'file:///home/ubuntu/InsightPayMO/paymo_input/batch_payment_clean.csv' AS line LIMIT 0
MERGE (u1:User {id: line.id1 })
MERGE (u2:User {id: line.id2 })
#CREATE (u1)-[r:PAID]->(u2)
#SET r.amount = line.amount


// Create relations

USING PERIODIC COMMIT 1000
LOAD CSV WITH HEADERS FROM "file:///home/ubuntu/InsightPayMO/paymo_input/batch_payment_clean.csv" AS line
MATCH (u1:User {id: line.id1 })
MATCH (u2:User {id: line.id2 })
MERGE (u1)-[r:PAID]->(u2)
SET r.amount = line.amount
