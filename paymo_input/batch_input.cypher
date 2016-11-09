CREATE CONSTRAINT on (c:User) ASSERT c.id IS UNIQUE;

USING PERIODIC COMMIT

LOAD CSV WITH HEADERS FROM
'file:///Users/ganesh/dev/InsightDataScience/paymo_input/batch_payment.csv' AS line

MERGE (u1:User {id: line.id1 })
MERGE (u2:User {id: line.id2 })
CREATE (u1)-[r:PAID]->(u2)
SET r.amount = line.amount
