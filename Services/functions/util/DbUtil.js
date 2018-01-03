'use strict';
/**
 * Database Connection
 */
var mysql = require('../../node_modules/mysql');
var configuration = require('../../config/config.json');
var configOptions = {
    host: configuration.database.host,
    port: configuration.database.port,
    user: configuration.database.username,
    password: configuration.database.password,
    database: configuration.database.database,
    connectTimeout: configuration.database.connectTimeout,
    connectionLimit: configuration.database.connectionLimit,
    queueLimit: configuration.database.queueLimit,
    acquireTimeout: configuration.database.acquireTimeout,
    multipleStatements: configuration.database.multipleStatements,
    nestTables: configuration.database.nestTables
};
//var connection;

function DbUtil() {}

DbUtil.prototype.fetchSQLWithOptions = function(query, options, cb) {
    try {
        var error = null,
            rowsData = null;
        var connection = mysql.createConnection(configOptions);
        //this.pool.getConnection(function(err, connection) {
        connection.connect();
        connection.query(query, options, function(err, rows) {
            //this.pool.end();
            console.log(this.sql);
            if (err) {
                console.error('ERROR : ' + err);
                error = err;
            } else if (rows[0] === undefined) {
                console.log('No results');
            }
            rowsData = rows;
            return cb(error, rowsData);
        });
        connection.end();

        //});
    } catch (ex) {
        console.error('EXCEPTION : ' + ex);
    }
};

DbUtil.prototype.fetchSQL = function(query, cb) {
    try {
        var error = null,
            rowsData = null;
        var options = {
            sql: query,
            nestTables: true
        };
        var connection = mysql.createConnection(configOptions);
        //this.pool.getConnection(function(err, connection) {
        connection.connect();
        connection.query(options, function(err, rows) {
            //this.pool.end();
            console.log(this.sql);
            if (err) {
                console.error('ERROR : ' + err);
                error = err;
            } else if (rows[0] === undefined) {
                console.log('No results');
            }
            rowsData = rows;
            return cb(error, rowsData);
        });
        connection.end();

        //});
    } catch (ex) {
        console.error('EXCEPTION : ' + ex);
    }
};

DbUtil.prototype.executeSQL = function(query, data, cb) {
    try {
        var error = null,
            rowsData = null;
        var connection = mysql.createConnection(configOptions);
        connection.connect();
        connection.query(query, data, function(err, result) {
            //this.pool.end();
            console.log(this.sql);
            if (err) {
                console.error('ERROR : ' + err);
                error = err;
                //throw err;
            } else {
                connection.commit(function(err) {
                    if (err) {
                        connection.rollback(function() {
                            error = err;
                        });
                    }
                    console.log('Commited!');
                    rowsData = result;
                    connection.end();
                    return cb(error, rowsData);
                });
            }
        });

        //});

    } catch (ex) {
        console.error('EXCEPTION : ' + ex);
    }
};

DbUtil.prototype.executeSQLValues = function(query, data, cb) {
    try {
        var error = null,
            rowsData = null;
        var connection = mysql.createConnection(configOptions);
        connection.connect();
        connection.query(query, [data], function(err, result) {
            //this.pool.end();
            console.log(this.sql);
            if (err) {
                console.error('ERROR : ' + err);
                error = err;
            } else {
                connection.commit(function(err) {
                    if (err) {
                        connection.rollback(function() {
                            error = err;
                        });
                    }
                    console.log('Commited!');
                });

                rowsData = result;
            }
            connection.end();
            return cb(error, rowsData);
        });
        //});
    } catch (ex) {
        console.error('EXCEPTION : ' + ex);
    }
};

function escape(data) {
    var safeString = '';
    if (Array.isArray(data)) {
        var count;
        for (count = 0; count < data.length - 1; count++) {
            safeString = safeString + mysql.escape(data[count]) + ','
        }
        safeString = safeString + mysql.escape(data[count]);
    } else {
        safeString = mysql.escape(data);
    }
    return safeString;
}

module.exports = DbUtil;
module.exports.escape = escape;