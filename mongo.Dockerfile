FROM mongo:4.2-bionic

# Expose ports (27017: MongoDB port, 27018: Replica set configuration port)
EXPOSE 27017
EXPOSE 27018


# Copy replica set initialization script into the container
COPY mongo-entrypoint/init-replica-set.sh /docker-entrypoint-initdb.d/init-replica-set.sh

# Grant execute permissions to the initialization script
RUN chmod +x /docker-entrypoint-initdb.d/init-replica-set.sh

CMD ["mongod", "--replSet", "rs0", "--bind_ip_all"]
