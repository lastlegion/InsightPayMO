## Installation
I've used Neo4J Graph databse as my backend datastore. I've used Node.js to process the data

* Install Node.js
* Install Neo4j 
* `cd src && sudo npm install`

## Configuring Neo4j

### Setting up authentication
We use username:`neo4j` and password:`admin` as the default configuration.
Set it up using

`curl -H "Content-Type: application/json" -X POST -d '{"password":"admin"}' -u neo4j:neo4j http://localhost:7474/user/neo4j/password`

If you were to use other username/password please update the `src/config.json` file


### Performance tweaking Neo4j
Use the configuration files in `src/neo4j_conf` for your neo4j setup.


## Comments
* This was the first time I ever used Neo4J. But looking at the problem I thought it would be a good fit as I had head about it. It was surprisingly non-trivial CSV to load into Neo4J and I faced memory and query bottlenecks that I fixed. I spent a great deal of time learning Neo4J and even if I don't succeed with the program, learning Neo4J for this project was immensly valuable.
* I've tested it on my system and it passes all the tests, incase there is any problem i can create a Docker Image of it. Infact I'll do it tonight but I wasn't sure whether I would be able to do it before the deadline hence I didn't.
* It was a very interesting and enjoyable problem. There were challenges in the data ingestion and data processing phase. 
* Feature 2 and 3 were slower than feature 1. So I decided to decouple them. Also feature 3 subsumes 2 subsumes 1. So I've kept them in  separate files
* Also I realized I wasn't updating the graph while doing the stream processing. I believe this could be done every night as a batch process. 
