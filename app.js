const express = require('express');
const bodyParser = require ('body-parser');
const sequelize = require ('./config/database'); 
const userRoutes = require ('./routes/userRoutes')
const eventRoutes = require ('./routes/eventRoutes')
const registrationRoutes = require('./routes/registrationRoutes')

const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/event', eventRoutes);
app.use('/registration', registrationRoutes);

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Banco de dados sincronizado com sucesso.');
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  })
  .catch(error => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  });