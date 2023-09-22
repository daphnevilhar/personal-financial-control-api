const pool = require('../../connection');

const listCategories = async (require, response) => {
    try {
        const categories = await pool.query(`SELECT * FROM categories`);

        return response.status(200).json(categories.rows);
    } catch (error) {
        return response.status(500).json(error.message);
    };
};

module.exports = listCategories;
