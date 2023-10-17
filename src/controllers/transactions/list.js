const pool = require('../../connection');

const listTransactions = async (require, response) => {
    const { filter } = require.query;

    try {
        const userId = require.loggedUser.id;

        if (filter) {
            let list = [];

            if (!Array.isArray(filter)) {
                list = filter.split(' ');
            } else {
                list = filter;
            };

            const result = [];
            let filterTransactions = "";

            for (let i = 0; i < list.length; i++) {
                filterTransactions = await pool.query(`SELECT 
                transactions.id,
                transactions.type,
                transactions.description,
                transactions.value,
                transactions.date,
                transactions.user_id,
                transactions.category_id,
                categories.description AS category_name FROM transactions 
                LEFT JOIN categories ON transactions.category_id = categories.id 
                WHERE transactions.user_id = $1
                AND categories.description ILIKE $2;`, [userId, list[i]]);

                for (let a = 0; a < filterTransactions.rowCount; a++) {
                    result.push(filterTransactions.rows[a]);
                };
            };

            return response.status(200).json(result)
        };

        const userTransactions = await pool.query(`SELECT * FROM transactions WHERE user_id = $1;`, [userId]);

        return response.status(200).json(userTransactions.rows);
    } catch (error) {
        return response.status(error.statusCode || 500).json({
            "mensage": error.message
        });
    };
};

module.exports = listTransactions;