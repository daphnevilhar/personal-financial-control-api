const pool = require('../../connection');

const detailTransaction = async (require, response) => {
    const { id } = require.params;

    try {

        const userId = require.loggedUser.id;
        const transaction = await pool.query(`SELECT * FROM transactions WHERE user_id = $1 AND id = $2;`, [userId, id]);

        if (transaction.rowCount === 0) {
            return response.status(404).json({ message: 'Transaction not found' })
        }

        return response.status(200).json(transaction.rows);

    } catch (error) {
        return response.status(500).json(error.message);
    };
};

module.exports = detailTransaction;