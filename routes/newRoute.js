var express = require("express");
var router = express.Router();
import Connection from '../Connection';

router.get("/", (req, res, next) => {
    let pool = new Connection().pool;
    pool.getConnection((err, connection) => {
        let query = 'select 1+1 as solution';
        connection.query(
            query,
            (err, rows, fields) => {
                connection.release(); // close connection to database to avoid database deadlocks
                if(err) throw err; // if error occurred during query, throw the error in the system.
                res.json(rows[0].solution);
            }
        );
    });
});

module.exports = router;