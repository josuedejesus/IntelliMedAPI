const express = require('express');
const router = express.Router();

const chatController = require('../controllers/ChatController');

router.post('/create-chat', chatController.createChat);
router.post('/create-message', chatController.createMessage);
router.post('/get-chats', chatController.getChats);
router.post('/get-messages', chatController.getMessages);
router.post('/get-chat-response', chatController.getChatResponse)
router.post('/get-chat-title', chatController.getChatTitle);
router.post('/remove-chat', chatController.RemoveChat);
router.post('/update-chat', chatController.ModifyChat);

module.exports = router;