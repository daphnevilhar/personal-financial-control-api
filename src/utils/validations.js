const validateFields = async (description, value, date, category_id) => {

    if (!description) {
        throw { statusCode: 400, message: "A descrição é obrigatória" };
    };

    if (!value) {
        throw { statusCode: 400, message: 'O valor é obrigatório' };
    };

    if (!date) {
        throw { statusCode: 400, message: 'A data é obrigatória' };
    };

    if (!category_id) {
        throw { statusCode: 400, message: 'A categoria_id é obrigatória' };
    };
};

const validateType = async (type) => {

    if (!type) {
        throw { statusCode: 400, message: 'O tipo é obrigatório' };
    };

    if (type !== "entrada" && type !== "saida") {
        throw { statusCode: 400, message: 'O tipo de transação deve ser entrada ou saida' };
    };
};

module.exports = {
    validateFields,
    validateType
};