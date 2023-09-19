const pool = require('../../connection');
const { validateFields, validateType } = require('../../utils/validations');

const registerTransaction = async (require, response) => {
    const { description, value, date, categories_id, type } = require.body;

    try {

        await validateFields(description, value, date, categories_id);

        await validateType(type);

        const userId = require.loggedUser.id;

        const verifyCategoryId = await pool.query(`SELECT * FROM categories WHERE id = $1;`, [categories_id]);

        if (verifyCategoryId.rowCount === 0) {
            return response.status(404).json({ message: `This category id doesn't exist` })
        }

        const transaction = await pool.query(`INSERT INTO transactions
        (description, value, user_id, categories_id, type)
        VALUES
        ($1, $2, $3, $4, $5) RETURNING *;`, [description, value, userId, categories_id, type]);

        const category = await pool.query(`select description from categories where id = $1`, [categories_id]);
        const categoryDescription = category.rows[0].description
        transaction.rows[0].category_name = categoryDescription

        return response.status(200).json(transaction.rows);

    } catch (error) {
        return response.status(error.statusCode).json({
            "mensage": error.message
        });
    };
};

module.exports = registerTransaction;