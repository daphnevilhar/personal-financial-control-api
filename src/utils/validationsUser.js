const validateFields = async (name, email, password) => {

    if (!name) {
        throw { statusCode: 400, message: "O nome é obrigatório" };
    };

    if (!email) {
        throw { statusCode: 400, message: 'O email é obrigatório' };
    };

    if (!password) {
        throw { statusCode: 400, message: 'A senha é obrigatória' };
    };
};

module.exports = validateFields;