const voluntarios = require('../models/voluntarios.model');
const actividades = require('../models/actividades.model');

exports.renderHome = async (req, res) =>{

    const {user: cedula} = req.session.passport;

    let voluntario = await voluntarios.getVoluntarioByCi(cedula);
    voluntario = voluntario[0];

    const listaActividades = await actividades.getActividadesByCi(cedula);

    res.render('home', {nombre: voluntario.APELLIDOS, isAdmin: voluntario.ESADMIN, actividades: listaActividades});
}

exports.renderProfile = async (req, res) =>{

    const {user: cedula} = req.session.passport;

    let flashMessage = req.flash('message');
    const show = flashMessage.length > 0;
    let type = '';
    let message = '';

    if(show){
        [type, message] = flashMessage[0].split(':');
    }

    flashMessage = {show, type, message};

    let voluntario = await voluntarios.getVoluntarioByCi(cedula);
    voluntario = voluntario[0];

    res.render('profile', {cedula: voluntario.CEDULA, 
                            nombre: voluntario.APELLIDOS,
                            codigo: voluntario.CODIGO, 
                            correo: voluntario.CORREO,
                            celular: voluntario.WHATSAPP,
                            isAdmin: voluntario.ESADMIN, 
                            flashMessage});
}

exports.updateProfile = async (req, res) =>{

    const datos = req.body;
    const {ci:cedula} = req.params;

    datos['nuevaCedula'] = cedula;
    datos['cedula'] = cedula;

    let voluntario = await voluntarios.getVoluntarioByCi(cedula);
    voluntario = voluntario[0];

    datos['apellidos'] = voluntario.APELLIDOS;
    datos['codigo'] = voluntario.CODIGO;
    datos['isadmin'] = voluntario.ESADMIN;

    if(datos['password'] === ''){
        datos['password'] = voluntario.PASSWORD;
    }
    
    try{
        await voluntarios.editVoluntario(datos);
        req.flash('message', 'success:Perfil actualizado con éxito');
    }catch(error){
        req.flash('message', 'danger:No se pudo actualizar el perfil');
        console.log(error);
    }

    res.redirect('/home/perfil');
}