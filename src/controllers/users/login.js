const pool = require('../../connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (require, response) => {
    const { email, password } = require.body;

    if (!email) {
        return response.status(400).json({ message: 'O email é obrigatório' });
    }
    if (!password) {
        return response.status(400).json({ message: 'A senha é obrigatória' });
    }

    try {
        const user = await pool.query(`SELECT * FROM users WHERE email = $1;`, [email]);

        if (user.rowCount === 0) {
            return response.status(400).json({ message: 'Email ou senha inválido' });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            return response.status(400).json({ message: 'Email ou senha inválido' });
        }

        const token = jwt.sign({ id: user.rows[0].id }, 'hJXmWg732ad7', { expiresIn: '8h' });

        const { password: _, ...formattedUser } = user.rows[0];

        return response.status(200).json({ user: formattedUser, token });

    } catch (error) {
        return response.status(500).json(error.message);
    }
}

module.exports = login;