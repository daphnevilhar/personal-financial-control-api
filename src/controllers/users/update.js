const pool = require('../../connection');
const bcrypt = require('bcrypt');
const { validateFieldsEmailandPassword, validateFieldName } = require('../../utils/validationsUser')

const updateUser = async (require, response) => {
    const { name, email, password } = require.body;

    try {
        await validateFieldName(name);
        await validateFieldsEmailandPassword(email, password);

        const passwordEncrypted = await bcrypt.hash(password, 10);
        const userId = require.loggedUser.id;

        await pool.query(`UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4`,
            [name, email, passwordEncrypted, userId]);

        return response.status(204).json();
    } catch (error) {
        return response.status(error.statusCode || 500).json({
            "mensage": error.message
        });
    };
};

module.exports = updateUser;
