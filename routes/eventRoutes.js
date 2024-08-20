const express = require('express');
const jwt = require('jsonwebtoken');
const jwt_secret = 'senhalegal';
const router = express.Router();

const {
    createEvent,
    allEvents,
    eventById,
} = require('../services/eventService')

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
   
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, jwt_secret, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };

  router.post('/', authenticateToken, async (req,res) => {
    try {
        const event = await createEvent(req.body, req.headers['authorization'].split(' ')[1]);
         res.status(201).json(event)
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        const events = await allEvents(req.headers['authorization'].split(' ')[1]);
        res.status(200).json(events)
    } catch (error) {
        res.status(500).json ({error: error.message}) ;
    }
});

router.get('/:id', authenticateToken, async(req,res) => {
    try {
        const event = await eventById(req.headers['authorization'].split(' ')[1], req.params.id);
        res.status(200).json(event);
    } catch (error) {
        res.status(403).json({ error: error.message });
    }
})

module.exports = router;