const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/room/RoomController');
const authMiddleware = require('../middleware/verifyTokenGoogle');

//Create Room
router.post('/createRoom', authMiddleware, RoomController.createRoom);

//Get Room Thumbnail
router.get('/rooms', RoomController.createRoomThumbnail);