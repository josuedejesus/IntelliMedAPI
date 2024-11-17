const { request, response } = require('express');
const { insertChat, insertMessage, fetchChatsByUser, fetchMessages } = require('../services/ChatServices');

async function createChat( request, response ) {
    try {
        const { chatData } = request.body;

        const chatId = await insertChat(chatData);

        if (!chatId) {
            return response.status(404).send({
                success: false,
                details: 'Error al tratar de crear chat.'
            })
        }

        return response.send({
            success: true,
            details: 'Chat creado exitosamente.',
            data: chatId
        });
    } catch (error) {
        console.log(error);
    }
}

async function createMessage( request, response ) {
    try {
        const { messageData } = request.body;

        const messageId = await insertMessage(messageData);

        if (!messageId) {
            return response.status(404).send({
                success: false,
                details: 'Error al tratar de crear mensaje.'
            })
        }

        return response.send({
            success: true,
            details: 'Mensaje creado exitosamente.',
            data: chatId
        });
    } catch (error) {
        console.log(error);
    }
}

async function getChats(request, response) {
    try {
        const { userId } = request.body;
        const chats = await fetchChatsByUser(userId);
        return response.send({
            success: true,
            data: chats
        });
    } catch (error) {
        console.log(error);
    }
}

async function getMessages(request, response) {
    try {
        const { chatId } = request.body;
        const chats = await fetchMessages(chatId);
        return response.send({
            success: true,
            data: chats
        });
    } catch(error) {
        console.log(error);
    }
} 

module.exports = {
    createChat,
    createMessage,
    getChats,
    getMessages
}