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

module.exports = {
    FecthUserByEmail,
    FetchUserByPhone,
    InsertUser,
}