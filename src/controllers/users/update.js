const pool = require('../../connection');
const bcrypt = require('bcrypt');
const validateFields = require('../../utils/validationsUser')

const updateUser = async (require, response) => {
    const { name, email, password } = require.body;

    try {
        await validateFields(name, email, password);

        const passwordEncrypted = await bcrypt.hash(password, 10);

        await pool.query(`UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4`,
            [name, email, passwordEncrypted, require.loggedUser.id]);

        return response.status(204).json();
    } catch (error) {
        return response.status(error.statusCode).json({
            "mensage": error.message
        });
    }
}

module.exports = updateUser;
