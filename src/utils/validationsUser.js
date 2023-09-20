const validateFields = async (name, email, password) => {

    if (!name) {
        throw { statusCode: 400, message: "The name is required" };
    };

    if (!email) {
        throw { statusCode: 400, message: 'The email is required' };
    };

    if (!password) {
        throw { statusCode: 400, message: 'The password is required' };
    };
};

module.exports = validateFields;