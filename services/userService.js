const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_secret = 'senhalegal'
const User = require ('../models/User');

const newUser = async (userData) => {
    try {
        // Criptografa a senha antes de salvar no banco de dados
        const hashedPassword = await bcrypt.hash(userData.password, 15);

        // Criação do novo usuário com os campos necessários
        const newUser = await User.create({
            name: userData.name,          // Inclua o campo 'name'
            email: userData.email,        // Inclua o campo 'email'
            password: hashedPassword,     // Senha criptografada
            acessLevel: userData.acessLevel  // Inclua o campo 'acessLevel'
        });

        return newUser;
    } catch (error) {
        console.log(userData);  // Log dos dados recebidos
        console.log(error);     // Log do erro
        throw new Error("Não foi possível criar a sua conta");  
    }
};

const loginUser = async (email, password) => {
    try {
        const user = await User.findOne ({where: {email}});
        if (!user) {
            throw new Error("Usuário ou senha incorreto");
        }
    
        const isPasswordValid = await bcrypt.compare (password, user.password);
        if (!isPasswordValid) {
            throw new Error("Usuário ou senha incorreto");
        }

        const token = jwt.sign (
            {userId: user.id, username: user.username, email: user.email, acessLevel: user.acessLevel},
            jwt_secret,
            {expiresIn: 3600}
        );
        return {user,token};
    } catch (error) {
    throw new Error("Erro ao gerar token");
    }
};


const userProfile = async (token) => {
    try{
        const decoded = jwt.verify (token, jwt_secret);
        const user = await User.findOne ({
            where: {id: decoded.userId},
            attributes: ['id', 'username', 'email', 'acessLevel'],
        });
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        return user;
    } catch (error) {
        throw new Error("Token inválido ou expirado");  
    }
};

module.exports = {
    newUser,
    loginUser,
    userProfile,
  };