const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { InsertRecord, FetchRecords, DeleteRecord } = require('../services/RecordServices');

async function AddRecord(request, response) {
    try {
        const { user_id, title } = request.body; 
        const file = request.file; 

        if (!file) {
            return response.status(400).json({ message: 'No se proporcionó un archivo.' });
        }

        const fileBuffer = file.buffer;

        const record = await InsertRecord(
            user_id,
            title,
            fileBuffer, 
        );

        return response.send({
            success: true,
            details: 'Expediente medico agregado exitosamente.'
        });

    } catch (error) {
        return response.send({
            success: false,
            details: 'Error al tratar de agregar expediente medico.'
        });
    }

    
};

async function GetRecords(request, response) {
    try {
        const { userId } = request.body;

        const record = await FetchRecords(userId);

        return response.send({
            success: true,
            data: record
        });
    } catch(error) {
        return response.send({
            success: false,
            details: 'Hubo un error al tratar de obtener expediente medico.'
        });
    }
};

async function RemoveRecord(request, response) {
    try {
        const { userId } = request.body;

        const record = await DeleteRecord(userId);

        return response.send({
            success: true,
            details: 'Expediente medico eliminado exitosamente.'
        });
    } catch(error) {
        return response.send({
            success: false,
            details: 'Hubo un error al tratar de eliminar expediente medico.'
        });
    }
};

module.exports = {
    AddRecord,
    GetRecords,
    RemoveRecord
}