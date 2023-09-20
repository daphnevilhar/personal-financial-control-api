const pool = require('../connection');

const verifyCategoryId = async (category_id) => {

    const verifyId = await pool.query(`SELECT * FROM categories WHERE id = $1;`, [category_id]);

    if (verifyId.rowCount === 0) {
        throw { statusCode: 404, message: `Este id de categoria não existe` };
    };
};

const verifyTransactionId = async (userId, id) => {

    const verifyId = await pool.query(`SELECT * FROM transactions WHERE id = $1 AND user_id = $2;`, [id, userId]);

    if (verifyId.rowCount === 0) {
        throw { statusCode: 404, message: `Este id de transação não existe` };
    };

    return verifyId;
};

module.exports = {
    verifyCategoryId,
    verifyTransactionId
};