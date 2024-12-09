const validateEmptyFields = (fields) => {
    for (const key in fields) {
        if (fields[key].trim() === '') {
            return { isValid: false, message: `No puede haber campos vacíos.` };
        }
    }
    return { isValid: true, message: 'Todos los campos están completos.' };
};

module.exports = { 
    validateEmptyFields
}