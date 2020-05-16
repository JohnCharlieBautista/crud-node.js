const mysql = require('mysql2');

export default class Connection {
    constructor() {
        this.pool = mysql.createPool({ // used pool to avoid database bottlenecks
            host: 'localhost',
            user: 'root',
            password: 'Jcb912345!'
        });
    }
}