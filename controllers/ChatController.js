const { request, response } = require('express');
const { insertChat, insertMessage, fetchChatsByUser, fetchMessages, UpdateChat } = require('../services/ChatServices');
const { Configuration, OpenAI } = require('openai');
const { DeleteChat } = require('../services/UserServices');
const { FetchRecords } = require('../services/RecordServices');
const pdf = require('pdf-parse');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


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

async function getChatResponse(request, response) {
    try {
        const { messages, userId } = request.body;

        

        const systemMessage = {
            role: "system",
            content: "Sos un asistente médico profesional. Responde con claridad y precisión. No respondas preguntas que no estén relacionadas al tema. Usa el historial médico del usuario cuando sea relevante para analizar síntomas y proporcionar respuestas basadas en ese contexto."
        };
        
        const updatedMessages = [systemMessage, ...messages];
        
        const file = await FetchRecords(userId);

        if (file) {
            const data = await pdf(file.content);
            const appendedText = `Historial médico del usuario:\n${data.text}`;
            
            updatedMessages.unshift({
                role: "system",
                content: `Historial médico del usuario. Utiliza esta información como referencia al analizar síntomas:\n${appendedText}`
            });
        }

        const result = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: updatedMessages
        });

        return response.send({
            sucess: true,
            data: result.choices[0].message.content
        });
    } catch(error) {
        console.log(error);
        return response.send({
            sucess: false,
            details: "Error al generar respuesta."
        });
    }
}

async function getChatTitle(request, response) {
    try {
        const { message } = request.body;
        
        const result = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "Sos un asistente medico profesional. Generame un titulo para asignarle al chat usando la informacion dada." },
                { role: "user", content: message},
            ]
        });


        return response.send({
            sucess: true,
            data: result.choices[0].message.content
        });
    } catch(error) {
        //console.log(error);
        return response.send({
            sucess: false,
            details: "Error al generar respuesta."
        });
    }
}

async function RemoveChat(request, response) {
    try {
        const { chatId } = request.body;
        const result = await DeleteChat(chatId);
        return response.send({
            success: true,
            details: 'Chat eliminado exitosamente.'
        });
    } catch(error) {
        return response.send({
            success: false,
            details: 'Error al tratar de eliminar chat.'
        });
    }
}

async function ModifyChat(request, response) {
    try {
        const { chat } = request.body;

        const result = await UpdateChat(chat);
        return response.send({
            success: true,
            details: 'Chat actualizado exitosamente.'
        });
    } catch(error) {
        return response.send({
            success: false,
            details: 'Error al tratar de actualizar chat.'
        });
    }
}

module.exports = {
    createChat,
    createMessage,
    getChats,
    getMessages,
    getChatResponse,
    getChatTitle,
    RemoveChat,
    ModifyChat
}