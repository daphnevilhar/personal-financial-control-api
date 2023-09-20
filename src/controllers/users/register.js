const pool = require('../../connection');
const bcrypt = require('bcrypt');
const validateFields = require('../../utils/validationsUser')

const registerUser = async (require, response) => {
    const { name, email, password } = require.body;

    try {
        await validateFields(name, email, password);

        const user = await pool.query(`SELECT * FROM users WHERE email = $1;`, [email]);

        if (user.rowCount === 1) {
            return response.status(400).json({ message: 'Email já existe' })
        }

        const passwordEncrypted = await bcrypt.hash(password, 10);

        const newUser = await pool.query(`INSERT INTO users 
        (name, email, password)
        VALUES
        ($1, $2, $3) RETURNING *;`, [name, email, passwordEncrypted]);

        const { password: _, ...formattedUser } = newUser.rows[0];

        return response.status(201).json(formattedUser);
    } catch (error) {
        return response.status(error.statusCode).json({
            "mensage": error.message
        });
    }
}

module.exports = registerUser;