const Connection = require('./connection');
const connection = new Connection();

exports.getActividades = () => {
    return new Promise((resolve, reject) =>{
        const query = 'SELECT * FROM ACTIVIDADES';
        connection.db.query(query, (err, rows, fields) => {

            if(err){
                reject(err);
            }else{
                resolve(rows);
            }

        })
    })
}

exports.getActividadesByCi = (cedula) => {
    return new Promise((resolve, reject) =>{
        const query = `SELECT ACTIVIDADES.ID,ACTIVIDADES.ACTIVIDAD,ACTIVIDADES.FECHA,ACTIVIDADES.GRUPO,ACTIVIDADES.HORAS,ACTIVIDADES.TURNO,ACTIVIDADES.APELLIDOS,VOLUNTARIO.CEDULA FROM VOLUNTARIO JOIN ACTIVIDADES ON VOLUNTARIO.APELLIDOS = ACTIVIDADES.APELLIDOS WHERE VOLUNTARIO.CEDULA = "${cedula}"`;
        connection.db.query(query, (err, rows, fields) => {

            if(err){
                reject(err);
            }else{
                resolve(rows);
            }

        })
    })
}

exports.getActividadById = (idActividad) => {
    return new Promise((resolve, reject) =>{
        const query = `SELECT * FROM ACTIVIDADES WHERE ID = "${idActividad}"`;
        connection.db.query(query, (err, rows, fields) => {

            if(err){
                reject(err);
            }else{
                resolve(rows);
            }

        })
    })
}

exports.addActividad = ({apellidos, actividad, grupo, fecha, turno, horas}) => {
    return new Promise((resolve, reject) =>{
        const query = `INSERT INTO ACTIVIDADES (APELLIDOS,ACTIVIDAD,GRUPO,FECHA, TURNO, HORAS) VALUES ("${apellidos}","${actividad}","${grupo}","${fecha}", "${turno}","${horas}")`;
        connection.db.query(query, (err, rows, fields) => {

            if(err){
                reject(err);
            }else{
                resolve(rows);
            }

        })
    })
}

exports.editActividad = ({id, apellidos, actividad, grupo, fecha, turno, horas}) => {
    return new Promise((resolve, reject) =>{
        const query = `UPDATE ACTIVIDADES SET APELLIDOS="${apellidos}", ACTIVIDAD="${actividad}", GRUPO="${grupo}", FECHA="${fecha}", TURNO="${turno}", HORAS="${horas}" WHERE ID = "${id}"`;
        connection.db.query(query, (err, rows, fields) => {

            if(err){
                reject(err);
            }else{
                resolve(rows);
            }

        })
    })
}

exports.deleteActividad = (id) => {
    return new Promise((resolve, reject) =>{
        const query = `DELETE FROM ACTIVIDADES WHERE ID = ${id}`;
        connection.db.query(query, (err, rows, fields) => {

            if(err){
                reject(err);
            }else{
                resolve(rows);
            }

        })
    })
}

exports.deleteActividades = (apellidos) => {
    return new Promise((resolve, reject) =>{
        const query = `DELETE FROM ACTIVIDADES WHERE APELLIDOS = "${apellidos}"`;
        connection.db.query(query, (err, rows, fields) => {

            if(err){
                reject(err);
            }else{
                resolve(rows);
            }

        })
    })
}