const pool = require('../connection');
const jwt = require('jsonwebtoken');

const verifyAuthentication = async (require, response, next) => {
    const { authorization } = require.headers;

    const token = authorization.split(' ')[1];

    try {
        if (authorization === 'Bearer') {
            throw { statusCode: 401, message: "Usuário não autenticado" };
        };

        const { id } = jwt.verify(token, 'hJXmWg732ad7');

        const user = await pool.query(`SELECT * FROM users WHERE id = $1;`, [id]);

        if (user.rowCount === 0) {
            throw { statusCode: 401, message: "Usuário não autenticado" };
        };

        const { password: _, ...formattedUser } = user.rows[0];

        require.loggedUser = formattedUser;

        next()
    } catch (error) {
        return response.status(error.statusCode || 500).json({
            "mensage": error.message
        });
    };
};

module.exports = verifyAuthentication;