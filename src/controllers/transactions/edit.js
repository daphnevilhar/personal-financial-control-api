const pool = require('../../connection');
const { validateFields, validateType } = require('../../utils/validations');

const editTransaction = async (require, response) => {
    const { description, value, date, categorie_id, type } = require.body;
    const { id } = require.params;

    try {

        await validateFields(description, value, date, categorie_id);

        await validateType(type);

        const userId = require.loggedUser.id;
        const verifyTransactionId = await pool.query(`SELECT * FROM transactions WHERE id = $1 AND user_id = $2;`, [id, userId]);

        if (verifyTransactionId.rowCount === 0) {
            return response.status(404).json({ message: `This transaction id or user id doesn't exist ` })
        }

        const verifyCategoryId = await pool.query(`SELECT * FROM categories WHERE id = $1;`, [categorie_id]);

        if (verifyCategoryId.rowCount === 0) {
            return response.status(404).json({ message: `This category id doesn't exist` })
        }

        await pool.query(`
        UPDATE transactions 
        set 
        description = $1,
        value = $2,
        date = $3,
        categorie_id = $4,
        type = $5
        where id = $6
        RETURNING *;`, [description, value, date, categorie_id, type, id]);

        return response.status(204).json();

    } catch (error) {
        return response.status(error.statusCode).json({
            "mensage": error.message
        });
    };
};

module.exports = editTransaction;
