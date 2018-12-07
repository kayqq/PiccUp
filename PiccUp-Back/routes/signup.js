var User = require('../models/User');

const handleSignup = async (req, res) => {
    try {
        const newUser = await new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            city: req.body.city,
            state: req.body.state,
            email: req.body.email,
            username: req.body.username,
            password: req.body.passwordConfirm,
            instagram: req.body.username
        }).save();
        console.log(newUser);
        console.log('Successfully saved new user.');
        return res.status(200).json(null);
    } catch (error) {
        console.log('Error saving new user.');
        if (error.name === 'MongoError' && error.code === 11000) {
            console.log('Duplicate name');
        }
        return res.status(400).json(null);
    }
};

module.exports = {
    handleSignup: handleSignup
};
