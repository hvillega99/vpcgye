const voluntarios = require('../models/voluntarios.model');
const actividades = require('../models/actividades.model');

exports.renderAdminView = async (req, res) => {

    const {user: cedula} = req.session.passport;

    let flashMessage = req.flash('message');
    const show = flashMessage.length > 0;
    let type = '';
    let message = '';

    if(show){
        [type, message] = flashMessage[0].split(':');
    }

    flashMessage = {show, type, message};

    let [voluntario, listaActividades] = await Promise.all([voluntarios.getVoluntarioByCi(cedula), 
                                                            actividades.getActividades()]);
    voluntario = voluntario[0];

    if(voluntario.ESADMIN){
        res.render('admin', {nombre: voluntario.APELLIDOS, actividades: listaActividades, flashMessage});
    }else{
        res.redirect('/home');
    }
}

exports.renderVoluntarios = async (req, res) => {

    const {user: cedula} = req.session.passport;
    /* let voluntario = await voluntarios.getVoluntarioByCi(cedula);
    voluntario = voluntario[0]; */

    let flashMessage = req.flash('message');
    const show = flashMessage.length > 0;
    let type = '';
    let message = '';

    if(show){
        [type, message] = flashMessage[0].split(':');
    }

    flashMessage = {show, type, message};

    let listaVoluntarios = await voluntarios.getVoluntarios();
    let voluntario = listaVoluntarios.find(voluntario => voluntario.CEDULA === cedula);

    listaVoluntarios = listaVoluntarios.filter(voluntario => voluntario.CEDULA !== cedula);

    res.render('admin_voluntarios', {nombre: voluntario.APELLIDOS, voluntarios: listaVoluntarios, flashMessage});
}

exports.saveActividad = async function (req, res) {
    const {body: actividad} = req;

    try{
        await actividades.addActividad(actividad);
        req.flash('message', 'success:Actividad agregada correctamente');
    }catch(error){
        req.flash('message', 'danger:No se pudo agregar la actividad');
        console.log(error);
    }

    res.redirect('/admin'); 
}

exports.deleteActividad = async (req, res) => {
    const {params: {id}} = req;

    try{
        await actividades.deleteActividad(id);
        req.flash('message', 'success:Actividad eliminada correctamente');
    }catch(error){
        req.flash('message', 'danger:No se pudo eliminar la actividad');
        console.log(error);
    }

    res.redirect('/admin');
}

exports.renderEditActividad = async (req, res) => {
    const {params: {id}} = req;

    let actividad = await actividades.getActividadById(id);
    actividad = actividad[0];

    res.render('admin_edit_actividad', {actividad});
}

exports.editActividad = async (req, res) => {

    const {params: {id}} = req;
    const {body: actividad} = req;

    actividad['id'] = id;

    try{
        await actividades.editActividad(actividad);
        req.flash('message', 'success:Actividad editada correctamente');
    }catch(error){
        req.flash('message', 'danger:No se pudo editar la actividad');
        console.log(error);
    }

    res.redirect('/admin');
}

exports.saveVoluntario = async function (req, res) {
    const {body: voluntario} = req;
    voluntario['password'] = 'vpc2021';

    try{
        await voluntarios.addVoluntario(voluntario);
        req.flash('message', 'success:Voluntario(a) agregado correctamente');
    }catch(error){
        req.flash('message', 'danger:No se pudo agregar al voluntario(a)');
        console.log(error);
    }

    res.redirect('/admin/voluntarios');
}

exports.deleteVoluntario = async (req, res) => {
    const {params: {id}} = req;

    let voluntario = await voluntarios.getVoluntarioByCi(id);
    voluntario = voluntario[0];

    try{

        await Promise.all([
            actividades.deleteActividades(voluntario.APELLIDOS),
            voluntarios.deleteVoluntario(id)
        ])

        req.flash('message', 'success:Voluntario(a) eliminado correctamente');

    }catch(error){

        req.flash('message', 'danger:No se pudo eliminar al voluntario(a)');
        console.log(error);
        
    }

    res.redirect('/admin/voluntarios');
}

exports.renderEditVoluntario = async (req, res) => {
    const {params: {id}} = req;

    let voluntario = await voluntarios.getVoluntarioByCi(id);
    voluntario = voluntario[0];

    res.render('admin_edit_voluntario', {voluntario});
}

exports.editVoluntario = async (req, res) => {

    const {params: {id}} = req;
    const {body: voluntario} = req;

    voluntario['cedula'] = id;

    const restablecer = voluntario['restablecer-pass'];
    if(restablecer){
        voluntario['password'] = 'vpc2021';
    }else{
        const infoVoluntario = await voluntarios.getVoluntarioByCi(id);
        voluntario['password'] = infoVoluntario[0].PASSWORD;
    }
    
    try{
        await voluntarios.editVoluntario(voluntario);
        req.flash('message', 'success:Voluntario(a) editado correctamente');
    }catch(error){
        req.flash('message', 'danger:No se pudo editar al voluntario(a)');
        console.log(error);
    }

    res.redirect('/admin/voluntarios');
}