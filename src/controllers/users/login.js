const pool = require('../../connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateFieldsEmailandPassword } = require('../../utils/validationsUser');

const login = async (require, response) => {
    const { email, password } = require.body;

    try {
        await validateFieldsEmailandPassword(email, password);

        const user = await pool.query(`SELECT * FROM users WHERE email = $1;`, [email]);

        if (user.rowCount === 0) {
            throw { statusCode: 400, message: "Email ou senha inválido" };
        };

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            throw { statusCode: 400, message: "Email ou senha inválido" };
        };

        const token = jwt.sign({ id: user.rows[0].id }, 'hJXmWg732ad7', { expiresIn: '8h' });

        const { password: _, ...formattedUser } = user.rows[0];

        return response.status(200).json({ user: formattedUser, token });

    } catch (error) {
        return response.status(error.statusCode || 500).json({
            "mensage": error.message
        });
    };
};

module.exports = login;
