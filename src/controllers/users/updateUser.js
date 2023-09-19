const pool = require('../../connection');
const bcrypt = require('bcrypt');

const validationsCamps = (name, email, password) => {
    if (!name) {
        return { message: 'The name is required' };
    }
    if (!email) {
        return response.status(400).json({ message: 'The email is required' });
    }
    if (!password) {
        return response.status(400).json({ message: 'The password is required' });
    }
}

const updateUser = async (require, response) => {
    const { name, email, password } = require.body;

    //validationsCamps(name, email, password);

    try {
        const passwordEncrypted = await bcrypt.hash(password, 10);

        await pool.query(`UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4`,
            [name, email, passwordEncrypted, require.loggedUser.id]);

        return response.status(204).json();
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

module.exports = updateUser;
