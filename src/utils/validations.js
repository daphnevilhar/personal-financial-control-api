const validateFields = async (description, value, date, categories_id) => {

    if (!description) {
        throw { statusCode: 400, message: "The description is required" };
    };

    if (!value) {
        throw { statusCode: 400, message: 'The value is required' };
    };

    if (!date) {
        throw { statusCode: 400, message: 'The date is required' };
    };

    if (!categories_id) {
        throw { statusCode: 400, message: 'The category id required' };
    };
};

const validateType = async (type) => {

    if (!type) {
        throw { statusCode: 400, message: 'The type is required' };
    };

    if (type !== "entrada" && type !== "saida") {
        throw { statusCode: 400, message: 'The type of transaction must be entrada or saida' };
    };
};



module.exports = {
    validateFields,
    validateType
}