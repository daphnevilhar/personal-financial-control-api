const pool = require('../../connection');

const extract = async (require, response) => {
    try {
        let entry = await pool.query(`SELECT sum(value) FROM transactions WHERE user_id = $1 AND type = 'entrada';`,
            [require.loggedUser.id]);
        let exit = await pool.query(`SELECT sum(value) FROM transactions WHERE user_id = $1 AND type = 'saida';`,
            [require.loggedUser.id]);

        if (entry.rows[0].sum == null) {
            entry.rows[0].sum = 0;
        }
        if (exit.rows[0].sum == null) {
            exit.rows[0].sum = 0;
        }


        const message = {
            entry: entry.rows[0].sum,
            exit: exit.rows[0].sum
        }
        return response.status(200).json(message);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

module.exports = extract;