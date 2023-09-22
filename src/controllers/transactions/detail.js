const { verifyTransactionId } = require('../../utils/verifications');

const detailTransaction = async (require, response) => {
    const { id } = require.params;

    try {
        const userId = require.loggedUser.id;

        const transaction = await verifyTransactionId(userId, id);

        return response.status(200).json(transaction.rows);
    } catch (error) {
        return response.status(error.statusCode || 500).json({
            "mensage": error.message
        });
    };
};

module.exports = detailTransaction;
