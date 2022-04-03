const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const voluntarios = require('../models/voluntarios.model');

passport.serializeUser((user, done) => {
    done(null, user.cedula);
});

passport.deserializeUser(async (cedula, done) => {
    const result = await voluntarios.getVoluntarioByCi(cedula);
    const {CEDULA, APELLIDOS} = result[0];

    const user = {
        cedula: CEDULA,
        name: APELLIDOS
    }

    done(null, user);
});

passport.use('local-signin', new LocalStrategy({
    usernameField: 'cedula',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, cedula, password, done) => {
    const result = await voluntarios.getVoluntarioByCi(cedula);
    
    if(result.length == 0) {
        return done(null, false, req.flash('signinMessage', 'No existe la cédula ingresada'));
    }

    const {CEDULA, PASSWORD, APELLIDOS} = result[0];

    if(PASSWORD != password) {
        return done(null, false, req.flash('signinMessage', 'Contraseña incorrecta'));
    }

    const user = {
        cedula: CEDULA,
        name: APELLIDOS
    }

    return done(null, user);
    
}))