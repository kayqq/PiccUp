var User = require('../models/User');
var jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username }).exec();
        user.comparePassword(password, function(err, isMatch) {
            if (err || !isMatch) return res.status(400).json(null);
            const profile = user.getProfile();
            const token = jwt.sign(profile.username, 'secretkey');
            return res.json({
                user: profile,
                token: token
            });
        });
    } catch (err) {
        return res.status(400).json(null);
    }
};

const handleTokenLogin = async (req, res) => {
    const { token } = req.body;
    const username = jwt.verify(token, 'secretkey');
    try {
        const user = await User.findOne({ username: username }).exec();
        if (!user) return res.status(400).json(null);
        const profile = user.getProfile();
        const token = jwt.sign(profile.username, 'secretkey');
        return res.json({
            user: profile,
            token: token
        });
    } catch (err) {
        return res.status(400).json(null);
    }
};

module.exports = {
    handleLogin,
    handleTokenLogin
};
