const validateFieldsEmailandPassword = async (email, password) => {

    if (!email) {
        throw { statusCode: 400, message: 'O email é obrigatório' };
    };

    if (!password) {
        throw { statusCode: 400, message: 'A senha é obrigatória' };
    };
};

const validateFieldName = async (name) => {

    if (!name) {
        throw { statusCode: 400, message: "O nome é obrigatório" };
    };
};

module.exports = {
    validateFieldsEmailandPassword,
    validateFieldName
};