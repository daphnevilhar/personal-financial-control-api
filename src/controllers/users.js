const pool = require('../connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (require, response) => {
    const { name, email, password } = require.body;

    if (!name) {
        return response.status(400).json({ message: 'The name is required' });
    }
    if (!email) {
        return response.status(400).json({ message: 'The email is required' });
    }
    if (!password) {
        return response.status(400).json({ message: 'The password is required' });
    }

    try {
        const user = await pool.query(`SELECT * FROM users WHERE email = $1;`, [email]);

        if (user.rowCount === 1) {
            return response.status(400).json({ message: 'Email already exist' })
        }

        const passwordEncrypted = await bcrypt.hash(password, 10);

        const newUser = await pool.query(`INSERT INTO users 
        (name, email, password)
        VALUES
        ($1, $2, $3) RETURNING *;`, [name, email, passwordEncrypted]);

        const { password: _, ...formattedUser } = newUser.rows[0];

        return response.status(201).json(formattedUser);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

const login = async (require, response) => {
    const { email, password } = require.body;

    if (!email) {
        return response.status(400).json({ message: 'The email is required' });
    }
    if (!password) {
        return response.status(400).json({ message: 'The password is required' });
    }

    try {
        const user = await pool.query(`SELECT * FROM users WHERE email = $1;`, [email]);

        if (user.rowCount === 0) {
            return response.status(400).json({ message: 'Email or password invalid' });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            return response.status(400).json({ message: 'Email or password invalid' });
        }

        const token = jwt.sign({ id: user.rows[0].id }, 'hJXmWg732ad7', { expiresIn: '8h' });

        const { password: _, ...formattedUser } = user.rows[0];

        return response.status(200).json({ user: formattedUser, token });
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

module.exports = {
    registerUser,
    login
}