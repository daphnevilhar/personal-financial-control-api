const pool = require('../../connection');
const { validateFields, validateType } = require('../../utils/validations');

const editTransaction = async (require, response) => {
    const { description, value, date, category_id, type } = require.body;
    const { id } = require.params;

    try {

        await validateFields(description, value, date, category_id);

        await validateType(type);

        const userId = require.loggedUser.id;
        const verifyTransactionId = await pool.query(`SELECT * FROM transactions WHERE id = $1 AND user_id = $2;`, [id, userId]);

        if (verifyTransactionId.rowCount === 0) {
            return response.status(404).json({ message: `Este id de transação ou id de utilizador não existe` })
        }

        const verifyCategoryId = await pool.query(`SELECT * FROM categories WHERE id = $1;`, [category_id]);

        if (verifyCategoryId.rowCount === 0) {
            return response.status(404).json({ message: `Esse id de categoria não existe` })
        }

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
        return response.status(error.statusCode).json({
            "mensage": error.message
        });
    };
};

module.exports = editTransaction;
