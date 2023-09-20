const pool = require('../../connection');

const deleteTransaction = async (require, response) => {
    const { id } = require.params;

    try {
        const userId = require.loggedUser.id;
        const verifyTransactionId = await pool.query(`SELECT * FROM transactions WHERE id = $1 AND user_id = $2;`, [id, userId]);

        if (verifyTransactionId.rowCount === 0) {
            return response.status(404).json({ message: `This transaction id or user id doesn't exist ` })
        }

        await pool.query(`DELETE from transactions where id = $1`, [id]);

        return response.status(204).json();

    } catch (error) {
        return response.status(500).json(error.message);
    };
};

module.exports = deleteTransaction;
