const pool = require('../../connection');

const extract = async (require, response) => {
    const exit = await pool.query(`SELECT valor FROM transactions WHERE id = $1 and type = "entrada";`,
        [require.loggedUser.id]);
    const entry = await pool.query(`SELECT valor FROM transactions WHERE id = $1 and type = saida;`,
        [require.loggedUser.id]);
}

module.exports = extract;