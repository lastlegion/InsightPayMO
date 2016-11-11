#!/usr/bin/env bash

# execute batch loading of batch_payment.txt into Neo4J
# Please provide absolute path for `f`
tput setaf 1; echo "Step1: Loading Data, Creating Neo4J Graph"; tput sgr0;
{ echo "export f=file://"$(echo $(pwd))"/paymo_input/batch_payment.txt"; cat src/batchCreate.cql; } | neo4j-shell


#Please note all paths are relative to src directory
cd src

echo ""; tput setaf 1; echo "Step2: Executing feature 1"; tput sgr0;

# execute feature 1
node feature1_.js ../paymo_input/stream_payment.txt ../paymo_output/output1.txt


echo ""; tput setaf 1; echo "Step3: Executing feature 2"; tput sgr0;

# execute feature 2
node feature2_.js ../paymo_input/stream_payment.txt ../paymo_output/output2.txt


echo""; tput setaf 1; echo "Step4: Executing feature 3"; tput sgr0;

# exectue feature 3
node feature3_.js ../paymo_input/stream_payment.txt ../paymo_output/output3.txt

