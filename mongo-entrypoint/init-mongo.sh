## FOR MONGO version > 4
mongo -u "admin" -p "pass" admin <<EOF
    use mongodb;
    db.createUser({
        user: 'mongousr',
        pwd: 'mongopwd',
        roles: [{role: 'readWrite', db: 'mongodb'}],
    });
    use mongodbtest;
    db.createUser({
        user: 'mongousrtest',
        pwd: 'mongopwdtest',
        roles: [{role: 'readWrite', db: 'mongodbtest'}],
    });
EOF