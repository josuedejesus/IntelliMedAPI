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

async function FecthUser(userId) {
    try {
        let user = await knex("user").select().where("user_id", userId);
        [user] = JSON.parse(JSON.stringify(user));
        return user;
    } catch(error) {
        console.log(error);
    }
}

async function FecthUserByEmail(email) {
    try {
        let user = await knex("user").select().where("email", email);
        [user] = JSON.parse(JSON.stringify(user));
        return user;
    } catch(error) {
        console.log(error);
    }
}

async function FetchUserByPhone(phone) {
    try {
        let user = await knex("user").select().where("phone", phone);
        [user] = JSON.parse(JSON.stringify(user));
        return user;
    } catch(error) {

    }
}

async function InsertUser(userData) {
    try {
        const result = await knex('user').insert(userData).returning('user_id');
        return result[0];
    } catch (error) {
        console.log(error);
    }
}

async function UpdateUserData(userId, updatedItems) {
    try {
        const updates = {};

        updatedItems.forEach(item => {
            const key = Object.keys(item)[0];
            const value = item[key];
            updates[key] = value;
        });

        const result = await knex('user')
            .where('user_id', userId)
            .update(updates);

        return result;
    } catch(error) {
        throw error;
    }
}

async function DeleteChat(chatId) {
    try {
        const result = await knex('chat').delete().where('chat_id', chatId);
        return result;
    } catch(error) {
        throw error;
    }
}


module.exports = {
    FecthUserByEmail,
    FetchUserByPhone,
    InsertUser,
    UpdateUserData,
    FecthUser,
    DeleteChat
}