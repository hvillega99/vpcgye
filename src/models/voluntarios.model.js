const Connection = require('./connection');
const connection = new Connection();

exports.getVoluntarios = () => {
    return new Promise((resolve, reject) =>{
        const query = 'SELECT * FROM VOLUNTARIO';
        connection.db.query(query, (err, rows, fields) => {

            if(err){
                reject(err);
            }else{
                resolve(rows);
            }

        })
    })
}

exports.getVoluntarioByCi = (cedula) => {
    return new Promise((resolve, reject) =>{
        const query = `SELECT * FROM VOLUNTARIO WHERE CEDULA = "${cedula}"`;
        connection.db.query(query, (err, rows, fields) => {

            if(err){
                reject(err);
            }else{
                resolve(rows);
            }

        })
    })
}

exports.addVoluntario = ({apellidos, correo, codigo, cedula, whatsapp, password, isadmin}) => {
    return new Promise((resolve, reject) =>{
        const query = `INSERT INTO VOLUNTARIO (APELLIDOS,CODIGO,CORREO,CEDULA,WHATSAPP,PASSWORD,ESADMIN) VALUES ("${apellidos}","${codigo}","${correo}","${cedula}","${whatsapp}","${password}","${isadmin}")`;
        connection.db.query(query, (err, rows, fields) => {

            if(err){
                reject(err);
            }else{
                resolve(rows);
            }

        })
    })
}

exports.editVoluntario = ({apellidos, correo, codigo, cedula, nuevaCedula, whatsapp, password, isadmin}) => {
    return new Promise((resolve, reject) =>{
        const query = `UPDATE VOLUNTARIO SET APELLIDOS="${apellidos}", CODIGO="${codigo}", CORREO="${correo}", CEDULA="${nuevaCedula}", WHATSAPP="${whatsapp}", PASSWORD="${password}", ESADMIN="${isadmin}" WHERE CEDULA = "${cedula}"`;
        connection.db.query(query, (err, rows, fields) => {

            if(err){
                reject(err);
            }else{
                resolve(rows);
            }

        })
    })
}

exports.deleteVoluntario = (cedula) => {
    return new Promise((resolve, reject) =>{
        const query = `DELETE FROM VOLUNTARIO WHERE CEDULA = ${cedula}`;
        connection.db.query(query, (err, rows, fields) => {

            if(err){
                reject(err);
            }else{
                resolve(rows);
            }

        })
    })
}