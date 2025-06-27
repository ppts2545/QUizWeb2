const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/verifyTokenGoogle');
const slugify = require('slugify');
const CreateRoom = require('../controllers/room/CreateRoom');
const CreateRoomThumbnail = require('../controllers/room/CreateRoom_Thumbnail');

//Create Room
router.post('/createRoom', authMiddleware, CreateRoom.createRoom);

//Get Room Thumbnail
router.get('/rooms', CreateRoomThumbnail.createRoomThumbnail);

module.exports = router;