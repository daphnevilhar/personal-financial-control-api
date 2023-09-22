const detailUser = async (require, response) => {
    return response.status(200).json(require.loggedUser);
};

module.exports = detailUser;
