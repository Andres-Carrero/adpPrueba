const jwt = require('jsonwebtoken');



let verificaAdmin = (req, res, next) => {
    let tokenAdmin = req.get('Authorization');
    jwt.verify(tokenAdmin, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'token no valido.'
                }
            });

        }
        req.Admin = decoded.Admin;
        next();
    });
};


module.exports = {
    verificaAdmin,
}