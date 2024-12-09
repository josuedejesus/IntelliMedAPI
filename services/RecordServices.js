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

async function InsertRecord(user_id, title, fileBuffer){
    try {
        console.log(user_id);
        console.log(title);

        const result = await knex('record').insert({
            user_id: user_id,
            title: title,
            content: fileBuffer
        });        
        return result;
    } catch (error) {
        throw error;
    }
};

async function FetchRecords(userId) {
    try {
        const record = await knex('record').select().where('user_id', userId);
        return record[0];
    } catch(error) {
        throw error;
    }
}

async function DeleteRecord(userId) {
    try {
        const record = await knex('record').delete().where('user_id', userId);
        return record[0];
    } catch(error) {
        throw error;
    }
}

module.exports = {
    InsertRecord,
    FetchRecords,
    DeleteRecord
}