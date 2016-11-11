CREATE CONSTRAINT on (c:User) ASSERT c.id IS UNIQUE;

USING PERIODIC COMMIT

// Create nodes
LOAD CSV WITH HEADERS FROM
{f} AS line
MERGE (u1:User {id: line.id1 })
MERGE (u2:User {id: line.id2 });

// Create relations
USING PERIODIC COMMIT 1000
LOAD CSV WITH HEADERS FROM {f} AS line
MATCH (u1:User {id: line.id1 })
MATCH (u2:User {id: line.id2 })
MERGE (u1)-[r:PAID]->(u2)
SET r.amount = line.amount;
