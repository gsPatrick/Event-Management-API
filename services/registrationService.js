const Event = require('../models/Event');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const jwt_secret = 'senhalegal';

const registerUserForEvent = async (userId, eventId) => {
  try {
      const user = await User.findByPk(userId);
      const event = await Event.findByPk(eventId);

      if (!user) {
          throw new Error("Usuário não encontrado");
      }
      if (!event) {
          throw new Error("Evento não encontrado");
      }

      const existingRegistration = await Registration.findOne({
          where: {
              userId: user.id,
              eventId: event.id,
          },
      });

      if (existingRegistration) {
          throw new Error("Usuário já inscrito neste evento");
      }

      await Registration.create({
          userId: user.id,
          eventId: event.id,
      });

      return { message: "Usuário inscrito com sucesso" };
  } catch (error) {
      throw new Error("Não foi possível inscrever o usuário no evento: " + error.message);
  }
};

    const getAllEvents = async () => {
        try {
          const events = await Event.findAll({
            attributes: ['id', 'title', 'description', 'date', 'location']
          });
          return events;
        } catch (error) {
          throw new Error("Não foi possível listar os eventos: " + error.message);
        }
      };

      const getEventsByCreator = async (creatorId, token) => {
        try {
          const decoded = jwt.verify(token, jwt_secret);
          if (decoded.acessLevel !== 'creator') {
            throw new Error("Você não tem permissão para acessar estes eventos");
          }
      
          const events = await Event.findAll({
            where: { creatorId: creatorId }, 
            include: {
              model: User,
              as: 'participants',
              through: { attributes: [] },
            },
          });
      
          return events;
        } catch (error) {
          throw new Error("Não foi possível listar os eventos do criador: " + error.message);
        }
      };

      module.exports = {
        registerUserForEvent,
        getAllEvents,
        getEventsByCreator,
      };