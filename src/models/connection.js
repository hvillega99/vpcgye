const mysql = require('mysql');
require('dotenv').config();

class Connection{

    static instance;

    constructor(){
        if(!!Connection.instance){
            return Connection.instance;
        }

        const dbConfig = {
            connectionLimit: 10,
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        };
        
        this.db = mysql.createPool(dbConfig);
        this.db.getConnection((err, connection) => {
            if (err) {
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.')
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.')
                }
                if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.')
                }
            }
          
            if (connection){
                connection.release();
                console.log('Database connected')
                return;
            }
        })        

        Connection.instance = this;
    }

}

module.exports = Connection;