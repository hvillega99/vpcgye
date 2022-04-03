exports.renderLogin = async (req, res) => {
    
    const flashMessage = req.flash('signinMessage');

    const user = req.session.passport;

    if(user && user.hasOwnProperty('user')){
        res.redirect('/home');
    }else{
        res.render('login', {message: flashMessage[0], showMessage: flashMessage.length > 0});
    }

}