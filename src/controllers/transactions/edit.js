const pool = require('../../connection');
const { validateFields, validateType } = require('../../utils/validations');
const { verifyCategoryId, verifyTransactionId } = require('../../utils/verifications');

const editTransaction = async (require, response) => {
    const { description, value, date, category_id, type } = require.body;
    const { id } = require.params;

    try {
        await validateFields(description, value, date, category_id);

        await validateType(type);

        await verifyCategoryId(category_id);

        const userId = require.loggedUser.id;

        await verifyTransactionId(userId, id);

        await pool.query(`
        UPDATE transactions 
        SET
        description = $1,
        value = $2,
        date = $3,
        category_id = $4,
        type = $5
        WHERE id = $6
        RETURNING *;`, [description, value, date, category_id, type, id]);

        return response.status(204).json();
    } catch (error) {
        return response.status(error.statusCode || 500).json({
            "mensage": error.message
        });
    };
};

module.exports = editTransaction;
