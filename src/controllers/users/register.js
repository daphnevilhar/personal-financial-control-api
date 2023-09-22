const pool = require('../../connection');
const bcrypt = require('bcrypt');
const { validateFieldsEmailandPassword, validateFieldName } = require('../../utils/validationsUser')

const registerUser = async (require, response) => {
    const { name, email, password } = require.body;

    try {
        await validateFieldName(name);
        await validateFieldsEmailandPassword(email, password);

        const user = await pool.query(`SELECT * FROM users WHERE email = $1;`, [email]);

        if (user.rowCount === 1) {
            throw { statusCode: 400, message: "Esse email já existe" };
        };

        const passwordEncrypted = await bcrypt.hash(password, 10);

        const newUser = await pool.query(`INSERT INTO users 
        (name, email, password)
        VALUES
        ($1, $2, $3) RETURNING *;`, [name, email, passwordEncrypted]);

        const { password: _, ...formattedUser } = newUser.rows[0];

        return response.status(201).json(formattedUser);
    } catch (error) {
        return response.status(error.statusCode || 500).json({
            "mensage": error.message
        });
    };
};

module.exports = registerUser;
