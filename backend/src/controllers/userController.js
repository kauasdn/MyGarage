const users = [];

const createUser = (req, res) => {
    const { nome, email, senha } = req.body;
    const newUser = {
        id: users.length + 1,
        nome,
        email,
        senha
    };
    users.push(newUser);
    res.status(201).json(newUser);
};

const getUsers = (req, res) => {
    res.json(users);
};

module.exports = { createUser, getUsers };