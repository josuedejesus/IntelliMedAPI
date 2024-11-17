const express = require('express');
const router = express.Router();

const chatController = require('../controllers/ChatController');

router.post('/create-chat', chatController.createChat);
router.post('/create-message', chatController.createMessage);
router.post('/get-chats', chatController.getChats);
router.post('/get-messages', chatController.getMessages);

module.exports = router;