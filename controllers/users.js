const User = require('../models/user');

module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register');
}

module.exports.newUser = async (req, res, next) => {
    try{
        const { username, email, password } = req.body;
        const user = new User({ username, email });
        const registedUser = await User.register(user, password);
        req.login(registedUser, err =>{
            if (err) { return next(err); } 
        req.flash('success', `Welcome to YelpCamp ${username}!`);
        return res.redirect('/campgrounds');
    });
    } catch(e){
        req.flash('error', e.message);
        res.redirect('/register');
    }
    
}

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', `Welcome back ${req.body.username}`);
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Logged out!');
        res.redirect('/campgrounds');
    });
}
