const knex = require("knex") ({
    client: 'pg',
    connection: {
        host: process.env.INTELLIMED_HOST,
        port: process.env.INTELLIMED_PORT,
        database: process.env.INTELLIMED_DB,
        user: process.env.INTELLIMED_USER,
        password: process.env.INTELLIMED_PASSWORD
    },
});

async function insertChat(chatData) {
    try {
        console.log(chatData);
        const result = await knex('chat').insert(chatData).returning('chat_id');
        
        console.log(result);
        return result[0];
    } catch (error) {
        console.log(error);
    }
}

async function insertMessage(messageData) {
    try {
        const result = await knex('message').insert(messageData).returning('message_id');
        console.log(result);

        return result[0];
    } catch (error) {
        console.log(error);
    }
}

async function fetchMessages(chatId) {
    try {
        const messages = await knex('message').select().where('chat_id', chatId);
        return messages;
    } catch(error) {
        console.log(error);
    }
}

async function fetchChatsByUser(userId) {
    try {
        const chats = await knex('chat').select().where('user_id', userId);
        console.log(chats);
        return chats;
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    insertChat,
    insertMessage,
    fetchChatsByUser,
    fetchMessages
}