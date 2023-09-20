const pool = require('../connection');
const jwt = require('jsonwebtoken');

const verifyAuthentication = async (require, response, next) => {
    const { authorization } = require.headers;

    if (authorization === 'Bearer') {
        return response.status(400).json({ message: 'Usuário não autenticado' });
    };

    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, 'hJXmWg732ad7');

        const user = await pool.query(`SELECT * FROM users WHERE id = $1;`, [id]);

        if (user.rowCount === 0) {
            return response.status(400).json({ message: 'Usuário não autenticado' });
        };

        const { password: _, ...formattedUser } = user.rows[0];

        require.loggedUser = formattedUser;

        next()
    } catch (error) {
        return response.status(500).json(error.message);
    };
};

module.exports = verifyAuthentication;