const jwt = require('jsonwebtoken');
const jwt_secret = 'senhalegal'
const Event = require('../models/Event');

const createEvent = async (eventData, token) => {
    try {
        const decoded = jwt.verify(token, jwt_secret)
        if (decoded.acessLevel !=='creator'){
            throw new Error("Não é permitido criar um evento, atualize sua conta");
        } 
        const newEvent = await Event.create ( {
            title: eventData.title,
            description: eventData.description,
            date: eventData.date,
            location: eventData.location
        })
        return newEvent
    } catch (error) {
        throw new Error("Não foi possível criar o evento");
    }
};


const allEvents = async (token) => {
    try {
        const decoded = jwt.verify(token, jwt_secret);
        const events = await Event.findAll ({
            attributes: ['id', 'title', 'description', 'date', 'location'] 
        })
        return events;
        } catch (error) {
            throw new Error("Não foi possível listas os eventos");  
        }
    };

    const eventById = async (eventId, token) => {
         try {
            const decoded = jwt.verify(token, jwt_secret);
            const event = await Event.findOne({
                where: {id: eventId},
                attributes: ['id', 'title', 'description', 'date', 'location'] 
            })
            if(!report) {
                throw new Error("evento não encontrado");
            }
            return event;
        } catch (error) {
            throw new Error("Não foi possível buscar o evento: " + error.message);
        }
    }

    module.exports = {
        createEvent,
        allEvents,
        eventById,
      };