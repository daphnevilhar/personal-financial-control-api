const pool = require('../../connection');

const listTransactions = async (require, response) => {
    try {
        const userId = require.loggedUser.id;
        const userTransactions = await pool.query(`SELECT * FROM transactions WHERE user_id = $1;`, [userId]);

        return response.status(200).json(userTransactions.rows);

    } catch (error) {
        return response.status(500).json(error.message);
    };
};

module.exports = listTransactions;