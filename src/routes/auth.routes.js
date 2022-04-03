const {Router} = require('express');
const router = Router();
const passport = require('passport');

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash: true
}));

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});


module.exports = router;