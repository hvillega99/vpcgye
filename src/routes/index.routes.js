const {Router} = require('express');
const router = Router();


function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }

    res.redirect('/')
}

function clearCache(req,res,next) {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    return next();
}

router.use('/', clearCache, require('./login.routes'));
router.use('/home', isAuthenticated, clearCache, require('./home.routes'));
router.use('/auth', require('./auth.routes'));
router.use('/api', isAuthenticated, require('./api.routes'));
router.use('/admin', isAuthenticated, clearCache, require('./admin.routes'));

module.exports = router;