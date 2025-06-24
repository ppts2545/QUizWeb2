const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/room/RoomController');
const authMiddleware = require('../middleware/verifyTokenGoogle');

router.post('/createRoom', authMiddleware, RoomController.createRoom);

