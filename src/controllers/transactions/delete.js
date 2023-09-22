const pool = require('../../connection');
const { verifyTransactionId } = require('../../utils/verifications');

const deleteTransaction = async (require, response) => {
    const { id } = require.params;

    try {
        const userId = require.loggedUser.id;

        await verifyTransactionId(userId, id);

        await pool.query(`DELETE from transactions where id = $1`, [id]);

        return response.status(204).json();
    } catch (error) {
        return response.status(error.statusCode || 500).json({
            "mensage": error.message
        });
    };
};

module.exports = deleteTransaction;
