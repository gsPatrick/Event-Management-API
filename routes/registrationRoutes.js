const jwt = require('jsonwebtoken');
const jwt_secret = 'senhalegal'
const express = require('express')
const { registerUserForEvent, getAllEvents, getEventsByCreator } = require('../services/registrationService');
const router = express.Router();

const authenticateToken = (req,res,next) => {
    const authHeader = req.headers ['authorization'];
    const token = authHeader && authHeader.split (' ') [1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, jwt_secret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

router.get('/', authenticateToken, async (req,res) => {
    try {

        const events = await getAllEvents();
        res.status(200).json(events);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
});

router.post('/:eventId/', authenticateToken, async (req,res) => {
    try {
        const {eventId} = req.params;
        const {userId} = req.user;
        const result = await registerUserForEvent(userId, eventId)
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/creator/:creatorId', authenticateToken, async (req,res) => {
    try {
        const {creatorId} = req.params;
        const {userId} = req.user;
        const events = await getEventsByCreator(creatorId, req.headers['authorization']);
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;