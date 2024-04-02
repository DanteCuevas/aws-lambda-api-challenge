#!/bin/bash

# Wait for MongoDB to start
mongo_status() {
    mongo --host localhost -u admin -p pass --eval "db.adminCommand('ping')" &> /dev/null
    return $?
}

# Wait for MongoDB to be ready
until mongo_status
do
    echo "Waiting for MongoDB to start..."
    sleep 5
done

# Initialize the replica set
mongo --host localhost -u admin -p pass --eval "rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}]})"
