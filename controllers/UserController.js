const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const { FecthUser, FetchUserByPhone, FecthUserByEmail, InsertUser, UpdateUserData, InsertRecord } = require('../services/UserServices');
const { encryptPassword } = require('../crypto/encryption');
const multer = require('multer');
const { validateEmptyFields } = require('../utils/validator');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


async function register(request, response) {
    try {
        let { userData } = request.body;

        const validate = validateEmptyFields(userData);
        console.log(validate);
        if (!validate.isValid) {
            return response.status(422).send({
                success: false,
                details: validate.message
            });
        }

        let user = await FecthUserByEmail(userData.email);

        if (user) {
            return response.status(422).send({
                success: false,
                details: 'El correo ingresado ya esta siendo utilizado por otro usuario.',
            });
        }

        console.log(userData.phone);
        user = await FetchUserByPhone(userData.phone);

        console.log('Usuario', user);


        if (user) {
            return response.status(422).send({
                success: false,
                details: 'El numero de telefono ingresado ya esta siendo utilizado por otro usuario.',
            });
        }

        userData.password = encryptPassword(userData.password);;

        result = await InsertUser(userData);

        if (result) {
            console.log('Fue exitoso');
            return response.send({
                success: true,
                details: 'Cuenta creada exitosamente.'
            })
        } else {
            console.log('Error');
            return response.status[422].send({
                success: false,
                details: 'Error al tratar de registrarse.',
            })
        }

        
        //const result = await InsertUser(U)
    } catch(error) {
        console.log(error);
    }
}

async function login(request, response) {
    try {
        const { email, password } = request.body;

        console.log(email, '    ', password);

        const user = await FecthUserByEmail(email);

        if (!user) {
            response.status(404).send({
                success: false,
                details: 'Datos invalidos.'
            });
        }

        if (encryptPassword(password) != user.password) {
            return response.status(404).send({
                success: false,
                details: 'Datos invalidos.'
            })
        }

        const accessToken = jwt.sign(
            {
                id: user.user_id,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                date_of_birth: user.date_of_birth,
                gender: user.gender,
                phone: user.phone,
                role: user.role,
            }, 
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
            }
        );

        const refreshToken = jwt.sign(
            {
                id: user.user_id,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                date_of_birth: user.date_of_birth,
                gender: user.gender,
                phone: user.phone,
                role: user.role,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRATION
            }
        )

        return response.send({
            success: true,
            details: 'Datos verificados.',
            accessToken: accessToken,
            refreshToken: refreshToken 
        });
    } catch(error) {
        console.log(error);
    }
}

async function UpdateUser(request, response) {
    try {
        const { userId, updatedData} = request.body;

        console.log(userId);
        console.log(updatedData);

        const result = await UpdateUserData(userId, updatedData);

        const user = await FecthUser(userId);

        if (!user) {
            response.status(404).send({
                success: false,
                details: 'Datos invalidos.'
            });
        }

        const accessToken = jwt.sign(
            {
                id: user.user_id,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                date_of_birth: user.date_of_birth,
                gender: user.gender,
                phone: user.phone,
                role: user.role,
            }, 
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
            }
        );

        const refreshToken = jwt.sign(
            {
                id: user.user_id,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                date_of_birth: user.date_of_birth,
                gender: user.gender,
                phone: user.phone,
                role: user.role,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRATION
            }
        )

        return response.send({
            success: true,
            details: 'Datos actualizados exitosamente.',
            accessToken: accessToken,
            refreshToken: refreshToken 
        });

    } catch(error) {
        console.log(error);
        response.send({
            success: false,
            details: 'Error al tratar de actualizar datos.'
        });
    }
}





module.exports = {
    register,
    login,
    UpdateUser,
}