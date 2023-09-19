const pool = require('../connection');

const listCategories = async (require, response) => {
    try {
        const categories = await pool.query(`SELECT * FROM categories`);

        return response.status(200).json(categories.rows);
    } catch (error) {
        return response.status(500).json(error.message);
    };
};

const listTransactions = async (require, response) => {
    try {
        const userId = require.loggedUser.id;
        const userTransactions = await pool.query(`SELECT * FROM transactions WHERE user_id = $1;`, [userId]);

        return response.status(200).json(userTransactions.rows);
    } catch (error) {
        return response.status(500).json(error.message);
    };
};

const detailTransaction = async (require, response) => {
    const { id } = require.params;

    try {
        const userId = require.loggedUser.id;
        const transaction = await pool.query(`SELECT * FROM transactions WHERE user_id = $1 AND id = $2;`, [userId, id]);

        if (transaction.rowCount === 0) {
            return response.status(404).json({ message: 'Transaction not found' })
        }

        return response.status(200).json(transaction.rows);
    } catch (error) {
        return response.status(500).json(error.message);
    };
}

const registerTransaction = async (require, response) => {
    const { description, value, user_id, categories_id, type } = require.body;

    if (!description) {
        return response.status(400).json({ message: 'The description is required' });
    }
    if (!value) {
        return response.status(400).json({ message: 'The value is required' });
    }
    if (!user_id) {
        return response.status(400).json({ message: 'The user id is required' });
    }
    if (!categories_id) {
        return response.status(400).json({ message: 'The category id required' });
    }
    if (!type) {
        return response.status(400).json({ message: 'The type is required' });
    }

    try {
        const userId = require.loggedUser.id;
        const transaction = await pool.query(`INSERT INTO transactions
        (description, value, user_id, categories_id, type)
        VALUES
        ($1, $2, $3, $4, $5) RETURNING *;`, [description, value, user_id, categories_id, type]);

        //Deverá ser possível cadastrar apenas transações associadas ao próprio usuário logado, 
        //que deverá ser identificado através do ID presente no token de validação.

        //Validar os campos obrigatórios:

        // descricao

        // valor

        // data

        // categoria_id

        // tipo

        // Validar se existe categoria para o id enviado no corpo (body) da requisição.

        // Validar se o tipo enviado no corpo (body) da requisição corresponde a palavra entrada ou saida, exatamente como descrito.

        // Cadastrar a transação associada ao usuário logado.

        return response.status(200).json(transaction);

    } catch (error) {
        return response.status(500).json(error.message);
    };
};

module.exports = {
    listCategories,
    listTransactions,
    detailTransaction,
    registerTransaction
};