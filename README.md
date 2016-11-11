## Installation
I've used Neo4J Graph databse as my backend datastore. I've used Node.js to process the data

* Install Node.js
* Install Neo4j 

## Configuring Neo4j

### Setting up authentication
We use username:`neo4j` and password:`admin` as the default configuration.
Set it up using

`curl -H "Content-Type: application/json" -X POST -d '{"password":"admin"}' -u neo4j:neo4j http://localhost:7474/user/neo4j/password`

If you were to use other username/password please update the `src/config.json` file


### Performance tweaking Neo4j
Use the configuration files in `src/neo4j_conf` for your neo4j setup.

