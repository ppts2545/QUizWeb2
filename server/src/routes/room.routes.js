const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/verifyTokenGoogle');
const slugify = require('slugify');
const CreateRoom = require('../controllers/room/CreateRoom');
const CreateRoomThumbnail = require('../controllers/room/CreateRoom_Thumbnail');
const multer = require('multer');
const path = require('path'); // For handling file paths

// Configure storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

//Create Room
router.post('/createRoom', authMiddleware, upload.single('thumbnail'), CreateRoom.createRoom);

//Get Room Thumbnail
router.get('/rooms', CreateRoomThumbnail.createRoomThumbnail);

module.exports = router;