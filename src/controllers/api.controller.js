const actividades = require('../models/actividades.model');

exports.getActividad = async (req, res) => {
    const {idActividad} = req.params;

    const actividad = await actividades.getActividadById(idActividad);

    res.send(actividad);
}