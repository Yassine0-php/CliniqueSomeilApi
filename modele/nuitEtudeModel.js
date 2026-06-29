const bdd = require("../config/connexionBdd");

function getNuitNonTraiter(callback) {
    bdd.query(
        `SELECT * from nuit_a_traiter`,
        (err, result) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null,  result);
        }
    );
}

module.exports = {
    getNuitNonTraiter
    
};