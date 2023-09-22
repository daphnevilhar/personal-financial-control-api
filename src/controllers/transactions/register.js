const pool = require('../../connection');
const { validateFields, validateType } = require('../../utils/validations');
const { verifyCategoryId } = require('../../utils/verifications');

const registerTransaction = async (require, response) => {
    const { description, value, date, category_id, type } = require.body;

    try {
        await validateFields(description, value, date, category_id);

        await validateType(type);

        await verifyCategoryId(category_id);

        const userId = require.loggedUser.id;

        const transaction = await pool.query(`
        INSERT INTO transactions
        (description, value, date, user_id, category_id, type)
        VALUES
        ($1, $2, $3, $4, $5, $6) RETURNING *;`, [description, value, date, userId, category_id, type.toLowerCase()]);

        const category = await pool.query(`select description from categories where id = $1`, [category_id]);
        const categoryDescription = category.rows[0].description;
        transaction.rows[0].category_name = categoryDescription;

        return response.status(201).json(transaction.rows);
    } catch (error) {
        return response.status(error.statusCode || 500).json({
            "mensage": error.message
        });
    };
};

module.exports = registerTransaction;
